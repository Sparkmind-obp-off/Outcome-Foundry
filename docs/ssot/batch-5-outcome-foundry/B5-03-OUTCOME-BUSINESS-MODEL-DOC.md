# B5-03 · OUTCOME-BUSINESS-MODEL-DOC — Model Bisnis OaaS
## SparkMind · SSOT Batch 5 · Pricing hibrida, value-metric, unit-economics

> v1.0 · 2026-06-20 · Fokus: bagaimana Outcome Foundry **menghasilkan uang** secara
> struktural-benar (hibrida), dengan value-metric jujur & unit-economics yang sehat.
> Diturunkan dari riset B5-01 (pure-outcome punya batas → hibrida menang).

---

## 1. Prinsip monetisasi kanonik

1. **Hibrida wajib:** setiap outcome = **base (sekali bayar) + langganan + jasa** — bukan
   pure-outcome. Base = lantai pendapatan (atasi kekhawatiran prediktabilitas CFO).
2. **Value-metric deterministik:** harga ditambatkan ke hasil yang **jelas & terukur**
   (app live, jam admin dihemat, jumlah tiket dibalas) — bukan metrik probabilistik
   ("revenue naik") yang sulit diatribusi.
3. **Tangga harga (good-better-best + land-expand):** DIY (murah, self-serve) → Setup (kami
   pasang) → DFY (jasa penuh) → langganan (retensi) → high-ticket (expand).
4. **IDR & QRIS-first:** semua harga rupiah, semua pembayaran lokal (QRIS/VA/e-wallet via Duitku).
5. **Multi-SKU per aset:** satu mesin skill menghasilkan banyak SKU (maksimalkan LTV).

---

## 2. Katalog harga kanonik (selaras kode `src/data/solutions.ts`)

> Sumber kebenaran harga = kode. Tabel ini cerminan kanoniknya (IDR).

| SKU / Plan | Model | Harga (IDR) | Tier | Checkout slug |
|---|---|---|---|---|
| Template app vertikal (DIY) | diy | 490.000 | vertical | `template-konten` (contoh) |
| Setup app vertikal (kami pasang) | dwy | 1.500.000 | vertical | (intake/DFY) |
| Care Plan (langganan/bln) | dfy | 199.000 | subscription | `care-plan` |
| AI Staff — CS (langganan/bln) | dfy | 490.000 | subscription | `ai-staff-cs` |
| AI Staff — Marketing (langganan/bln) | dfy | 490.000 | subscription | `ai-staff-marketing` |
| AI Staff — Admin (langganan/bln) | dfy | 490.000 | subscription | `ai-staff-admin` |
| App Custom (Done-for-You) | dfy | mulai 5.000.000 | high-ticket | (intake) |
| AI Company in a Box | dfy | mulai 12.000.000 | high-ticket | (intake) |
| Canon Course (edukasi) | diy | 349.000 | education | `canon-course` |
| All-Access Bundle (36 skill) | one-time | 990.000 | developer | `all-access-bundle` |
| Founder Pass (langganan bln-1) | subscription | 149.000 | developer | `founder-pass` |

> One-time SKU (care-plan/ai-staff/template/course/bundle/founder-pass) → checkout langsung
> via engine MoR. High-ticket & Setup → **intake** lalu invoice (HITL gate owner).

---

## 3. Value-metric per outcome (apa yang dibayar pelanggan)

| Outcome | Value-metric (deterministik) | Bukti (proof) |
|---|---|---|
| Kasir + Booking | App kas+booking **live & dipakai** | URL app + transaksi pertama |
| Toko Online + CS | Toko **online & CS auto-balas** | URL toko + log balasan CS |
| Mesin Konten | **N konten/promo** terjadwal per minggu | Kalender konten + post terbit |
| Event/Tiket | Halaman event **terbit & RSVP masuk** | URL event + daftar RSVP |
| Donasi/Keanggotaan | Halaman donasi **live & menerima** | URL + rekap donasi |
| Otomasi Admin | **Jam admin dihemat** / laporan otomatis | Sebelum/sesudah + laporan |
| App Custom | App **sesuai spec & ter-deploy** | URL + acceptance checklist |
| AI Company | C-Suite+squad **aktif** menjalankan fungsi | Dashboard peran + output |

> **Truth-Lock:** value-metric = hasil yang **bisa dibuktikan**, bukan janji bisnis pihak ketiga.

---

## 4. Unit-economics (model, *est.* — wajib divalidasi data nyata)

> Karena 100% edge-native (ZERO VPS), **COGS infra mendekati nol** → margin tinggi.

| Komponen | Asumsi *est.* | Catatan |
|---|---|---|
| COGS infra / order | ~Rp 0–ribuan | Cloudflare Pages/D1 free-tier → edge murah |
| Biaya delivery (kredit AI + waktu) | variabel | credit-aware: pipeline hemat token |
| Fee MoR/PG (Duitku) | ~% per transaksi | sesuai tarif Duitku (QRIS/VA) |
| **Gross margin produk digital (DIY/course/bundle)** | **tinggi (70–90% est.)** | tanpa jasa manusia |
| **Gross margin DFY/high-ticket** | sedang | ada komponen jasa/waktu |
| **MRR driver** | Care Plan + AI Staff | retensi = mesin pertumbuhan |

**KPI kanonik (lihat juga B3-01 METRIK-AAAS):**
- **AOV** naik (paket > file satuan).
- **MRR** dari langganan (Care Plan/AI Staff) = prioritas retensi.
- **LTV/CAC** sehat karena CAC rendah (channel organik + proof) & LTV tinggi (langganan).
- **Time-to-Outcome** (TTO): hari, bukan bulan — diferensiator vs freelancer/agency.

---

## 5. Garansi & kebijakan (outcome guarantee yang aman)

> Pure-outcome guarantee berisiko (atribusi). Maka garansi kami **deterministik & terbatas**:

| Jenis | Janji | Batas (Truth-Lock) |
|---|---|---|
| **Deliver guarantee** | App/sistem **jadi & jalan** sesuai DoO atau revisi/refund. | Sebatas scope yang disepakati di intake. |
| **Care Plan** | Update & support selama langganan aktif. | Bukan jaminan hasil bisnis pelanggan. |
| **AI Staff** | Fungsi (CS/marketing/admin) **berjalan** tiap bulan. | Output ≠ jaminan revenue/konversi. |

Kebijakan: refund/privacy mengacu **UU PDP** & dokumen legal (`/legal`). Semua via **MoR OBP**.

---

## 6. Strategi harga lanjutan (opsional, roadmap)

- **Hybrid metered (R3+):** base + add-on usage (mis. AI Staff per N percakapan) bila data matang.
- **Outcome-bonus (R4+):** bonus/komisi hanya untuk outcome yang **terukur jelas & disepakati**
  (mis. per event terjual) — hanya setelah measurement & kontrak siap (hindari batas struktural).
- **Tiering paket:** Starter / Growth / Pro per vertikal (good-better-best).

> **Aturan emas:** jangan pindah ke metered/outcome-bonus sebelum **measurement + proof + kontrak**
> matang (riset B5-01: 78% pemenang outcome punya produk 5+ thn). Hingga itu: **hibrida deterministik**.

> Lanjut: bagaimana outcome benar-benar dikirim & dibuktikan → **B5-04**.
