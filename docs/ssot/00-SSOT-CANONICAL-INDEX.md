# SSOT — Single Source of Truth (Canonical Index)
## SPARKMIND-OBP · Sovereign Agent Foundry

> **Status:** Canonical · **Versi:** v1.0 · **Tanggal:** 2026-06-20
> **Pemilik:** Reza Estes / Haidar Faras + Gyss (spousal 50/50)
> **Doctrine induk:** MASTER-ARCHITECT-PROMPT v8.0 · D-1 Truth-Lock · Indonesia-first · Credit-aware
> **Repo kanonik:** https://github.com/ganihypha/Sovereign-Agent-Foundry

---

## 0. Apa itu dokumen ini

Ini adalah **SSOT (Single Source of Truth)** — satu sumber kebenaran kanonik untuk
seluruh platform **SparkMind-OBP / Sovereign Agent Foundry**. Disusun dari **deep-dive**
tiga repo resmi + bundle skill yang diupload owner:

| Sumber | Peran dalam SSOT |
|---|---|
| `ganihypha/Sovereign-Agent-Foundry` | **Produk hidup** — marketplace Hono + Cloudflare Pages + D1 + Duitku (PRODUCTION LIVE) |
| `Elfares24/Cloudflare` | **Pustaka kanonik** infra — 53 dok ekosistem Cloudflare (acuan arsitektur) |
| `Elfares24/Anthropic-Canon` | **Pustaka kanonik** agentik — 86 artikel Claude/Anthropic (acuan doctrine agent) |
| Bundle `sovereign-*.zip` (36 skill) | **Inventory yang dimonetisasi** — barang dagangan marketplace |

Tujuan strategis owner (verbatim intent): **memonetisasi SELURUH skill / capability /
asset / service** yang dimiliki — dalam bentuk digital product, jasa, asset, atau service —
dengan menutup gap kompetitor dan menemukan **blue ocean / gold mine** monetisasi.

---

## 1. Peta dokumen SSOT (urutan baca)

| # | Dokumen | Pertanyaan yang dijawab | Audiens |
|---|---|---|---|
| 00 | **[SSOT-CANONICAL-INDEX](00-SSOT-CANONICAL-INDEX.md)** | Apa keseluruhannya? Di mana semuanya? | Semua |
| 01 | **[PRD](01-PRD.md)** | APA yang dibangun & untuk siapa? | Product, Eng |
| 02 | **[DESIGN-DOC](02-DESIGN-DOC.md)** | BAGAIMANA terlihat & terasa? (UX/UI/flow) | Design, Front-end |
| 03 | **[ARCHITECT-DOC](03-ARCHITECT-DOC.md)** | BAGAIMANA dibangun secara teknis? | Engineering |
| 04 | **[PRODUCTIONIZED-DOC](04-PRODUCTIONIZED-DOC.md)** | Apa yang sudah LIVE & cara operasinya? | Ops, Eng |
| 05 | **[MONETIZATION-DOC](05-MONETIZATION-DOC.md)** | Bagaimana menghasilkan uang dari SEMUA capability? | Founder, CFO |
| 06 | **[STRATEGIC-DOC](06-STRATEGIC-DOC.md)** | Posisi pasar, gap kompetitor, blue ocean | Founder, CMO |
| 07 | **[STRATEGIC-WINNING-DOC](07-STRATEGIC-WINNING-DOC.md)** | Cara MENANG (moat, wedge, unfair advantage) | Founder |
| 08 | **[STRATEGIC-DOMINATION-DOC](08-STRATEGIC-DOMINATION-DOC.md)** | Cara DOMINASI pasar (kategori, network effect) | Founder |
| 09 | **[GTM-DOC](09-GTM-DOC.md)** | Go-to-market: channel, funnel, copy | CMO, Sales |
| 10 | **[RUNPLAYBOOK-DOC](10-RUNPLAYBOOK-DOC.md)** | SOP harian operasi & rilis | Ops, Eng |
| 11 | **[LAUNCH-DOC](11-LAUNCH-DOC.md)** | Checklist peluncuran end-to-end | Semua |
| 12 | **[TODO-ROADMAP-DOC](12-TODO-ROADMAP-DOC.md)** | Apa selanjutnya? Backlog prioritas | Semua |
| 13 | **[GAP-ANALYSIS-AND-UPGRADE-DOC](13-GAP-ANALYSIS-AND-UPGRADE-DOC.md)** | Gap apa yang sudah ditutup? (G1–G8) | Eng, Founder |

