# B3-00 · INDEX — BATCH 3 · SKALA

> SSOT Batch 3 — Skala · SPARKMIND-OBP / Sovereign Agent Foundry
> Fokus: dari "produk jalan" → "bisnis bisa tumbuh & beroperasi sebagai layanan (AaaS)".

---

## 0. Posisi Batch 3 dalam SSOT

| Batch | Tema | Pertanyaan inti |
|---|---|---|
| Batch 1 (00–13) | Fondasi & produk | Apa yang kita bangun & kenapa? |
| Batch 2 (B2-00..05) | Operasional | Bagaimana satu sesi/agent mengeksekusi? |
| **Batch 3 (B3-00..03)** | **Skala** | **Bagaimana tumbuh, melayani klien, & bertahan saat insiden?** |

---

## 1. Peta Dokumen Batch 3

| Kode | Judul | Isi |
|---|---|---|
| **B3-00** | Index (dok ini) | Peta & non-negotiable skala |
| **B3-01** | Metrik AaaS | KPI Agent-as-a-Service: akuisisi, aktivasi, retensi, unit-economics |
| **B3-02** | Playbook Onboarding Klien | Alur dari lead → klien aktif (self-serve & done-for-you) |
| **B3-03** | Runbook Insiden | Klasifikasi severity, alur respons, komunikasi, post-mortem |

---

## 2. Non-Negotiable Skala

1. **Skala tanpa VPS.** Semua pertumbuhan tetap di Cloudflare-native (Workers/Pages/D1). Jika butuh kapabilitas di luar batas CF → integrasi REST pihak ketiga dengan token sebagai secret.
2. **Truth-lock tetap berlaku.** Skala bukan berarti "banyak agent paralel"; tetap 1 sesi = 1 agent, kerja dipecah jadi banyak micro-sprint.
3. **MoR & 4-Layer Lock dijaga.** Pertumbuhan transaksi tidak boleh melanggar peran Oasis BI Pro sebagai Merchant-of-Record atau melewati `brand_ledger`.
4. **Gate HITL skala.** Onboarding klien berbayar, perubahan harga massal, dan komunikasi insiden = approval owner.
5. **Data-driven.** Keputusan skala mengacu metrik B3-01, bukan asumsi.

---

## 3. Keterkaitan

- Operasional harian yang menopang skala → **B2-01 Runbooks**, **B2-04 Sprint per Session**.
- Insiden teknis memakai kontrak API → **B2-02 API Spec Agen**.
- Penawaran yang dijual ke klien → `src/data/offers.ts` (bundle, founder-pass, done-for-you, partner).
