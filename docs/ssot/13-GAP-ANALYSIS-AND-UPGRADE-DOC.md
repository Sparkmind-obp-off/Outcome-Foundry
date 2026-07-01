# GAP-ANALYSIS & UPGRADE-DOC — Enhancement Log
## SPARKMIND-OBP · Sovereign Agent Foundry

> SSOT batch 13 · v1.0 · 2026-06-20 · Hasil deep-dive 3 repo (Sovereign-Agent-Foundry, Cloudflare, Anthropic-Canon) + 13 SSOT canonical doc.
> Tujuan: tutup gap → marketplace yang **winning** & siap **dominasi** kategori, dengan legal **enterprise/production/industry-grade**.

---

## 1. Gap yang ditemukan (vs SSOT)

| # | Gap (SSOT ref) | Status sebelum | Tindakan |
|---|---|---|---|
| G1 | Halaman kebijakan: refund/privasi(PDP)/terms (LAUNCH §3, TODO T8) | ❌ belum ada | ✅ **Legal Hub** lengkap (4 dok) dibuat |
| G2 | All-Access Bundle (990k) sebagai SKU+offer (MONET §3.2, TODO T4) | ❌ belum ada | ✅ Offer + halaman checkout `/checkout/all-access-bundle` |
| G3 | Founder Pass (149k/bln) continuity/MRR (MONET, TODO T6) | ❌ belum ada | ✅ Offer + `/checkout/founder-pass` |
| G4 | Halaman Done-for-You + intake form (TODO T7) | ❌ belum ada | ✅ `/done-for-you` + `POST /api/intake` + tabel `leads` |
| G5 | Program reseller/white-label & MoR-aaS (TODO T11/T12) | ❌ belum ada | ✅ `/partner` + intake kemitraan |
| G6 | Dashboard pembeli (riwayat + unduh ulang) (TODO T9) | ❌ belum ada | ✅ `/orders` lookup + API order diperkaya (license_token) |
| G7 | SEO/OG/discoverability (LAUNCH §4, DOMINATION) | ⚠️ minimal | ✅ OG meta, Twitter card, JSON-LD, `robots.txt`, `sitemap.xml`, OG image |
| G8 | Kontak support tampil (LAUNCH §3) | ❌ belum ada | ✅ Kontak email (support/legal/privacy) di Legal Hub & footer legal |

---

## 2. Yang ditambahkan (ringkas teknis)

- **`src/data/legal.ts`** — konten 4 dokumen legal (Terms, Refund, Privacy/UU PDP 27/2022, Compliance/MoR) setara standar industri.
- **`src/data/offers.ts`** — 4 SKU perluasan revenue (bundle, Founder Pass, Done-for-You, Partner) + util nilai katalog.
- **`src/views/extra.tsx`** — LegalHub, LegalPage, OffersSection, CheckoutOffer, DoneForYou, Partner, OrderLookup.
- **Routes baru** (`src/index.tsx`): `/legal`, `/legal/:slug`, `/checkout/:slug`, `/done-for-you`, `/partner`, `/orders`, `/robots.txt`, `/sitemap.xml`.
- **API baru**: `POST /api/intake` (lead high-ticket/partner); `GET /api/order/:moid` diperkaya `license_token` + `downloads_remaining`.
- **DB**: migrasi `0002_leads_and_offers.sql` (tabel `leads`).
- **Checkout engine**: mendukung offer one-time (bundle) & subscription (Founder Pass bulan pertama) lewat jalur Duitku yang sama.
- **Frontend**: `intake.js`, `order.js`, `og.svg`.
- **SEO**: OG/Twitter/JSON-LD di `renderer.tsx`.

---

## 3. Dampak terhadap strategi

- **Winning (batch 07):** anchor offer 990k + tripwire + continuity → menaikkan AOV & LTV ladder aktif end-to-end.
- **Dominasi (batch 08):** `/partner` membuka sisi-suplai (marketplace 2-sisi) + MoR-aaS; SEO/sitemap mempercepat menjadi default kategori.
- **Compliance (batch 04/05):** Legal Hub enterprise-grade menutup gate compliance LAUNCH §3 → mendekati **FULL-GO**.

---

## 4. Sisa backlog (belum, untuk sprint berikut)

- T1 — 1 transaksi paid live (butuh aksi manual owner).
- T2 — file skill ke **R2** + bind `/api/download/:token` (saat ini metadata).
- T3 — email license otomatis (Resend/Mailgun REST).
- T5 — bind custom domain + update callback/return URL.
- T10 — dashboard admin (orders/ledger/license/leads).
- T14 — abstraksi gateway (adapter alternatif selain Duitku).

---

## 5. UPGRADE batch 14 (2026-06-20) — sprint enhancement

> Deep-dive ulang + recovery `webapp.zip` (full, non-truncated) → enhance production-grade.

| # | Item | Status sebelum | Tindakan (batch 14) |
|---|---|---|---|
| U1 (T10) | Dashboard admin (orders/revenue/license/leads/ledger) | ❌ belum ada | ✅ `/admin` (proteksi `ADMIN_TOKEN`) + `GET /api/admin/stats` |
| U2 (T14) | Abstraksi gateway pembayaran | ❌ langsung ke Duitku | ✅ `src/lib/gateway.ts` — interface `PaymentGateway` + adapter Duitku; checkout & webhook lewat `getGateway(env)` |
| U3 (T3) | Email lisensi otomatis | ❌ belum ada | ✅ `src/lib/email.ts` (Resend REST, **env-gated** — no-op bila secret kosong); dipanggil di webhook `paid` |
| U4 | Halaman unduh (UX) | ⚠️ hanya JSON | ✅ `/download/:token` (render halaman) + `download.js`; `/api/download/:token` tetap JSON |
| U5 | Security headers (hardening) | ❌ belum ada | ✅ middleware global: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `HSTS` |
| U6 | Binding tipe baru | — | ✅ `types.ts`: `PAYMENT_PROVIDER`, `RESEND_API_KEY`, `RESEND_FROM`, `ADMIN_TOKEN`, `R2?` (opsional, aman bila kosong) |

**Catatan kompatibilitas:** semua fitur batch 14 bersifat **additive & backward-compatible**.
Tanpa env baru → app berperilaku persis seperti sebelumnya (email no-op, admin tampilkan login,
gateway default Duitku). Build SSR sukses (`dist/_worker.js`), 36 produk, health OK.

**Sisa setelah batch 14:** T1 (transaksi live manual), T2 (upload biner ke R2 — binding `R2`
sudah disiapkan di `types.ts`), T5 (custom domain).