### 1.1 Batch 2 — Operasional (`batch-2-operasional/`)

> Bagaimana **satu sesi / satu agent** mengeksekusi secara terstruktur (D-1 Truth-Lock).

| # | Dokumen | Isi |
|---|---|---|
| B2-00 | **[INDEX](batch-2-operasional/B2-00-INDEX.md)** | Peta Batch 2 + non-negotiable operasional |
| B2-01 | **[RUNBOOKS-PER-FASE](batch-2-operasional/B2-01-RUNBOOKS-PER-FASE.md)** | Runbook copy-run fase F0–F7 + gate |
| B2-02 | **[API-SPEC-AGEN](batch-2-operasional/B2-02-API-SPEC-AGEN.md)** | Kontrak HTTP API + spesifikasi agen |
| B2-03 | **[PROMPT-TEMPLATE-PER-ROLE](batch-2-operasional/B2-03-PROMPT-TEMPLATE-PER-ROLE.md)** | Template prompt per role L0.5–L5 |
| B2-04 | **[SPRINT-PER-SESSION](batch-2-operasional/B2-04-SPRINT-PER-SESSION.md)** | 1 sesi = 1 micro-sprint (S0–S5) |
| B2-05 | **[MASTER-ARCHITECT-PROMPT-PER-SESSION](batch-2-operasional/B2-05-MASTER-ARCHITECT-PROMPT-PER-SESSION.md)** | Header kanonik pembuka tiap sesi |

### 1.2 Batch 3 — Skala (`batch-3-skala/`)

> Bagaimana **tumbuh, melayani klien, dan bertahan saat insiden** (AaaS).

| # | Dokumen | Isi |
|---|---|---|
| B3-00 | **[INDEX](batch-3-skala/B3-00-INDEX.md)** | Peta Batch 3 + non-negotiable skala |
| B3-01 | **[METRIK-AAAS](batch-3-skala/B3-01-METRIK-AAAS.md)** | KPI Agent-as-a-Service (funnel, retensi, unit-economics) |
| B3-02 | **[PLAYBOOK-ONBOARDING-KLIEN](batch-3-skala/B3-02-PLAYBOOK-ONBOARDING-KLIEN.md)** | Lead → klien aktif (self-serve & done-for-you) |
| B3-03 | **[RUNBOOK-INSIDEN](batch-3-skala/B3-03-RUNBOOK-INSIDEN.md)** | Severity, alur respons, komunikasi, post-mortem |

### 1.3 Batch 4 — Strategic Repositioning (`batch-4-repositioning/`)

> **Keputusan pivot:** dari "skill mart niche (user Genspark/Claude)" → **"Outcome Foundry"**
> untuk **pasar nyata & luas (30 juta+ UMKM/SMB Indonesia)**. Menjawab mandat owner:
> *monetisasi SETIAP aset di pasar yang luas, sulit ditiru, & winning.* **Batch ini
> men-supersede framing pasar pada 06/07/08** (lihat catatan upgrade di tiap dok).
> ➡️ **Diserap & dituntaskan oleh Batch 5.**

