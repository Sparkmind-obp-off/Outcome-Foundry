# SparkMind X · Outcome Foundry (di atas OBP Checkout Orchestrator)

## Project Overview
- **Name**: SparkMind X · Outcome Foundry (engine: OBP Checkout Orchestration)
- **Goal**: Pabrik **hasil bisnis (outcome)** untuk UMKM Indonesia. Pembeli memilih *outcome*
  (Kasir+Booking, Toko Online, AI Staff, dst), bukan tooling. Pembayaran diproses oleh
  **Oasis BI Pro (OBP)** sebagai **Merchant-of-Record (MoR) tunggal** di rel PJP **Duitku** —
  **1 merchant code + 1 callback URL** melayani banyak sub-brand via **fan-out** berbasis
  prefix `merchantOrderId`. 100% edge-native (Cloudflare Pages + D1), ZERO VPS.
- **Narasi 3 lapis** (B5-02): Lapis 1 = Pasar (outcome) · Lapis 2 = Foundry (mesin agentik) ·
  **Lapis 3 = Rel (OBP MoR + edge + kepatuhan)**.

## Currently Completed Features
- ✅ **Re-brand UI** → "SparkMind X · Outcome Foundry" (nav + footer + home), OBP sebagai MoR rail.
- ✅ **Katalog outcome** `/foundry` — 15 SKU, 5 tier (vertical / subscription / high-ticket / education / developer).
- ✅ **Checkout MoR** `/checkout` dengan **pre-fill via `?offer=`** + **intake panel** (HITL) untuk high-ticket.
- ✅ **Dashboard admin read-only** `/admin` — invoice, callback Duitku, fan-out log + stat cards
  + **Leads AgentShield** (R6-5): tabel intake `/security-audit` (nama/kontak/perusahaan/surfaces/status/waktu) untuk follow-up.
- ✅ **API observability** `/api/stats` (kini termasuk `recent_leads`) + `/api/offers`.
- ✅ **R6-4 Sovereign AgentShield** `/security-audit` — landing + metodologi audit prompt-injection +
  form intake (lead → D1 `leads`, tanpa payment) + template laporan (`docs/ssot/standards/R6-4-AGENTSHIELD-REPORT-TEMPLATE.md`).
- ✅ **Engine MoR** (existing): create invoice via Duitku POP, callback fan-out HMAC-signed.
- ✅ **Replay protection** (nonce + `is_replay`) → callback otentik diproses sekali (idempoten).
- ✅ **Status mapping** Duitku resultCode `00=paid · 01=failed · 02=pending` eksplisit.
- ✅ HMAC-SHA256 (request & callback) via Web Crypto (no node:crypto), constant-time compare.

## Functional Entry Points (URIs)
| Method | Path | Keterangan |
|---|---|---|
| GET | `/` | Home — narasi Outcome Foundry + outcome unggulan |
| GET | `/foundry` | Katalog outcome (per tier) |
| GET | `/security-audit` | Sovereign AgentShield — landing + form intake audit keamanan |
| GET | `/checkout?offer={slug}&mode={instant\|intake}` | Checkout MoR (pre-fill offer) |
| GET | `/admin` | Dashboard read-only |
| GET | `/payment/return?order={merchantOrderId}` | Status pembayaran (polling) |
| GET | `/api/health` | Health check |
| GET | `/api/offers` | Katalog SKU (JSON) |
| GET | `/api/stats` | Ringkasan + invoice/callback/fan-out + **leads AgentShield** terbaru (JSON) |
| GET | `/api/sub-brands` | Daftar sub-brand aktif |
| POST | `/api/leads` | Simpan lead intake AgentShield (`{name, contact, company?, surfaces[], message?}`) → tabel `leads` |
| POST | `/api/invoices` | Buat invoice (`{sub_brand_id, amount_idr, product_details, customer{}}`, header `Idempotency-Key`) |
| GET | `/api/invoices/:orderId` | Status invoice |
| POST | `/webhooks/duitku` | Callback Duitku (form-urlencoded, HMAC + replay-protected) |

