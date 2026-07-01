# ARCHITECT-DOC — Technical Architecture
## SPARKMIND-OBP · Sovereign Agent Foundry

> SSOT batch 03 · v1.0 · 2026-06-20 · Sumber: `src/`, `migrations/`, `wrangler.jsonc`, repo `Cloudflare` (acuan infra)

---

## 1. Prinsip arsitektur (Non-Negotiables teknis)

1. **100% Cloudflare-Native** — Hono (Workers) + Pages + D1. ZERO VPS / Vercel / Netlify.
2. **Edge-first SSR** — render HTML di edge via `c.render(<JSX/>)` (renderer.tsx), bukan SPA berat.
3. **Web APIs only** — `crypto.subtle` (HMAC-SHA256), `fetch`, `TextEncoder`. TIDAK ada Node `fs/crypto`.
4. **Stateless compute, stateful D1** — semua state persisten di D1 (bukan memory/file).
5. **Secret di edge** — `wrangler pages secret` (prod) / `.dev.vars` (lokal, gitignored).

---

## 2. Diagram sistem (high-level)

```
┌──────────────┐   HTTPS    ┌─────────────────────────────────────────┐
│  Browser     │ ─────────► │  Cloudflare Pages (Hono SSR)              │
│  (Indonesia) │ �„───────── │  sparkmind-obp.pages.dev                  │
└──────────────┘            │                                           │
                            │  Routes:                                  │
                            │   GET  /,/catalog,/pricing,/product/:slug │
                            │   POST /api/checkout  ─┐                  │
                            │   POST /webhook/duitku │  ┌─────────────┐ │
                            │   GET  /api/download   │  │  D1 (SQLite)│ │
                            │                        └─►│  6 tables   │ │
                            └────────────┬───────────┘  └─────────────┘ │
                                         │  fetch (Web API)             │
                                         ▼                              │
                            ┌─────────────────────────────┐            │
                            │  Duitku POP (PRODUCTION)     │            │
                            │  api-prod.duitku.com         │�„───────────┘
                            │  createInvoice → paymentUrl  │  callback
                            │  app-prod.duitku.com/redirect│  POST /webhook/duitku
                            └─────────────────────────────┘
```

---

## 3. Tech stack

| Layer | Teknologi | Versi | Catatan |
|---|---|---|---|
| Framework | **Hono** | ^4.6.14 | router + JSX SSR |
| Runtime | Cloudflare Workers/Pages | compat `nodejs_compat` | `pages_build_output_dir: ./dist` |
| Build | **Vite** + `@hono/vite-cloudflare-pages` | vite ^6 | output `dist/` |
| DB | **Cloudflare D1** (SQLite) | `sparkmind-obp-production` | id `a50feb42-…c948c` |
| Bahasa | **TypeScript** | ^5 | JSX via Hono renderer |
| UI | **TailwindCSS (CDN)** | — | no build-step CSS |
| Deploy | **Wrangler** | ^3.95 | `wrangler pages deploy dist` |
| Dev proc | **PM2** | — | `wrangler pages dev` (sandbox) |

---

## 4. Struktur kode

```
src/
├── index.tsx        # entry — semua route (SSR + API + webhook)
├── renderer.tsx     # JSX renderer (layout + <title>)
├── types.ts         # Bindings (D1 + DUITKU_*), Product, OrderRow, BrandKey
├── data/
│   ├── brands.ts    # MOR, MOTHER_BRAND, 6 BRANDS (4-Layer doctrine)
│   └── products.ts  # 36 PRODUCTS (slug, harga IDR, brand, file_key)
├── lib/
│   └── duitku.ts    # createInquiry() + verifyCallbackSignature() (Web Crypto)
└── views/
    └── pages.tsx    # Home, Catalog, Pricing, Product, About, ThankYou
public/static/       # checkout.js, style.css (serveStatic)
migrations/          # 0001_initial_schema.sql
seed.sql             # data awal lokal
```

---

## 5. Model data (D1 — 6 tabel)