| # | Dokumen | Isi |
|---|---|---|
| B4-00 | **[INDEX](batch-4-repositioning/B4-00-INDEX.md)** | Kenapa reposition + tesis "jual hasil, bukan bahan" |
| B4-01 | **[REPOSITIONING](batch-4-repositioning/B4-01-REPOSITIONING-DOC.md)** | Positioning baru, kategori "Outcome Foundry", naming, narasi 2-lapis |
| B4-02 | **[TARGET-MARKET](batch-4-repositioning/B4-02-TARGET-MARKET-DOC.md)** | TAM/SAM/SOM (30,19 jt UMKM), 5 ICP baru yang membayar |
| B4-03 | **[PRODUCTIZED-OFFERS](batch-4-repositioning/B4-03-PRODUCTIZED-OFFERS-DOC.md)** | Setiap aset → produk jadi: katalog SKU mainstream + pricing |
| B4-04 | **[WINNING-GTM-BROAD](batch-4-repositioning/B4-04-WINNING-GTM-BROAD-DOC.md)** | Cara menang di pasar luas: channel, funnel, copy non-teknis, partner |
| B4-05 | **[MIGRATION-MAP](batch-4-repositioning/B4-05-MIGRATION-MAP-DOC.md)** | 36 skill → produk baru + perubahan kode minimal + roadmap R1–R4 |
| B4-06 | **[OUTCOME-ECONOMY-THESIS](batch-4-repositioning/B4-06-OUTCOME-ECONOMY-THESIS-DOC.md)** | Tesis pasar (web research): Outcome Economy / OaaS / RaaS — validasi pivot "jual hasil" + moat |
| B4-07 | **[EXECUTION-LOG](batch-4-repositioning/B4-07-EXECUTION-LOG-DOC.md)** | Log eksekusi Sprint R1: pivot dari blueprint → kode live (`/solutions`, `/developers`) + smoke test |

### 1.4 Batch 5 — Outcome Foundry (`batch-5-outcome-foundry/`) ⭐ TERBARU & KANONIK

> **Pivot dituntaskan:** Batch 4 *memutuskan* arah; **Batch 5 menjadikannya sistem & model
> bisnis kanonik** — **Outcome-as-a-Service (OaaS)**. Divalidasi riset pasar 2025–2026 dengan
> **angka nyata** (Intercom Fin $0.99/resolution, Zendesk $1.50, HubSpot $0.50, Gartner 30%
> outcome-based by 2025, Fin AI ROI $3.50/$1), dirumuskan model uang **hibrida** (Setup +
> langganan + jasa), mesin delivery + proof-of-outcome, dan diikat ke **kode yang sudah live**
> (`/solutions`, `/developers`, engine MoR). **Batch 5 = sumber kebenaran framing & model saat ini.**

| # | Dokumen | Isi |
|---|---|---|
| B5-00 | **[INDEX](batch-5-outcome-foundry/B5-00-INDEX.md)** | Peta Batch 5 + tesis pivot + non-negotiables |
| B5-01 | **[OAAS-RESEARCH](batch-5-outcome-foundry/B5-01-OAAS-RESEARCH-DOC.md)** | Riset OaaS/RaaS/Service-as-a-Software 2025–2026: definisi, tren, **angka nyata bersumber**, pesaing, batas struktural |
| B5-02 | **[OUTCOME-FOUNDRY-CONCEPT](batch-5-outcome-foundry/B5-02-OUTCOME-FOUNDRY-CONCEPT-DOC.md)** | Definisi sistem 3-lapis, 7 prinsip, mesin→outcome, taksonomi, Definition-of-Outcome (DoO) |
| B5-03 | **[OUTCOME-BUSINESS-MODEL](batch-5-outcome-foundry/B5-03-OUTCOME-BUSINESS-MODEL-DOC.md)** | Pricing hibrida, value-metric, unit-economics, garansi, gating outcome-based |
| B5-04 | **[OUTCOME-DELIVERY-ENGINE](batch-5-outcome-foundry/B5-04-OUTCOME-DELIVERY-ENGINE-DOC.md)** | Pipeline skill→app (F0–F7), SLA/TTO, proof-of-outcome, gate kualitas, HITL |
| B5-05 | **[PIVOT-EXECUTION-MAP](batch-5-outcome-foundry/B5-05-PIVOT-EXECUTION-MAP-DOC.md)** | Status kode (live), gap tertutup/terbuka, roadmap R2–R5, DoD pivot |
| B5-06 | **[GAP-CLOSURE-AND-SYNTHESIS](batch-5-outcome-foundry/B5-06-GAP-CLOSURE-AND-SYNTHESIS-DOC.md)** | Sintesis Batch 1–5, peta supersede, gap masih terbuka, satu kalimat kanonik |

### 1.5 Batch 6 — AI Orchestration A2A (`batch-6-ai-orchestration/`)

> Orchestrator nyata: **LangChain (tools) + LangGraph (state+HITL) + CrewAI (multi-agent)**
> di HF Space, dipanggil via edge gateway Hono `POST /api/orchestrate`.

