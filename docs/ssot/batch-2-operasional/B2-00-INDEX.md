# SSOT BATCH 2 — OPERASIONAL (Index)
## SPARKMIND-OBP · Sovereign Agent Foundry

> **Status:** Canonical · **Versi:** v1.0 · **Tanggal:** 2026-06-20
> **Doctrine induk:** MASTER-ARCHITECT-PROMPT v8.0 · D-1 Truth-Lock · Indonesia-first · Credit-aware
> **Lingkup:** lapisan **operasional** di atas SSOT batch 1 (00–13). Fokus: *bagaimana menjalankan*
> — runbook per-fase, spesifikasi API agen, template prompt per role, ritme Sprint/Session,
> dan Master Architect Prompt yang dipanggil tiap sesi.

---

## 0. Posisi batch 2 dalam SSOT

| Batch | Tema | Pertanyaan yang dijawab |
|---|---|---|
| **Batch 1 (00–13)** | Strategi & Produk | *Apa* yang dibangun & *mengapa* (PRD, design, arsitektur, monetisasi, GTM, dominasi). |
| **Batch 2 (B2-xx)** | **Operasional** | ***Bagaimana* menjalankan** — runbook fase, kontrak API, prompt per role, ritme sprint. |
| **Batch 3 (B3-xx)** | Skala | *Bagaimana menumbuhkan* — metrik AaaS, onboarding klien, runbook insiden. |

Batch 2 menerjemahkan doctrine menjadi **prosedur yang dapat dieksekusi berulang** oleh agent
maupun manusia, tanpa harus menebak konteks.

---

## 1. Daftar dokumen batch 2

| File | Judul | Isi inti |
|---|---|---|
| `B2-00-INDEX.md` | Index (dokumen ini) | Peta & aturan pakai batch 2 |
| `B2-01-RUNBOOKS-PER-FASE.md` | Runbooks per-fase (F0–F7) | Langkah persis tiap fase fullstack-cycle + DoD per fase |
| `B2-02-API-SPEC-AGEN.md` | API spec (agen-readable) | Kontrak tiap endpoint: input, output, error, contoh `curl` |
| `B2-03-PROMPT-TEMPLATES-PER-ROLE.md` | Template prompt per role | Prompt siap-pakai untuk tiap C-Suite/Squad role |
| `B2-04-SESSION-SPRINT.md` | Session & Sprint cadence | Struktur 1 sesi kerja & 1 sprint; ritual buka/tutup |
| `B2-05-MASTER-ARCHITECT-PROMPT.md` | Master Architect Prompt per Session | Prompt induk yang di-load di awal tiap sesi |

---

## 2. Aturan pakai (Truth-Lock)

1. **SSOT adalah hukum.** Jika dokumen operasional bertentangan dengan batch 1, batch 1 menang;
   ajukan koreksi via `13-GAP-ANALYSIS` (bukan ubah diam-diam).
2. **Setiap fase punya Definition-of-Done (DoD).** Tidak boleh maju fase tanpa DoD hijau.
3. **Credit-aware.** Pilih jalur paling hemat langkah/token yang tetap memenuhi DoD.
4. **HITL gate.** Aksi sensitif (payment, legal, customer-facing, secret, outbound) → approval owner.
5. **Indonesia-first.** Semua artefak customer-facing dalam Bahasa Indonesia.

---

## 3. Quick links operasional

- Runbook start service → `B2-01 §F3`
- Kontrak `POST /api/checkout` → `B2-02 §3.4`
- Prompt CFO (rekonsiliasi ledger) → `B2-03 §CFO`
- Ritual tutup sesi (handoff) → `B2-04 §5`
- Prompt induk sesi → `B2-05`
