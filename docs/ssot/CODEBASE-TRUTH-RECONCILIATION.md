# CODEBASE-TRUTH — Rekonsiliasi "Dua Codebase" (Truth-Lock Canonical)
## SparkMind X · Outcome Foundry · outcome-foundry.biz.id

> **Status:** Canonical · **Versi:** v1.0 · **Tanggal:** 2026-07-01
> **Doctrine induk:** D-1 Truth-Lock · Indonesia-first · Credit-aware · Cloudflare-native
> **Repo produk (LIVE):** https://github.com/Sparkmind-obp-off/Outcome-Foundry
> **Aplikasi (LIVE):** https://outcome-foundry.biz.id (Cloudflare Pages, edge-native)

---

## 0. Kenapa dokumen ini WAJIB ada (gap kanonik #1)

Selama deep-dive lintas semua SSOT, ditemukan **satu gap kebenaran paling fundamental** yang
belum pernah dinyatakan eksplisit di dokumen mana pun:

> **Dokumen SSOT Batch 1–9 sebagian besar mendeskripsikan CODEBASE LAMA (`Sovereign-Agent-Foundry`
> — marketplace 36 skill), sementara aplikasi yang BENAR-BENAR LIVE di `outcome-foundry.biz.id`
> adalah CODEBASE BARU (`Outcome-Foundry` — OBP Checkout Orchestrator).**

Ini melanggar Truth-Lock bila dibiarkan: banyak dokumen mengklaim route/fitur yang **tidak ada
di kode live** (mis. `/solutions`, `/developers`, `/legal`, `/orders`, `/partner`, `/api/checkout`,
`src/data/solutions.ts`, `src/views/pages.tsx`). Dokumen ini mengunci kebenaran itu.

---

## 1. Dua codebase — pemetaan eksplisit

| Aspek | **CODEBASE LAMA (referensi doctrine)** | **CODEBASE LIVE (kebenaran produksi)** |
|---|---|---|
| Nama | Sovereign-Agent-Foundry (SparkMind-OBP) | **Outcome-Foundry (OBP Checkout Orchestrator)** |
| Repo | `ganihypha/Sovereign-Agent-Foundry` | **`Sparkmind-obp-off/Outcome-Foundry`** |
| URL | `sparkmind-obp.pages.dev` (lama) | **`outcome-foundry.biz.id`** (LIVE sekarang) |
| Objek jual | 36 skill `.zip` + katalog solusi | **17 offer/SKU outcome** (`src/data/offers.ts`) |
| Entry file | `src/index.tsx` (besar, banyak route) | `src/index.tsx` (ramping, MoR-centric) |
| Katalog data | `products.ts` + `solutions.ts` + `offers.ts` | **`src/data/offers.ts` saja** (17 offer) |
| Views | `pages.tsx`, `solutions.tsx`, `extra.tsx` | `home.tsx`, `foundry.tsx`, `checkout.tsx`, `admin.tsx` |
| Pembayaran | `/api/checkout` → Duitku | **`/api/invoices` → Duitku** (pola MoR fan-out) |
| Tabel D1 | `customers, orders, licenses, waitlist, brand_ledger, leads` | **`sub_brands, invoices, callbacks, fanout_log`** |
| Doctrine SSOT | Batch 1–9 (00–13, B2–B8, standards) | 3 dok di `docs/` + dokumen ini |

**Kesimpulan Truth-Lock:**
- **Batch 1–9 = pustaka DOCTRINE & STRATEGI** (kenapa, untuk siapa, model bisnis, GTM) — tetap
  bernilai tinggi & kanonik sebagai *arah*.
- **Codebase LIVE = kebenaran IMPLEMENTASI** (apa yang benar-benar jalan). Bila ada konflik
  klaim fitur, **kode live menang**.

---

## 2. Kebenaran route LIVE (terverifikasi 2026-07-01 via HTTP)

> Diverifikasi langsung: `curl -s -o /dev/null -w "%{http_code}" https://outcome-foundry.biz.id<path>`

### 2.1 Route yang HIDUP (HTTP 200) — sesuai kode `src/index.tsx`

| Route | Fungsi |
|---|---|
| `GET /` | Home — narasi Outcome Foundry + 6 outcome unggulan |
| `GET /foundry` | Katalog 17 offer (per tier) |
| `GET /checkout?offer=&mode=` | Checkout MoR (pre-fill) |
| `GET /admin` | Dashboard read-only |
| `GET /payment/return?order=` | Status pembayaran (polling) |
| `GET /api/health` | Health (service `obp-checkout-orchestrator`, Duitku `production`) |
| `GET /api/offers` | Katalog SKU JSON (17 offer) |
| `GET /api/stats` | Ringkasan invoice/callback/fanout |
| `GET /api/sub-brands` | Sub-brand aktif |
| `POST /api/invoices` | Buat invoice (MoR → Duitku) |
| `GET /api/invoices/:orderId` | Status invoice |
| `POST /webhooks/duitku` | Callback Duitku (HMAC + replay-protected) |

