# TODO-ROADMAP-DOC — Prioritized Backlog
## SPARKMIND-OBP · Sovereign Agent Foundry

> SSOT batch 12 · v1.0 · 2026-06-20 · Backlog tunggal yang menyelaraskan teknis + monetisasi + GTM

---

## 1. Prioritas (RICE ringkas)

Skala: Impact (1–3), Effort (1–3, makin kecil makin murah). **P** = prioritas (tinggi=segera).

| ID | Tugas | Impact | Effort | P | Owner skill |
|---|---|---|---|---|---|
| T1 | **1 transaksi paid live** (nominal kecil) end-to-end | 3 | 1 | 🔴 P0 | workflow-ops, cfo |
| T2 | Upload skill ke **R2** + bind `/api/download/:token` | 3 | 2 | 🔴 P0 | cf-byok-deploy |
| T3 | **Email license** otomatis (Resend/Mailgun REST) | 3 | 2 | 🔴 P0 | gtm-engineering |
| T4 | **All-Access Bundle (990k)** sebagai SKU+offer | 3 | 1 | 🔴 P0 | cmo, cfo |
| T5 | Bind **custom domain** + update callback/return URL | 2 | 1 | 🟠 P1 | cf-byok-deploy |
| T6 | **Founder Pass (149k/bln)** continuity/MRR | 3 | 2 | 🟠 P1 | cfo, cpo |
| T7 | Halaman **Done-for-You** + intake form | 2 | 1 | 🟠 P1 | gtm-engineering |
| T8 | Halaman **kebijakan** (refund/privasi-PDP/terms) | 2 | 1 | 🟠 P1 | specialists, zero-trust |
| T9 | **Dashboard pembeli** (riwayat + unduh ulang) | 2 | 3 | 🟡 P2 | squad-engineering |
| T10 | **Dashboard admin** (orders/ledger/license) | 2 | 3 | 🟡 P2 | squad-engineering |
| T11 | Pilot **MoR-as-a-Service** (1 kreator) | 3 | 3 | 🟡 P2 | cfo, zero-trust |
| T12 | Program **reseller/white-label** (rev-share) | 3 | 2 | 🟡 P2 | enterprise-patterns |
| T13 | **Canon Course (ID)** dari 2 pustaka kanonik | 2 | 3 | 🟢 P3 | cmo, hermes-memory |
| T14 | Abstraksi **gateway** (adapter alt. selain Duitku) | 2 | 3 | 🟢 P3 | cto |
| T15 | **Turnstile** anti-bot di checkout | 1 | 1 | 🟢 P3 | zero-trust |

---

## 2. Sprint plan (selaras 90 hari Monetization/GTM)

### Sprint 1 (D0–D14) — Validasi delivery & AOV
- T1 transaksi paid live · T2 R2 download · T4 bundle 990k · 3 konten demo.
- **DoD:** pembeli bisa beli → bayar → unduh file nyata; bundle tampil.

### Sprint 2 (D15–D30) — Continuity & domain
- T3 email license · T5 custom domain · T6 Founder Pass · T8 kebijakan.
- **DoD:** license terkirim email; domain hidup; ada SKU langganan.

### Sprint 3 (D31–D60) — High-ticket pipeline
- T7 Done-for-You · T9 dashboard pembeli · mulai SEO landing sub-brand.
- **DoD:** intake high-ticket jalan; pembeli self-service.

### Sprint 4 (D61–D90) — Network effect
- T11 pilot MoR-aaS · T12 reseller · T10 dashboard admin · T13 teaser course.
- **DoD:** ≥ 1 partner transaksi; ops admin tersedia.

---

## 3. Definition of Done (global)

Setiap tugas selesai jika: kode hijau · entry URI 200 · DoD `sovereign-verify-rubric` lulus ·
README + SSOT diperbarui · commit & push ke `Sovereign-Agent-Foundry`.

---

## 4. Tech debt & catatan

- Endpoint download masih kembalikan metadata (bukan file) → T2.
- Belum ada idempotency key eksplisit di checkout (andalkan `moid` unik) → review T9/T10.
- `md5` fallback hanya untuk kompat callback klasik — utamakan HMAC.
- Belum ada test otomatis → pertimbangkan smoke-test script (LAUNCH §5) sebagai CI ringan.

---

## 5. Backlog ide (parking lot)

- Affiliate/referral program (rev-share).
- Multi-currency (selain IDR) untuk pasar regional.
- Skill versioning + changelog publik per produk.
- API publik untuk partner (langkah menuju "OS" — DOMINATION H4).
- Marketplace 2-sisi: onboarding kreator pihak-ketiga.