| Tabel | Kolom kunci | Peran |
|---|---|---|
| `customers` | `email` UNIQUE, `name` | identitas pembeli |
| `orders` | `duitku_merchant_order_id` UNIQUE, `status`, `payment_amount_idr`, `payment_url` | siklus order (pending→paid→failed/expired) |
| `licenses` | `token` UNIQUE, `download_count`, `max_downloads=5` | hak unduh skill |
| `webhook_events` | `merchant_order_id`, `payload`, `processed` | audit & idempotensi callback |
| `waitlist` | `email`, `product_slug` | lead capture |
| `brand_ledger` | `brand`, `gross_idr`, `note` | **Layer 4 Compliance** — settlement MoR |

Index: `idx_orders_moid`, `idx_orders_status`, `idx_licenses_token`.

---

## 6. Integrasi pembayaran — Duitku POP (PRODUCTION)

| Aspek | Nilai |
|---|---|
| Mode | `DUITKU_ENV=production` (uang riil) |
| Merchant | `D20919` (MoR: Oasis BI Pro) |
| Endpoint createInvoice | `https://api-prod.duitku.com/api/merchant/createInvoice` |
| Redirect bayar | `https://app-prod.duitku.com/redirect_checkout` |

**Signature createInvoice (header):**
```
x-duitku-signature   = HMAC_SHA256(merchantCode + timestamp, apiKey)   // hex lowercase
x-duitku-timestamp   = Date.now()  (epoch ms, zona Jakarta)
x-duitku-merchantcode= merchantCode
```
**Signature callback (form-urlencoded):**
```
stringToSign = merchantCode + amount + merchantOrderId
signature    = HMAC_SHA256(stringToSign, apiKey)   // fallback MD5 untuk callback klasik
```
Implementasi: `crypto.subtle` (HMAC), MD5 murni-JS untuk fallback (Web Crypto tak dukung MD5).

---

## 7. Alur kritis (sequence)

### 7.1 Checkout → paymentUrl
```
POST /api/checkout {slug,name,email}
  → validasi produk (PRODUCTS)
  → upsert customer + insert order(status=pending, moid unik)
  → duitku.createInquiry() [header signature]
  → simpan reference + payment_url ke order
  → 200 {paymentUrl}  →  redirect user ke app-prod.duitku.com
```

### 7.2 Callback → paid → license
```
POST /webhook/duitku (x-www-form-urlencoded)
  → verifyCallbackSignature() (HMAC, fallback MD5)
  → jika invalid → 400
  → catat webhook_events (idempotensi via merchant_order_id)
  → update order status=paid
  → mint license token (max_downloads=5)
  → insert brand_ledger (brand, gross_idr)  [Layer 4]
  → 200 OK
```

### 7.3 Download
```
GET /api/download/:token
  → cari license by token
  → cek download_count < max_downloads
  → increment + return file (saat ini metadata; R2 = roadmap)
```

---

## 8. Konfigurasi & secret

| Secret | Sumber |
|---|---|
| `DUITKU_MERCHANT_CODE`, `DUITKU_API_KEY`, `DUITKU_ENV` | `wrangler pages secret put` (prod) |
| `DUITKU_CALLBACK_URL`, `DUITKU_RETURN_URL` | idem |
| Lokal dev | `.dev.vars` (gitignored), contoh di `.dev.vars.example` |

`wrangler.jsonc`: `name: sparkmind-obp`, `pages_build_output_dir: ./dist`,
`compatibility_flags: ["nodejs_compat"]`, binding D1 `DB`.

---

## 9. Acuan infra kanonik (repo Cloudflare)

Keputusan arsitektur dirujuk ke pustaka kanonik `Elfares24/Cloudflare`:
- `01-compute/02-pages.md`, `01-workers.md` — model SSR edge.
- `02-storage/01-d1.md`, `03-r2.md` — D1 (live) + R2 (roadmap file biner).
- `05-security/03-bot-turnstile.md` — anti-bot checkout (roadmap).
- `08-patterns/02-stack-agentic.md` — pola stack agentik.

---

## 10. Risiko teknis & mitigasi

| Risiko | Mitigasi |
|---|---|
| Webhook ganda | idempotensi via `webhook_events.merchant_order_id` |
| Signature mismatch | dukung HMAC-SHA256 + fallback MD5; log payload |
| File skill belum di R2 | roadmap: upload R2 + bind ke `/api/download/:token` |
| CPU 10ms free-tier | SSR ringan; tidak ada komputasi berat di request |
| Secret bocor | hanya via secret store; `.dev.vars` gitignored; `sovereign-zero-trust` |