## Data Architecture
- **Storage**: Cloudflare **D1** (SQLite). Katalog SKU = kode (`src/data/offers.ts`).
- **Tables**: `sub_brands` (prefix routing), `invoices` (invoice MoR), `callbacks`
  (audit + `nonce` + `is_replay`), `fanout_log` (OBP → sub-brand delivery),
  `leads` (intake AgentShield R6-4 — additive, migration `0003`, tanpa payment).
- **Routing key**: `merchantOrderId = {PREFIX}-{ts}-{rand}` → prefix → sub-brand → fan-out.

## Configuration (secrets — never committed)
Local dev: `.dev.vars` (gitignored). Production: `wrangler pages secret put`.
```
DUITKU_MERCHANT_CODE=D20919
DUITKU_API_KEY=********
DUITKU_ENV=production
OBP_BASE_URL=        # auto-detect if empty
```

## User Guide
1. Buka `/` → klik **Lihat Katalog Outcome** atau pilih outcome unggulan.
2. Di `/foundry` pilih SKU → **Beli** (instant) atau **Konsultasi** (intake/high-ticket).
3. Di `/checkout` form ter-prefill (sub-brand, produk, harga) → "Bayar Sekarang".
4. OBP membuat invoice via Duitku → POP JS / hosted redirect → `/payment/return`.
5. Callback Duitku → verifikasi HMAC → replay-check → update status → fan-out sub-brand.
6. Pantau semua di `/admin` (read-only).

## Local Development
```bash
npm install
npm run build
npm run db:migrate:local && npm run db:seed
pm2 start ecosystem.config.cjs        # http://localhost:3000
```

## Deployment
- **Platform**: Cloudflare Pages (edge-native, BYOK — akun CF sendiri).
- **Status**: ✅ **LIVE in production**. Build hijau (103.75 kB), semua route 200, secrets Duitku
  terpasang (`configured:true`, `duitku_env:production`), D1 remote migrated. Redeploy dilakukan
  setelah `secret put` agar secrets aktif. **Catatan (Truth-Lock):** `configured:true` = kredensial
  ADA; uji transaksi end-to-end (real invoice + callback HMAC) = QA payment berikutnya (HITL owner).
- **Production URL**: https://outcome-foundry-7vr.pages.dev
- **Custom domain**: https://outcome-foundry.biz.id · https://outcome-foundry.sparkmind-obp.biz.id
- **Tech Stack**: Hono + TypeScript + Cloudflare Pages/Workers + D1 + TailwindCSS (CDN).
- **D1 (remote)**: `outcome-foundry-production` (`b54d0928-…`).
- **GitHub**: https://github.com/Sparkmind-obp-off/Outcome-Foundry
- **Last Updated**: 2026-07-01 (R6-4 Sovereign AgentShield `/security-audit` live: landing + metodologi + intake `/api/leads` → tabel `leads` (migration 0003, local+remote termigrasi) + template laporan audit; build hijau 112.85 kB, `tsc` 0 error; deploy CF Pages BYOK + verify live end-to-end; HANDOFF-05)

## Canonical Docs (SSOT)
**Titik masuk tunggal:** [`docs/ssot/00-SSOT-CANONICAL-INDEX.md`](docs/ssot/00-SSOT-CANONICAL-INDEX.md) — peta lengkap semua batch.

**Wajib baca (jangkar kebenaran):**
- [`docs/ssot/CODEBASE-TRUTH-RECONCILIATION.md`](docs/ssot/CODEBASE-TRUTH-RECONCILIATION.md) — rekonsiliasi "dua codebase"; **kode live selalu menang** (D-1 Truth-Lock).

## Agentic OS — FOUNDRY-MASTER (cara boot setiap sesi kerja) ⭐