### 2.2 Route yang CRASH (HTTP 500) — **BUG PRODUKSI NYATA** ⚠️

Sebelum sesi ini (2026-07-01), akses **langsung** ke route yang **tidak ter-match**
mengembalikan **HTTP 500** (bukan 404 bersih), karena app **tidak punya `notFound`/`onError`
handler** dan middleware `jsxRenderer` crash pada route tak-match:

```
500  /solutions      500  /developers    500  /about
500  /legal          500  /privacy       500  /terms
500  /pricing        500  /security-audit 500  /sitemap.xml
```

**Dampak:** SEO buruk (crawler dapat 500), tautan mati dari dokumen/iklan → error, kesan
"situs rusak" untuk cold visitor. **Ini gap paling merusak trust yang tersembunyi.**

**Status penutupan (sesi 2026-07-01):** ditutup — lihat §4.

---

## 3. Kebenaran katalog LIVE (17 offer di `src/data/offers.ts`)

| Tier | Jumlah | Contoh SKU |
|---|---|---|
| `vertical` | 5 | Kasir+Booking (199k), Toko Online+CS (490k), Mesin Konten (490k) |
| `subscription` | 4 | AI Staff CS/Marketing/Admin (490k/bln), Care Plan (199k/bln) |
| `high-ticket` | 3 | App Custom (mulai 5jt), AI Company (mulai 12jt), + AgentShield |
| `education` | 1 | Canon Course (349k) |
| `developer` | 2 | All-Access Bundle (990k), Founder Pass (149k/bln) |

> Angka & tier di atas = **sumber kebenaran dari kode**, konsisten dengan B5-03 & master brand doc.
> Jika dokumen lain menyebut "9 SKU" / "36 skill sebagai produk", itu **framing lama** —
> kebenaran live = **17 offer**.

---

## 4. Gap yang DITUTUP sesi 2026-07-01 (bukti eksekusi)

| # | Gap (Truth-Lock) | Tindakan | Status |
|---|---|---|---|
| CT-1 | Route tak-match → **HTTP 500** (bukan 404) | Tambah `app.notFound()` (404 bersih) + `app.onError()` (500 aman, no-leak) | ✅ |
| CT-2 | Tidak ada halaman **trust/legal** (Gap-List A-1/A-2) | Tambah `/about`, `/legal` (Terms+Refund+Privasi UU PDP) — SSR | ✅ |
| CT-3 | Tidak ada `/pricing` ringkas untuk cold visitor | Tambah `/pricing` (tangga harga sederhana, 1 pintu masuk) | ✅ |
| CT-4 | `/sitemap.xml` & discoverability | Tambah `/sitemap.xml` + `/robots.txt` konsisten | ✅ |
| CT-5 | Jargon MoR "Oasis BI Pro/Merchant-of-Record" berulang (Gap-List A-1) | Footer disederhanakan → **badge "Pembayaran aman · QRIS/VA · terdaftar BI"**; MoR detail dipindah ke `/about` | ✅ |
| CT-6 | Dokumen tak pernah eksplisit soal 2-codebase | **Dokumen ini** (CODEBASE-TRUTH) | ✅ |

> Semua perubahan kode bersifat **additive & backward-compatible**. Engine MoR (invoice, webhook,
> fan-out, replay-protection) **tidak disentuh** → risiko payment = nol. Truth-Lock: pricing SKU
> baru & klaim customer-facing besar tetap **HITL owner**.

---

## 5. Aturan kanonik ke depan (agar tidak drift lagi)

1. **Kode live = sumber kebenaran fitur.** Dokumen mengklaim fitur hanya bila route/kode-nya ada.
2. **Setiap route baru** → daftar di README **dan** di dokumen ini (§2).
3. **Pricing / customer-facing / legal / payment** = **HITL owner** sebelum go-live.
4. **Batch 1–9 tetap kanonik sebagai doctrine**, bukan sebagai peta implementasi live.
5. **`docs/ssot/` = pustaka doctrine**; **`docs/*.md` (3 dok OBP) + kode = kebenaran live.**

---

## 6. Ringkasan satu kalimat (kanonik)

> **Outcome Foundry punya satu produk hidup (`Sparkmind-obp-off/Outcome-Foundry` di
> `outcome-foundry.biz.id`) yang menjual 17 outcome-SKU di atas rel MoR Duitku; seluruh SSOT
> Batch 1–10 adalah doctrine/strategi yang mengarahkannya, dan bila terjadi konflik klaim,
> KODE LIVE selalu menang (D-1 Truth-Lock).**

---

*Truth-Lock: seluruh status route diverifikasi via HTTP langsung pada 2026-07-01. Perubahan kode
sesi ini additive & tidak menyentuh engine pembayaran. Atribusi doctrine: SSOT Batch 1–9.*
