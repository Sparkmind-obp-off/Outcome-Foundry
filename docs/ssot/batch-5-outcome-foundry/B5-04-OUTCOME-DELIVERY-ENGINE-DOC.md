# B5-04 · OUTCOME-DELIVERY-ENGINE-DOC — Cara Outcome Di-deliver
## SparkMind · SSOT Batch 5 · Pipeline skill→app, SLA, proof-of-outcome

> v1.0 · 2026-06-20 · Fokus: **bagaimana** Outcome Foundry benar-benar mengubah pesanan
> menjadi hasil live, lengkap dengan SLA, gate kualitas, dan bukti (proof-of-outcome).
> Diturunkan dari B2 (runbook 1-sesi/1-agent) + fullstack-cycle + verify-rubric.

---

## 1. Pipeline delivery kanonik (intake → outcome live)

```
F0 INTAKE        Pembeli isi /api/intake (masalah, vertikal, kontak) → tiket.
   │             Gate: klasifikasi outcome (SKU mana) + Truth-Lock (bisa di-deliver?).
F1 SCOPE         Tentukan DoO (Definition of Outcome) + plan (DIY/Setup/DFY) + harga.
   │             Gate HITL bila high-ticket/legal/harga custom.
F2 PAY           Checkout via engine MoR (Duitku QRIS/VA). brand_ledger tercatat.
   │             one-time → otomatis; high-ticket → invoice.
F3 ASSEMBLE      Foundry merakit: orchestration → fullstack-cycle (skill terkait SKU).
   │             credit-aware: hemat token; zero-trust: secrets aman.
F4 DEPLOY        Deploy ke Cloudflare Pages (akun klien / sub-path). App jadi LIVE.
   │             Gate: verify-rubric (berfungsi? Bhs Indonesia? tak ada klaim palsu?).
F5 PROOF         Kirim bukti: URL live + screenshot + dashboard/laporan + faktur email.
   │             Gate: DoO terpenuhi → order "selesai".
F6 ONBOARD       (bila langganan) handoff onboarding (B3-02): cara pakai + Care Plan aktif.
F7 RETAIN        Care Plan / AI Staff jalan: update, support, output bulanan.
```

> F0–F5 = **land** (outcome deterministik). F6–F7 = **retain/expand** (langganan + jasa).

---

## 2. Mode delivery (DIY / DWY / DFY)

| Mode | Siapa kerja | SLA target *est.* | SKU contoh |
|---|---|---|---|
| **DIY** (do-it-yourself) | Pembeli (kami sediakan template/akses) | instan (otomatis) | Template, Canon Course, Bundle |
| **DWY** (done-with-you) | Bareng (kami pasang, pembeli ikut) | 1–3 hari kerja | Setup app vertikal |
| **DFY** (done-for-you) | Kami penuh | 3–10 hari kerja (scope) | App Custom, AI Company, AI Staff |

> SLA = **Time-to-Outcome (TTO)**. Diferensiator inti: *hari, bukan bulan* vs freelancer/agency.

---

## 3. Proof-of-Outcome (bukti = produk)

> Di outcome economy, **trust & proof adalah diferensiator utama** (riset B5-01). Maka bukti
> bukan after-thought — ia bagian dari deliverable.

**Artefak bukti per pesanan:**
1. **URL live** hasil (app/toko/event/donasi/landing).
2. **Screenshot/rekaman** outcome berfungsi.
3. **Dashboard/laporan metrik** (transaksi pertama, balasan CS, konten terbit, jam dihemat).
4. **Acceptance checklist** (DoO ter-centang) ditandatangani pembeli (digital).
5. **Faktur + disclosure MoR** (Oasis BI Pro) via email.

**Aset bukti publik (untuk GTM):**
- **Case study** per vertikal (anonim bila perlu) → halaman `/solutions/:slug` & landing.
- **Galeri hasil** (sebelum/sesudah) → trust mainstream.

---

## 4. Gate kualitas (Definition of Outcome enforcement)

Sebelum order ditandai **selesai**, jalankan gate (turunan `sovereign-verify-rubric`):

| Gate | Cek | Lulus bila |
|---|---|---|
| **Fungsi** | Hasil bisa diakses & berfungsi? | URL live + alur utama jalan |
| **Bahasa** | Bahasa Indonesia & konteks pembeli? | Copy & UI sesuai |
| **Truth-Lock** | Ada klaim/hasil yang tak benar? | Tidak ada klaim palsu |
| **MoR** | Pembayaran tercatat & disclosure ada? | brand_ledger + footer/checkout |
| **Proof** | Bukti dikirim ke pembeli? | Artefak §3 terkirim |
| **Onboard** | (langganan) handoff dilakukan? | B3-02 selesai |

> Order yang gagal gate → **kembali ke F3/F4** (revisi), bukan ditutup. Truth-Lock di atas kecepatan.

---

## 5. Peran mesin (Pack A teknis + Pack B agentic-team)

| Fase | Pack A (BAGAIMANA) | Pack B (SIAPA memutuskan) |
|---|---|---|
| F0 Intake | context-injection | orchestrator + cofounder |
| F1 Scope | credit-aware (guard) | cpo / cto (scope & feasibility) |
| F3 Assemble | orchestration-patterns, fullstack-cycle | squad-engineering / squad terkait |
| F4 Deploy | cf-byok-deploy, zero-trust | cto |
| F5 Proof | verify-rubric, hermes-memory | coo (QA) |
| F6–F7 Retain | workflow-ops, memory-dreaming | squad-sales-cs / opsfinance |

> Ingat D-1 Truth-Lock: ini **role-switching terstruktur dalam 1 sesi/agent**, bukan 16 proses paralel.

---

## 6. Instrumentasi & telemetry (untuk membuktikan & mengoptimasi)

- **orders (D1):** status pesanan, SKU, amount, MoID (sudah ada di skema).
- **Tambahan kanonik (roadmap R2):** `outcome_proof` (URL bukti), `tto_days` (waktu deliver),
  `delivery_mode` (diy/dwy/dfy) untuk menghitung TTO & success-rate.
- **KPI delivery:** TTO median, % order lulus DoO pada percobaan pertama, refund-rate,
  retensi langganan (B3-01).

> Lanjut: status kode saat ini + gap tertutup + roadmap eksekusi → **B5-05**.