> Lapisan **PROSES** (bukan fitur produk): cara mem-**boot**, **handoff**, **sprint**, & **resume**
> setiap sesi build agar konteks & doctrine tidak pernah hilang antar-sesi. Diadaptasi dari repo
> saudara `Barberkas-foundry/docs/ssot/foundry-master` ke repo LIVE ini (D-1 Truth-Lock).

- **Peta lapisan:** [`docs/ssot/foundry-master/FM-00-INDEX.md`](docs/ssot/foundry-master/FM-00-INDEX.md)
- **FM-01 Master-Architect-Prompt** — 1 prompt induk boot agent (peran, 6 hard-constraint, urutan, gate).
- **FM-02 Master-Handoff** — template serah-terima per-sesi (`handoffs/HANDOFF-OF-*.md`).
- **FM-03 Master-Sprint-Kas** — sprint credit-aware (scope, OMTM, anggaran kredit, exit-gate).
- **FM-04 Resume-Boot** + [`resume_boot.py`](docs/ssot/foundry-master/resume_boot.py) — resume keadaan repo 1 perintah (zero-dep).
- **Skill boot** — [`skills/sovereign-outcome-foundry-context-injection/`](skills/sovereign-outcome-foundry-context-injection/) (inject doctrine + peta SSOT + route live).

**Cara pakai di sesi berikutnya (3 langkah):**
```bash
# 1) Tempel Snippet B (MASTER-ARCHITECT-PROMPT) dari:
#    skills/sovereign-outcome-foundry-context-injection/references/inject-snippet.md
# 2) Resume keadaan repo:
python3 docs/ssot/foundry-master/resume_boot.py --check-live
# 3) Baca handoff terbaru → tulis SPRINT-KAS (FM-03) → eksekusi → tutup dgn HANDOFF (FM-02) + push.
```

**Batch kanonik terbaru:**
- **Batch 4** `docs/ssot/batch-4-repositioning/` — repositioning "Skill Mart" → "Outcome Foundry".
- **Batch 5** `docs/ssot/batch-5-outcome-foundry/` — model bisnis OaaS + delivery engine (framing kanonik).
- **Batch 8** `docs/ssot/batch-8-ecc-reference/` — ECC reference + roadmap upgrade R6.
- **Batch 9 / Standards** `docs/ssot/standards/` — skill-authoring, eval-loop, AgentShield SKU spec.
- **Batch 10** `docs/ssot/batch-10-launch-zero/` ⭐ — **Launch From Zero**: secret doctrine, strategi 90 hari,
  GTM 0-follower, toolkit konten free-tier no-CC, kalender konten 30 hari + funnel VSL faceless.

**Root SSOT (produk live):**
- `docs/OUTCOME-FOUNDRY-X-OBP-SSOT.md` — SSOT tunggal: Outcome Foundry (B4/B5) + OBP MoR rail.
- `docs/DUITKU-MOR-CANONICAL-SSOT.md` — teknis: 1 merchant code → MoR multi-brand.
- `docs/OBP-MOR-ECOSYSTEM-SSOT.md` — strategis: OBP sbg real MoR ekosistem.

## Not Yet Implemented / Next Steps (Batch 8 R6)
- **R6-3**: Eval loop — trace (D1) → verifier → playbook (proof-of-outcome). *Spec siap, HITL schema.*
- ~~**R6-4**: Halaman `/security-audit` + template laporan untuk SKU **Sovereign AgentShield**~~ ✅ **DONE** (HANDOFF-05: page + intake `/api/leads` + tabel `leads` + template laporan; live). Sisa: pricing final + review legal = **HITL owner**.
- **R6-5**: Channel seat/sponsor (Founder Pass multi-seat, tier sponsor).
- Rate-limit `/api/invoices`, fan-out retry queue, settlement/reconciliation harian + brand ledger.
- Real sub-brand webhook endpoints (saat ini demo domain → 404 saat fan-out).
- Custom domain (mis. `pay.oasis-bi-pro.web.id`) via `wrangler pages domain add`.