| # | Dokumen | Isi |
|---|---|---|
| B6-00 | **[AI-ORCHESTRATION-A2A](batch-6-ai-orchestration/B6-00-AI-ORCHESTRATION-A2A-DOC.md)** | Arsitektur A2A, edge gateway, HITL gate, verifikasi end-to-end |

### 1.6 Batch 7 — GitHub Agentic Workflows (`batch-7-agentic-workflows/`)

> Workflow agentik (gh-aw) yang **merawat REPO** (beda dari Batch 6 yang merawat PRODUK):
> status harian, issue triage, SSOT guardian — patuh Truth-Lock + HITL + safe-outputs.

| # | Dokumen | Isi |
|---|---|---|
| B7-00 | **[GITHUB-AGENTIC-WORKFLOWS](batch-7-agentic-workflows/B7-00-GITHUB-AGENTIC-WORKFLOWS-DOC.md)** | Konsep gh-aw, 3 workflow, guardrails, aktivasi |

### 1.8 Batch 9 — Standar & Eksekusi R6 (`standards/`) ⭐ TERBARU

> **Eksekusi roadmap R6** dari Batch 8 menjadi aksi nyata. **R6-1 & R6-2 SELESAI** (murni
> dokumen/skill — aman, credit-aware). **R6-3 & R6-4 = spec siap-eksekusi** (kode menunggu HITL
> owner: schema D1, pricing, customer-facing). Menutup gap EG1/EG2/EG10 (authoring) & EG9/EG3 (security).

| # | Dokumen | Isi |
|---|---|---|
| R6-1 | **[SKILL-AUTHORING-STANDARD](standards/SKILL-AUTHORING-STANDARD.md)** ✅ | Frontmatter wajib + 4 field khas SAF (`outcome`/`cloudflare-native`/`hitl-gate`/`drift-prone`), struktur `references/`, audit 39 skill, checklist review |
| R6-2 | _(diterapkan)_ ✅ | Prompt-Defense Baseline → `sovereign-zero-trust` ZT-8/ZT-9 + `B2-05 [PROMPT-DEFENSE]` + `04-PRODUCTIONIZED §8` |
| R6-3 | **[R6-3-EVAL-LOOP-SPEC](standards/R6-3-EVAL-LOOP-SPEC.md)** 📋 | Trace D1 + verifier (ikat DoO B5-02) + promoted playbook — spec, kode tunggu HITL |
| R6-4 | **[R6-4-AGENTSHIELD-SKU-SPEC](standards/R6-4-AGENTSHIELD-SKU-SPEC.md)** 📋 | SKU keamanan done-for-you + `/security-audit` — spec, pricing/customer-facing tunggu HITL |

### 1.7 Batch 8 — ECC Reference & Upgrade (`batch-8-ecc-reference/`)

> **Deep-dive repo referensi `affaan-m/ECC`** ("Everything Claude Code": 211K★, 271 skills,
> 67 agents, 92 commands, 114 rules) sebagai **cermin rekayasa & kompetitif**. Hasil: analisis
> kanonik + gap-map (EG1–EG10) + roadmap upgrade R6 (RICE). **Menambah lensa upgrade; TIDAK
> men-supersede** doctrine inti atau framing OaaS (Batch 5). Moat lokal (Indonesia-first, MoR,
> outcome, edge) ditegaskan agar tidak hilang saat adopsi. ⚠️ Truth-Lock: analisis+blueprint
> saja — eksekusi kode R6 menunggu sprint berikut + HITL owner.

| # | Dokumen | Isi |
|---|---|---|
| B8-00 | **[INDEX](batch-8-ecc-reference/B8-00-INDEX.md)** | Peta Batch 8 + tesis adopsi 5-poin + non-negotiables |
| B8-01 | **[ECC-DEEP-DIVE](batch-8-ecc-reference/B8-01-ECC-DEEP-DIVE-DOC.md)** | Apa itu ECC, skala terverifikasi, arsitektur 5-lapis, security, model bisnis berlapis |
| B8-02 | **[GAP-MAP ECC vs SAF](batch-8-ecc-reference/B8-02-GAP-MAP-ECC-vs-SAF-DOC.md)** | Gap EG1–EG10, pemetaan → SSOT, **6 moat unik kita**, matriks adopt/adapt/reject |
| B8-03 | **[UPGRADE-BLUEPRINT](batch-8-ecc-reference/B8-03-UPGRADE-BLUEPRINT-DOC.md)** | Roadmap R6 (R6-1…R6-6) RICE + spec per item + upgrade dok SSOT + next steps |

