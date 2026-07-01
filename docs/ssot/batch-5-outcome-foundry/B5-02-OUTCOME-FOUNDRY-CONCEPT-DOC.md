# B5-02 · OUTCOME-FOUNDRY-CONCEPT-DOC — Definisi Sistem & Konsep
## SparkMind · SSOT Batch 5 · "Outcome Foundry" sebagai sistem kanonik

> v1.0 · 2026-06-20 · Fokus: apa itu Outcome Foundry secara sistem (bukan slogan), prinsip
> kanonik, model "mesin → outcome", taksonomi outcome, dan kontrak kualitas.

---

## 1. Definisi kanonik (satu kalimat)

> **Outcome Foundry** adalah **pabrik hasil bisnis**: sistem yang menerima *masalah/kebutuhan
> bisnis* sebagai input dan mengeluarkan **hasil yang sudah jadi & berjalan** (aplikasi,
> otomasi, sistem) sebagai output — dirakit secara agentik dari **36 sovereign skill** di atas
> **infrastruktur edge Cloudflare**, dengan **pembayaran lokal patuh (MoR Oasis BI Pro/Duitku)**.

Singkatnya: **Input = masalah. Output = outcome (live). Mesin = skill agentik. Rel uang = MoR.**

---

## 2. Tiga lapis sistem (anatomi Outcome Foundry)

```
┌─────────────────────────────────────────────────────────────────┐
│  LAPIS 1 — PASAR (yang dilihat pembeli)                          │
│  "SparkMind — bikin bisnismu otomatis & online."                 │
│  Objek: OUTCOME (Toko Online, Kasir+Booking, CS Auto, Konten,    │
│         Event/Tiket, Donasi, Admin Otomasi, App Custom, AI Co.)  │
│  Bahasa: manfaat · kecepatan · IDR · QRIS · "hari, bukan bulan"  │
├─────────────────────────────────────────────────────────────────┤
│  LAPIS 2 — FOUNDRY (mesin perakit)                               │
│  Pipeline: intake → orchestration → fullstack-cycle → deploy     │
│  Bahan: 36 sovereign skill (Pack A teknis + Pack B agentic-team) │
│  Quality gate: verify-rubric · zero-trust · credit-aware (HITL)  │
├─────────────────────────────────────────────────────────────────┤
│  LAPIS 3 — REL (infra + uang + kepatuhan)                        │
│  Edge: Hono + Cloudflare Pages + D1   ·   Uang: Duitku (QRIS/VA) │
│  MoR: Oasis BI Pro (disclosure + brand_ledger)  ·  UU PDP/refund │
└─────────────────────────────────────────────────────────────────┘
```

> Pembeli hanya berinteraksi dengan **Lapis 1**. Developer/partner boleh masuk **Lapis 2**
> (`/developers`, `/foundry`). Lapis 3 invisible tapi menjadi **moat** (sulit ditiru).

---

## 3. Prinsip kanonik Outcome Foundry (7 prinsip)

1. **Outcome > output > fitur.** Kita jual *hasil bisnis* ("kasir online jalan"), bukan
   *deliverable teknis* ("repo Hono"), apalagi *fitur* ("ada D1").
2. **Deterministik dulu, probabilistik kemudian.** Outcome awal = yang pasti bisa di-deliver
   (app berfungsi). Outcome probabilistik (CSAT, konversi) = lapisan langganan/jasa, bukan janji utama.
3. **Mesin sama, kemasan beda.** Satu skill = banyak SKU. Tidak menambah mesin untuk menambah produk.
4. **Hibrida wajib.** Setiap outcome punya jalur **DIY → Setup → DFY** & opsi **langganan**
   (lihat B5-03). Tidak ada pure-outcome telanjang.
5. **Proof melekat.** Setiap outcome menghasilkan **bukti** (URL app live, dashboard metrik,
   laporan) — karena di outcome economy *trust & proof* adalah diferensiator.
