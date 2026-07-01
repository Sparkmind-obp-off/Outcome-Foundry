# B2-02 — API SPEC (Agen-Readable)
## SPARKMIND-OBP · Sovereign Agent Foundry · SSOT Batch 2

> v1.0 · 2026-06-20 · Kontrak API kanonik. Sumber kebenaran: `src/index.tsx`.
> Base URL prod: `https://sparkmind-obp.pages.dev` · Dev: `http://localhost:3000`.
> Semua body JSON kecuali webhook (x-www-form-urlencoded).

---

## 1. Konvensi

- **Sukses:** `200` + JSON. Banyak endpoint memakai `{ ok: true, ... }`.
- **Error:** `4xx/5xx` + `{ "error": "<kode>" }`. Kode error stabil (lihat tabel tiap endpoint).
- **Header keamanan** otomatis di semua respons: `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`.

---

## 2. Halaman SSR (GET, HTML)

| Path | Keterangan |
|---|---|
| `/` | Landing |
| `/catalog` | Katalog per sub-brand |
| `/pricing` | Tiering harga + bundle/offer |
| `/product/:slug` | Detail produk + form checkout |
| `/about` (`/docs`→redirect) | Doctrine 4-layer |
| `/thank-you` | Halaman return Duitku |
| `/legal`, `/legal/:slug` | Legal Hub (`terms`/`refund`/`privacy`/`compliance`) |
| `/checkout/:slug` | Offer checkout (`all-access-bundle`/`founder-pass`) |
| `/done-for-you`, `/partner` | Intake high-ticket / kemitraan |
| `/orders` | Buyer dashboard (lookup by Merchant Order ID) |
| `/download/:token` | **(baru)** Halaman unduh (UX) |
| `/admin` | **(baru)** Dashboard admin (gate `ADMIN_TOKEN`) |
| `/robots.txt`, `/sitemap.xml`, `/favicon.ico` | SEO/aset |

---

## 3. API JSON

### 3.1 `GET /api/products`
- **Out:** `{ count: number, products: Product[] }`
- `curl http://localhost:3000/api/products`

### 3.2 `GET /api/product/:slug`
- **Out 200:** `Product` · **Out 404:** `{ error: "not_found" }`

### 3.3 `GET /api/brands`
- **Out:** `Record<BrandKey,{name,color,desc}>`

### 3.4 `POST /api/checkout`
- **In:** `{ slug: string, email: string, name: string }`
  (`slug` = produk satuan ATAU offer `all-access-bundle`/`founder-pass`)
- **Out 200:** `{ ok:true, merchantOrderId, reference, paymentUrl }`
- **Errors:** `400 invalid_json` · `400 missing_fields` · `404 product_not_found` ·
  `502 duitku_failed` (+`message`,`merchantOrderId`)
- **Efek samping:** insert `customers` (ignore dup) + `orders` (pending) → gateway `createInvoice`
  → update order dengan `reference`+`payment_url`.
```bash
curl -X POST http://localhost:3000/api/checkout -H 'Content-Type: application/json' \
  -d '{"slug":"sovereign-cfo","email":"buyer@mail.com","name":"Buyer"}'
```

### 3.5 `GET /api/order/:moid`
- **Out 200:** order + `license_token`, `download_count`, `max_downloads`, `downloads_remaining`
- **Out 404:** `{ error:"not_found" }`

### 3.6 `POST /api/waitlist`
- **In:** `{ email: string, slug?: string }` · **Out:** `{ ok:true }` · **Err:** `400 missing_email`

### 3.7 `POST /api/intake`
- **In:** `{ name?, email, wa?, need, kind? }` (`kind`: `done-for-you`|`partner`|`mor-aas`)
- **Out:** `{ ok:true }` · **Err:** `400 missing_fields` → tabel `leads`

### 3.8 `GET /api/download/:token`
- **Out 200:** `{ ok:true, product_slug, file, downloads_remaining }`
- **Errors:** `404 invalid_token` · `403 download_limit_reached`
- **Efek:** increment `download_count`.

### 3.9 `GET /api/health`
- **Out:** `{ status:"ok", service:"sparkmind-obp", products:36 }`

### 3.10 `GET /api/admin/stats` *(baru — gate)*
- **Auth:** `?token=<ADMIN_TOKEN>` atau header `x-admin-token`
- **Out 200:** `{ ok:true, orders_total, orders_paid, revenue_idr }`
- **Out 401:** `{ error:"unauthorized" }`

---

## 4. Webhook

### `POST /webhook/duitku` (x-www-form-urlencoded)
- **In (form):** `merchantCode, amount, merchantOrderId, signature, resultCode, reference`
- **Verifikasi:** gateway adapter → HMAC-SHA256(`merchantCode+amount+merchantOrderId`, apiKey),
  fallback MD5. Invalid → `400 "Invalid signature"`.
- **resultCode `00` (sukses):** order→`paid`, mint `licenses.token`, catat `brand_ledger`,
  **kirim email lisensi** (env-gated Resend). Selain `00` → order `failed`.
- **Selalu:** simpan ke `webhook_events` lalu set `processed=1`. Return `"OK"`.

---

## 5. Tipe data inti (ringkas)

```ts
interface Product { slug; name; tagline; description; brand: BrandKey; price_idr; file_key }
type BrandKey = 'sparkmind'|'barberkas'|'kuratorkas'|'pacelokal'|'nurani'|'momentkas'
interface Offer { slug; name; model:'one-time'|'subscription'|'service'|'partner'; price_idr|null; ... }
```

---

## 6. Binding environment (Bindings)

| Var | Wajib | Fungsi |
|---|---|---|
| `DB` | ✅ | D1 database |
| `DUITKU_MERCHANT_CODE` / `DUITKU_API_KEY` | ✅ | kredensial Duitku (secret) |
| `DUITKU_ENV` | ✅ | `production`/`sandbox` |
| `DUITKU_CALLBACK_URL` / `DUITKU_RETURN_URL` | ✅ | URL webhook & return |
| `PAYMENT_PROVIDER` | ⛔opsional | pilih gateway (default `duitku`) |
| `RESEND_API_KEY` / `RESEND_FROM` | ⛔opsional | email lisensi (no-op bila kosong) |
| `ADMIN_TOKEN` | ⛔opsional | proteksi `/admin` |
| `R2` | ⛔opsional | penyimpanan biner skill (T2) |