### 1.9 Batch 10 — Launch From Zero (`batch-10-launch-zero/`) ⭐ TERBARU & KANONIK

> **Lapisan peluncuran nyata.** Produk sudah **LIVE & komersial** (`outcome-foundry.biz.id`,
> repo `Sparkmind-obp-off/Outcome-Foundry`, payment Duitku PRODUCTION). Batch 4–5 menjawab
> *what & why*; **Batch 10 menjawab *how to START*** — cara mendapatkan **100 pembeli pertama
> dari 0 follower**, tanpa modal besar, **faceless** (tanpa kamera), **free-tier & no-credit-card**.
> Menutup gap #1 dari Gap-List: **traffic = 0 → distribusi > funnel**.

| # | Dokumen | Isi |
|---|---|---|
| B10-00 | **[INDEX](batch-10-launch-zero/B10-00-INDEX.md)** | Peta Batch 10 + mandat owner + non-negotiable launch |
| B10-01 | **[SECRET-DOCTRINE](batch-10-launch-zero/B10-01-SECRET-DOCTRINE.md)** 🔒 | 7 keunggulan "unfair": niche wedge, proof-first, MoR-invisible, 1-operator leverage, distribusi>funnel |
| B10-02 | **[LAUNCH-STRATEGY-ZERO](batch-10-launch-zero/B10-02-LAUNCH-STRATEGY-ZERO.md)** | Strategi 90 hari: flagship niche, beachhead, proof-of-work sebelum klien, urutan eksekusi |
| B10-03 | **[GTM-ZERO-FOLLOWER](batch-10-launch-zero/B10-03-GTM-ZERO-FOLLOWER.md)** | 5 cara dapat lead tanpa follower, cold DM script, seeding komunitas |
| B10-04 | **[FREE-TIER-CONTENT-TOOLKIT](batch-10-launch-zero/B10-04-FREE-TIER-CONTENT-TOOLKIT.md)** | Riset tool free/no-CC (Higgsfield, Dreamina, AI Studio, Canva, CapCut, dst) + workflow faceless + prompt bank |
| B10-05 | **[CONTENT-ENGINE-30DAY](batch-10-launch-zero/B10-05-CONTENT-ENGINE-30DAY.md)** | 5 pilar konten + kalender 30 hari siap-tempel + template caption + funnel VSL faceless |

---

## 1.10 CODEBASE-TRUTH — Rekonsiliasi "Dua Codebase" (Truth-Lock) ⭐ WAJIB BACA

> **[CODEBASE-TRUTH-RECONCILIATION](CODEBASE-TRUTH-RECONCILIATION.md)** menyelesaikan gap kanonik
> #1: SSOT lama mendeskripsikan **codebase marketplace "Sovereign-Agent-Foundry"**, sedangkan
> yang **LIVE** adalah **`obp-checkout-orchestrator` / Outcome Foundry**. Doc ini menetapkan:
> **KODE LIVE selalu menang** bila terjadi konflik klaim (D-1 Truth-Lock), memetakan status route
> nyata (diverifikasi HTTP 2026-07-01), dan menjadi jangkar kebenaran untuk seluruh SSOT.

---

## 2. Ringkasan eksekutif (TL;DR)

**SparkMind** adalah **Outcome Foundry untuk UMKM/SMB Indonesia** — pabrik yang mengubah
masalah bisnis menjadi **hasil yang sudah jadi & jalan** (aplikasi, otomasi, sistem) sebagai
**Outcome-as-a-Service (OaaS)**. **36 sovereign skill = mesin**; yang dijual ke pasar =
**outcome** (paket hibrida: Setup + langganan + jasa). Pembayaran lokal **QRIS/VA** lewat
**Oasis BI Pro (OBP)** sebagai **Merchant-of-Record (MoR)** via **Duitku** (PRODUCTION, uang riil).
Jalur developer (skill mentah) tetap ada sebagai **proof & top-of-funnel** di `/developers`.

