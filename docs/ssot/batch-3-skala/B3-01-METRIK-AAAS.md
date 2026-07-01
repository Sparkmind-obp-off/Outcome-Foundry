# B3-01 · METRIK AaaS (AGENT-AS-A-SERVICE)

> SSOT Batch 3 — Skala · SPARKMIND-OBP / Sovereign Agent Foundry
> Tujuan: satu set KPI ringkas tapi cukup untuk mengarahkan keputusan skala.
> Sumber data: D1 (`orders`, `licenses`, `leads`, `waitlist`, `brand_ledger`, `webhook_events`) + analitik halaman.

---

## 0. Prinsip Pengukuran

- **Sedikit metrik, sering dilihat.** Lebih baik 8 KPI yang dipantau daripada 40 yang diabaikan.
- **Tiap KPI punya: definisi · sumber · target · gate aksi.**
- **Privasi-aware.** Tidak menyimpan PII berlebih; cukup yang perlu untuk transaksi & lisensi.

---

## 1. Funnel Akuisisi → Aktivasi

| KPI | Definisi | Sumber D1 / data | Target awal |
|---|---|---|---|
| Visitor → Lead | % pengunjung yang isi waitlist/intake | `waitlist`,`leads` / analitik | ≥ 3% |
| Lead → Checkout | % lead yang mulai checkout | `orders` (status created) | ≥ 25% |
| Checkout → Paid | % checkout yang sukses bayar | `orders` (status paid via webhook) | ≥ 60% |
| Paid → Activated | % pembeli yang download lisensi ≥1x | `licenses` (downloads_used > 0) | ≥ 85% |

> **Conversion utama (Visitor→Paid)** = perkalian rantai di atas. Pantau mingguan.

---

## 2. Retensi & Ekspansi

| KPI | Definisi | Sumber | Catatan |
|---|---|---|---|
| Repeat-buy rate | % customer dengan ≥2 order | `orders` group by customer | indikator value produk |
| Founder-pass aktif | jumlah langganan 149k/bln aktif | `orders`/offers | recurring revenue |
| Bundle take-rate | % paid yang ambil all-access 990k | `orders` (offer=bundle) | ekspansi ARPU |
| License utilization | rata-rata downloads_used / max_downloads | `licenses` | deteksi abuse / nilai |

---

## 3. Unit Economics

| KPI | Rumus | Target |
|---|---|---|
| ARPU | total revenue / jumlah pembeli unik | naik dari waktu ke waktu |
| AOV (avg order value) | total revenue / jumlah order paid | ≥ 79k IDR |
| Gross margin | (revenue − fee Duitku − biaya CF) / revenue | ≥ 85% (produk digital) |
| Refund/chargeback rate | order direfund / order paid | < 2% |

> Catatan MoR: revenue diakui melalui Oasis BI Pro (Merchant-of-Record); rekonsiliasi lewat `brand_ledger`.

---

## 4. Kesehatan Operasional (Reliability)

| KPI | Definisi | Sumber | Target |
|---|---|---|---|
| Webhook success | % callback Duitku terverifikasi & idempoten | `webhook_events` | ≥ 99.5% |
| Signature-fail count | jumlah callback gagal verifikasi HMAC/MD5 | log/`webhook_events` | mendekati 0 (selidiki tiap kejadian) |
| Page availability | % request 200 untuk halaman inti | smoke-test / analitik | ≥ 99.9% |
| Download success | % `/api/download/:token` sukses | `licenses` | ≥ 99% |

---

## 5. Per-Brand (4-Layer Lock view)

Pecah KPI utama per sub-brand untuk melihat brand mana yang menarik:

| Brand | Warna | Revenue | Paid orders | Repeat % |
|---|---|---|---|---|
| sparkmind | #6366f1 | … | … | … |
| barberkas | #f59e0b | … | … | … |
| kuratorkas | #10b981 | … | … | … |
| pacelokal | #ef4444 | … | … | … |
| nurani | #0ea5e9 | … | … | … |
| momentkas | #a855f7 | … | … | … |

> Query dasar: `SELECT brand, SUM(amount) FROM orders WHERE status='paid' GROUP BY brand;` (via `brand_ledger` untuk kepatuhan).

---

## 6. Ritme Review & Gate

| Kadens | Yang dilihat | Aksi & gate |
|---|---|---|
| Harian | Webhook success, signature-fail, availability | Anomali → buka B3-03 incident runbook |
| Mingguan | Funnel Visitor→Paid, AOV | Eksperimen growth (gate: copy/harga = approval owner) |
| Bulanan | ARPU, retensi, per-brand, margin | Keputusan skala/pricing (gate: perubahan harga = approval owner) |

---

## 7. Cara Ambil Data (contoh, lokal)

```bash
# Total revenue paid
npx wrangler d1 execute sparkmind-obp-production --local \
  --command="SELECT COUNT(*) AS paid, SUM(amount) AS revenue FROM orders WHERE status='paid';"

# Aktivasi lisensi
npx wrangler d1 execute sparkmind-obp-production --local \
  --command="SELECT COUNT(*) FROM licenses WHERE downloads_used > 0;"

# Webhook health
npx wrangler d1 execute sparkmind-obp-production --local \
  --command="SELECT COUNT(*) FROM webhook_events;"
```

> Untuk produksi: ganti ke perintah tanpa `--local` sesuai jalur deploy aktif (gate approval untuk akses data prod).
