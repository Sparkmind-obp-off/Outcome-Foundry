# PRD — Product Requirements Document
## SPARKMIND-OBP · Sovereign Agent Foundry

> SSOT batch 01 · v1.0 · 2026-06-20 · Sumber: repo `Sovereign-Agent-Foundry` (README, src/data, migrations)

---

## 1. Problem statement

UMKM, solopreneur, dan builder Indonesia ingin memanfaatkan **AI agent** untuk
menjalankan bisnis, tetapi:

- **Gap eksekusi:** prompt/template yang beredar berhenti di "ide", tidak menjadi
  **sistem agentik siap-pakai** (boot → orchestrate → deploy → verify).
- **Gap lokal:** mayoritas tool agentik berbahasa Inggris, harga USD, dan tidak
  menyediakan **payment lokal** (QRIS / Virtual Account / e-wallet Indonesia).
- **Gap compliance:** menjual produk digital lintas-brand butuh **Merchant-of-Record**
  yang patuh (pemrosesan via PJP terdaftar Bank Indonesia).

**SparkMind-OBP** menutup ketiga gap: marketplace skill agentik **berbahasa Indonesia**,
harga **IDR**, payment **Duitku**, dengan **OBP sebagai MoR**.

---

## 2. Visi & tujuan

| Aspek | Pernyataan |
|---|---|
| **Visi** | Menjadi "Sovereign Agent Foundry" — sumber skill agentik siap-pakai untuk ekosistem bisnis Indonesia. |
| **Misi** | Memonetisasi seluruh capability agentik owner sebagai produk digital, jasa, & asset. |
| **North Star** | Jumlah **paid license** terbit (order `paid` → license minted) per bulan. |
| **Tagline** | "Sovereign Agent Foundry — ekosistem skill agentik siap-pakai." |

---

## 3. Target user (persona)

| Persona | Kebutuhan | Skill relevan |
|---|---|---|
| **Solo-builder / indie hacker** | Pipeline nol→production tanpa tim | `fullstack-cycle`, `cf-byok-deploy`, `github-push` |
| **Pemilik UMKM** | Otomasi kas/ops/marketing lokal | sub-brand BarberKas, PaceLokal, KuratorKas |
| **Agency / studio** | Squad agentik untuk delivery klien | `squad-engineering`, `squad-marketing`, `orchestrator` |
| **Operator AI-native** | Memory, governance, cost-control | `hermes-memory`, `zero-trust`, `credit-aware` |

---

## 4. Lingkup produk (scope)

### 4.1 Yang DIBANGUN (in-scope)
- **Marketplace SSR** (Hono): landing, katalog, pricing, product detail, about/docs, thank-you.
- **Checkout** → buat order pending → **Duitku POP `createInvoice`** (PRODUCTION).
- **Webhook** `/webhook/duitku` → verifikasi signature → order `paid` → mint license → brand ledger.
- **Download endpoint** dengan validasi token & limit unduhan (max 5).
- **D1 schema** lengkap: `customers, orders, licenses, webhook_events, waitlist, brand_ledger`.
- **MoR disclosure** (Oasis BI Pro) di footer & checkout.

### 4.2 Yang TIDAK DIBANGUN (out-of-scope v2.0)
- File biner skill di R2 (saat ini endpoint kembalikan metadata).
- Email otomatis license link (perlu REST: Resend/Mailgun).
- Dashboard pembeli & admin.
- Subscription/recurring billing (model awal = one-time purchase).

---

## 5. Katalog produk (36 skill · 6 sub-brand)