6. **Indonesia-first.** Bahasa, harga, pembayaran, contoh kasus = konteks Indonesia.
7. **Truth-Lock.** Hanya menjual outcome yang benar-benar bisa dirakit dari kapabilitas nyata.

---

## 4. Model "mesin → outcome" (mapping 36 skill → 9 SKU)

> Detail per-skill ada di B4-05 (Migration Map). Ringkas kanonik:

| Outcome SKU (Lapis 1) | Mesin skill utama (Lapis 2) | Brand (Layer 3) |
|---|---|---|
| Kasir + Booking Jasa Lokal | fullstack-cycle, cf-byok-deploy, workflow-ops | BarberKas |
| Toko Online + CS Otomatis | fullstack-cycle, squad-sales-cs, hermes-memory | (SparkMind) |
| Mesin Konten & Promo | squad-marketing, gtm-engineering, cmo | PaceLokal |
| Sistem Event, Tiket & RSVP | fullstack-cycle, claw-actuation | MomentKas |
| Sistem Donasi & Keanggotaan | fullstack-cycle, zero-trust, legal | Nurani.OS |
| Otomasi Admin & Dokumen | squad-opsfinance, kuratorkas, memory-dreaming | KuratorKas |
| Aplikasi Custom (DFY) | fullstack-cycle + C-Suite + squads | SparkMind Core |
| AI Company in a Box | team-boot + orchestrator + C-Suite + squads | SparkMind Core |
| Canon Course (edukasi) | master-boot, specialists, context-injection | SparkMind |

> Transparansi mesin (`engineSkills`) ditampilkan di halaman solusi sebagai *proof* untuk
> developer/partner — tanpa membebani pembeli mainstream.

---

## 5. Taksonomi outcome (4 tier — sudah di kode `SOLUTION_TIERS`)

| Tier | Definisi | Contoh SKU | Peran bisnis |
|---|---|---|---|
| **vertical** | App vertikal kepala-pantai (problem nyata, ICP bisa disebut) | Kasir+Booking, Toko Online | Akuisisi & land |
| **subscription** | Langganan "AI Staff" / Care Plan (outcome berkelanjutan) | AI Staff CS/Marketing/Admin, Care Plan | Retensi & MRR |
| **high-ticket** | App custom & AI Company in a Box (jasa besar) | App Custom, AI Company | AOV besar & expand |
| **education** | Tripwire edukasi (Canon Course) | Canon Course | Top-of-funnel & trust |

> Pola pertumbuhan: **education/vertical (land) → subscription (retensi) → high-ticket (expand)**.

---

## 6. Kontrak kualitas outcome (Definition of Outcome — "DoO")

Sebuah pesanan dianggap **outcome ter-deliver** bila:

- [ ] Hasil **berfungsi & dapat diakses** (URL live / akses produk aktif).
- [ ] **Bukti** diberikan (screenshot/URL/dashboard/laporan) ke pembeli.
- [ ] **Bahasa Indonesia** & sesuai konteks pembeli.
- [ ] Pembayaran **tercatat di MoR** (brand_ledger) & faktur terkirim.
- [ ] Bila langganan: **handoff onboarding** (B3-02) dilakukan.
- [ ] Lulus **verify-rubric** (tidak ada klaim palsu / Truth-Lock).

> DoO ini menjadi gate sebelum order ditandai "selesai" — turunannya di B5-04 (delivery) & B2 (runbook).

---

## 7. Apa yang berubah vs tetap (vs konsep lama)

| Berubah (Batch 5) | Tetap |
|---|---|
| Identitas: "marketplace skill" → **"Outcome Foundry (OaaS)"** | 36 skill sebagai mesin |
| Konsep jual: bahan → **hasil deterministik + langganan + jasa** | Cloudflare-native + MoR |
| Bahasa kanonik: jargon → **outcome + proof** | D-1 Truth-Lock, HITL, credit-aware |
| Kualitas: "build hijau" → **Definition of Outcome (DoO)** | brand_ledger / compliance |

> Lanjut: model uang → **B5-03**; cara deliver & proof → **B5-04**; status & roadmap → **B5-05**.