- **Status:** ✅ PRODUCTION LIVE — https://sparkmind-obp.pages.dev
- **Stack:** 100% Cloudflare-Native (Hono + Pages + D1) — ZERO VPS.
- **Katalog (mesin):** 36 skill, 6 sub-brand, harga Rp 59k–149k, **total nilai katalog Rp 3,124,000**.
- **Doctrine:** 4-Layer Hybrid Lock (Brand → Merchant → Domain → Compliance).
- **Diferensiasi:** Indonesia-first, payment lokal (Duitku/QRIS/VA), produk = sistem agentik siap-pakai (bukan sekadar prompt).

> ⭐ **REPOSITIONING (Batch 4):** 36 skill = **mesin**; yang dijual ke pasar = **HASIL/outcome**
> (app & sistem bisnis yang langsung jalan) ke **30 juta+ UMKM/SMB Indonesia** — bukan hanya
> niche pengguna Genspark/Claude. Lihat **Batch 4** (§1.3) untuk positioning, target-market,
> produk, GTM, & migrasi.

---

## 3. Doctrine kanonik (Non-Negotiables)

Diturunkan dari MASTER-ARCHITECT-PROMPT v8.0 + D-1 Truth-Lock:

1. **100% Cloudflare-Native** — Workers/Pages + D1/KV/R2. ZERO VPS, ZERO Vercel/Netlify.
2. **D-1 Truth-Lock** — jujur soal batas platform; tidak ada klaim palsu tentang kapabilitas.
3. **Indonesia-first** — copy, harga (IDR), dan payment (Duitku) berorientasi pasar Indonesia.
4. **Credit-aware** — eksekusi hemat token/biaya; riset fokus ke sumber resmi.
5. **MoR compliance** — disclosure Oasis BI Pro di footer & checkout; brand ledger tercatat.
6. **HITL gates** — payment / legal / customer-facing / secrets / outbound butuh persetujuan owner.
7. **Verifikasi (DoD)** — output digate rubrik sebelum dianggap selesai (`sovereign-verify-rubric`).

---

## 4. Arsitektur sistem agentik (2 pack saling melengkapi)

> Inti D-1 Truth-Lock: Genspark AI Dev = **1 agent / sesi**. "Full team" = **role-switching
> terstruktur**, bukan 16 proses paralel. Hasilnya setara: setiap keputusan dibuat dengan
> "topi" role yang benar, ter-audit, ter-gate HITL.

```
PACK A — SOVEREIGN-SKILLS v5.0 (BAGAIMANA eksekusi teknis)
  master-boot → context-injection → credit-aware (guard)
    → orchestration-patterns → verify-rubric → zero-trust
    → workflow-ops → cf-byok-deploy → github-push → fullstack-cycle

PACK B — AGENTIC-TEAM v2.0 (SIAPA yang memutuskan)
  team-boot → orchestrator (L1)
    → cofounder (L0.5)
    → C-Suite: cto · cmo · cpo · cfo · coo (L2)
    → squads: engineering · product · marketing · sales-cs · opsfinance (L3)
    → specialists (L4)
    → claw-actuation · hermes-memory (L5)
```

Prioritas konflik: **credit-aware (guard) > zero-trust > skill fase > fullstack-cycle
(orkestrator) > team C-Suite/squad > default system**.

---

## 5. Cara memakai SSOT ini

- **Onboarding owner/partner baru** → baca 00 → **B4-00 → B4-01** → 01 → 04 → 05.
- **Keputusan strategis (pasar luas)** → **B4-01 → B4-02 → B4-03 → B4-04** (lalu 06 → 07 → 08 sbg konteks lama).
- **Eksekusi reposition** → **B4-05** → 12 → B2 (runbook) → B3 (skala).
- **Eksekusi rilis** → 10 → 11 → 12.
- **Audit teknis** → 03 → 04.

> Setiap dokumen mencantumkan **sumber kanonik** (path repo) agar dapat di-cross-check.
> SSOT ini di-push ke repo `Sovereign-Agent-Foundry/docs/ssot/` sebagai acuan tunggal.
