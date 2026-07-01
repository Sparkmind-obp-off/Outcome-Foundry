# DESIGN-DOC — UX / UI / Flow
## SPARKMIND-OBP · Sovereign Agent Foundry

> SSOT batch 02 · v1.0 · 2026-06-20 · Sumber: `src/views/pages.tsx`, `public/static/`, `brands.ts`

---

## 1. Prinsip desain

| Prinsip | Penerapan |
|---|---|
| **Indonesia-first** | Seluruh copy Bahasa Indonesia; CTA jelas ("Lihat & Beli", "Bayar via Duitku"). |
| **Trust-by-design** | Disclosure MoR (Oasis BI Pro) di footer & checkout; logo metode bayar lokal. |
| **Edge-fast** | SSR + Tailwind CDN; tanpa SPA berat → instan di koneksi Indonesia. |
| **Clarity over cleverness** | Hirarki: brand → kategori → produk → harga → checkout. |
| **Brand color system** | 6 sub-brand punya warna identitas (Layer 3 Domain). |

---

## 2. Sistem warna (per sub-brand)

| Sub-brand | Hex | Nuansa |
|---|---|---|
| SparkMind Core | `#6366f1` | indigo — fondasi/orkestrasi |
| BarberKas | `#f59e0b` | amber — kas/operasional |
| KuratorKas | `#10b981` | emerald — knowledge ops |
| PaceLokal | `#ef4444` | red — aktivasi lokal/GTM |
| Nurani.OS | `#0ea5e9` | sky — sosial/compliance |
| MomentKas | `#a855f7` | purple — event/actuation |

---

## 3. Sitemap & halaman

```
/                 Landing (hero + value prop + CTA katalog + trust strip)
├── /catalog      36 skill dikelompokkan per sub-brand (grid kartu)
├── /pricing      Tabel tiering harga IDR (59k–149k)
├── /product/:slug Detail skill + form checkout (nama, email)
├── /about (/docs) Doctrine 4-Layer Hybrid Lock + disclosure MoR
└── /thank-you    Konfirmasi return pasca-bayar
```

---

## 4. Komponen halaman (views/pages.tsx)

| Komponen | Elemen kunci |
|---|---|
| **Home** | hero headline + tagline, value prop 3-kolom, CTA "Jelajahi Katalog", trust strip (Duitku/QRIS/VA). |
| **Catalog** | section per sub-brand (warna brand), kartu produk (nama, tagline, harga, "Lihat & Beli"). |
| **Pricing** | tabel tier + jumlah skill per tier; penjelasan one-time purchase. |
| **Product** | judul, tagline, deskripsi, harga, **form checkout** (name+email) → tombol "Bayar via Duitku". |
| **About** | narasi 4-Layer (Brand→Merchant→Domain→Compliance) + disclosure MoR penuh. |
| **ThankYou** | pesan terima kasih + instruksi cek email/tautan unduh. |

---

## 5. Alur pengguna (user flow)

```
Landing → Katalog → pilih skill → Product detail
   → isi nama+email → "Bayar via Duitku"
   → POST /api/checkout → redirect app-prod.duitku.com
   → pilih metode (QRIS/VA/e-wallet) → bayar
   → Duitku callback → order paid → license minted
   → user kembali ke /thank-you → terima tautan unduh
```

**Micro-interactions (public/static/checkout.js):** submit form async → tampilkan
loading → redirect ke `paymentUrl`; handle error (tampilkan pesan jika `ok:false`).

---

## 6. Konten & voice (copy guidelines)

- **Voice:** percaya diri, lugas, membantu — bukan hype kosong (D-1 Truth-Lock).
- **Istilah teknis** (skill, agent, orchestrator) dipertahankan; dijelaskan singkat.
- **CTA pattern:** kata kerja + manfaat ("Bayar via Duitku", "Lihat & Beli").
- **Trust copy:** selalu sertakan disclosure MoR di titik pembayaran.

---

## 7. Aksesibilitas & responsif

| Aspek | Standar |
|---|---|
| Semantic HTML | `<header><nav><main><section><article><footer>` |
| Responsif | Tailwind breakpoints; grid katalog 1→2→3 kolom |
| Kontras | warna brand di atas latar netral, teks AA |
| Form | label jelas, validasi email, pesan error inline |

---

## 8. Aset statis

| File | Peran |
|---|---|
| `public/static/style.css` | override/utility tambahan di atas Tailwind CDN |
| `public/static/checkout.js` | logika submit checkout async + redirect |
| `favicon.ico` | route khusus di `index.tsx` |

---

## 9. Backlog desain (roadmap)

- Halaman **dashboard pembeli** (riwayat order + tautan unduh ulang).
- **Badge tier/brand** konsisten di kartu katalog.
- **Empty/loading/error states** standar.
- **OG image** per produk (social share) — tie ke `sovereign-gtm-engineering`.