### 5.1 Distribusi harga (tiering doctrine v2.0)
| Tier (IDR) | Jumlah skill | Kategori dominan |
|---|---|---|
| 59.000 | 3 | utilitas ringan (github-push, verify-rubric, cowork-handoff) |
| 69.000 | 7 | memory & frameworks (langchain, langgraph, crewai, n8n, credit-aware) |
| 79.000 | 7 | squads & ops (engineering, product, opsfinance, team-boot, workflow-ops) |
| 89.000 | 7 | orchestration & deploy (orchestrator, master-boot, cf-byok, hf-spaces, specialists, supabase-vault) |
| 99.000 | 10 | C-Suite + enterprise + actuation (cofounder, cto, cfo, cmo, coo, cpo, enterprise, gtm, claw, browser-use) |
| 149.000 | 2 | premium (fullstack-cycle, zero-trust) |

**Total nilai katalog (1× tiap skill): Rp 3.124.000.**

### 5.2 Distribusi sub-brand (4-Layer Domain)
| Sub-brand | Skill | Fokus |
|---|---|---|
| SparkMind Core | 23 | fondasi & orkestrasi |
| PaceLokal | 4 | GTM & bisnis lokal |
| KuratorKas | 3 | knowledge ops |
| BarberKas | 2 | kas & operasional |
| Nurani.OS | 2 | sosial & compliance |
| MomentKas | 2 | event & actuation |

---

## 6. Functional requirements (entry URIs)

| Method | Path | Requirement |
|---|---|---|
| GET | `/` | Landing SSR dengan hero, value prop, CTA katalog. |
| GET | `/catalog` | List 36 skill dikelompokkan per sub-brand. |
| GET | `/pricing` | Tabel tiering harga IDR. |
| GET | `/product/:slug` | Detail + form checkout (nama, email). |
| GET | `/about` `/docs` | Doctrine 4-layer & disclosure MoR. |
| GET | `/thank-you` | Halaman return pasca-pembayaran. |
| GET | `/api/products` | JSON list 36 produk. |
| GET | `/api/product/:slug` | JSON detail produk. |
| GET | `/api/brands` | JSON metadata sub-brand. |
| POST | `/api/checkout` | `{slug,name,email}` → `{paymentUrl}`. |
| GET | `/api/order/:moid` | Status order. |
| POST | `/api/waitlist` | `{email,slug}` capture lead. |
| POST | `/webhook/duitku` | Callback (x-www-form-urlencoded). |
| GET | `/api/download/:token` | Unduh skill (validasi license + limit). |
| GET | `/api/health` | Health check. |

---

## 7. Non-functional requirements

| Kategori | Requirement |
|---|---|
| **Performance** | SSR edge < 50ms TTFB (Cloudflare global). CPU < 10ms/req (free tier). |
| **Security** | Secret hanya via `wrangler pages secret` / `.dev.vars`; signature HMAC-SHA256 wajib di checkout & callback. |
| **Compliance** | MoR disclosure visible; pemrosesan via PJP Duitku (diawasi BI). |
| **Reliability** | Webhook idempotent (cek `webhook_events`); order unik per `merchant_order_id`. |
| **Cost** | 100% free-tier Cloudflare; no idle VPS cost. |
| **i18n** | UI & copy Bahasa Indonesia; istilah teknis dipertahankan. |

---

## 8. Success metrics (KPI)

| Metric | Definisi | Target awal |
|---|---|---|
| Paid licenses / bln | order `paid` → license minted | naik MoM |
| Checkout → paid conversion | `paid` / `pending` | > 25% |
| Catalog → checkout CTR | `/api/checkout` / `/product/:slug` view | > 8% |
| Waitlist growth | rows `waitlist` | naik MoM |
| Refund / dispute rate | via Duitku | < 1% |

---

## 9. Acceptance criteria (DoD)

- [ ] Semua entry URI section 6 merespons 200/expected.
- [ ] Checkout production menghasilkan `paymentUrl` ke `app-prod.duitku.com`.
- [ ] Webhook valid → order `paid` + license + brand_ledger tercatat.
- [ ] Download token tervalidasi & limit unduhan dihormati.
- [ ] MoR disclosure tampil di footer + checkout.
- [ ] README & SSOT diperbarui.

> Verifikasi dijalankan via `sovereign-verify-rubric` sebelum status "selesai".
