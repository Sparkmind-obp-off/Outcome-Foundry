# SSOT FOUNDRY-MASTER — Operating-System Layer (Index)
## SparkMind X · Outcome-Foundry · Master-Architect / Handoff / Sprint-Kas / Resume-Boot

> **Status:** Canonical · **Versi:** v1.0 · **Tanggal:** 2026-07-01
> **Doctrine induk:** MASTER-ARCHITECT-PROMPT v8.0 OVERRIDE-LOCK · D-1 Truth-Lock · Indonesia-first · Credit-aware
> **Repo kanonik (LIVE):** https://github.com/Sparkmind-obp-off/Outcome-Foundry
> **Aplikasi (LIVE):** https://outcome-foundry.biz.id (Cloudflare Pages, edge-native)
> **Sumber kanonik:** `docs/ssot/foundry-master/`

---

## 0. Mandat owner (verbatim intent)

> *"Deep dive & deep research: kerjakan project Outcome-Foundry. Upgrade & enhance sistem
> agentik-nya dengan meniru sistem agentik repo referensi (Barberkas-foundry
> `docs/ssot/foundry-master`) — dari handoff, resume-boot.py, master-architect-prompt, dst.
> Beri tahu cara pakainya di sesi selanjutnya. Lalu WAJIB push ke GitHub."*

Lapisan ini adalah **adaptasi** (bukan salinan mentah) FOUNDRY-MASTER dari repo saudara
`Barberkas-foundry` ke repo produk **LIVE** `Outcome-Foundry` — di-retarget ke repo, URL,
route nyata, dan kebenaran codebase (`CODEBASE-TRUTH-RECONCILIATION.md`) proyek ini.

---

## 0a. Mengapa lapisan FOUNDRY-MASTER ada (masalah yang dipecahkan)

SSOT Batch 2–10 + `CODEBASE-TRUTH-RECONCILIATION` sudah **memutuskan & mengeksekusi** produk
ke kode live (`/foundry`, `/checkout`, `/admin`, engine MoR Duitku PRODUCTION, fan-out multi
sub-brand). Yang masih **belum dikanonkan** adalah **lapisan "sistem operasi sesi kerja"** —
yaitu *bagaimana* owner & agent memulai, melanjutkan, dan menutup setiap sesi build tanpa
kehilangan konteks.

| Gap (sebelum FM) | Akibat | Ditutup oleh |
|---|---|---|
| Tidak ada prompt induk tunggal untuk boot agent | tiap sesi mulai dari nol, drift doctrine | **FM-01 Master-Architect-Prompt** |
| Handoff antar-sesi lisan/ingatan | konteks hilang, kerja diulang (spt sesi kredit terputus lalu) | **FM-02 Master-Handoff (per-session)** |
| Sprint tidak terikat ke kas/biaya | eksekusi tidak credit-aware, tak terukur | **FM-03 Master-Sprint-Kas (per-session)** |
| Tidak ada cara cepat "resume" keadaan repo | re-orientasi lambat tiap buka sesi | **FM-04 Resume-Boot** (+ `resume_boot.py`) |
| Konteks SSOT tak bisa di-inject otomatis | agent tak auto-patuh doctrine + codebase-truth | **skill** `sovereign-outcome-foundry-context-injection` |

> Inti: Batch 2–10 = **APA yang dijual & dibangun**. FOUNDRY-MASTER = **BAGAIMANA setiap sesi
> kerja di-boot, di-handoff, di-sprint, & di-resume** secara konsisten & Truth-Lock.

---

## 1. Tesis FOUNDRY-MASTER (1 kalimat)

> Setiap sesi build Outcome-Foundry harus bisa **di-boot dalam 1 prompt**, **di-handoff
> dalam 1 dokumen**, **di-sprint dengan anggaran kas/biaya yang sadar-kredit**, dan **di-resume
> dalam 1 perintah** — sehingga konteks, doctrine, dan status tidak pernah hilang antar-sesi,
> dan **kode live selalu menang** atas klaim dokumen (D-1 Truth-Lock).

---

## 2. Peta Dokumen FOUNDRY-MASTER

| Kode | Judul | Pertanyaan yang dijawab |
|---|---|---|
| **FM-00** | Index (dok ini) | Apa lapisan ini & bagaimana semua terhubung? |
| **FM-01** | **[MASTER-ARCHITECT-PROMPT](FM-01-MASTER-ARCHITECT-PROMPT-DOC.md)** | Prompt induk tunggal untuk boot agent: peran, hard-constraint, urutan kerja, gate |
| **FM-02** | **[MASTER-HANDOFF (per-session)](FM-02-MASTER-HANDOFF-DOC.md)** | Template & aturan handoff antar-sesi: state, blocker, next-step |
| **FM-03** | **[MASTER-SPRINT-KAS (per-session)](FM-03-MASTER-SPRINT-KAS-DOC.md)** | Sprint terikat kas/biaya: anggaran kredit, OMTM, exit-gate, log |
| **FM-04** | **[RESUME-BOOT](FM-04-RESUME-BOOT-DOC.md)** | Cara me-resume keadaan repo dalam 1 perintah (+ `resume_boot.py`) |

> **Urutan baca disarankan:** FM-00 → FM-01 → FM-02 → FM-03 → FM-04 → skill context-injection.

---

## 3. Non-Negotiables FOUNDRY-MASTER

1. **Satu prompt induk.** Semua sesi boot lewat FM-01 (Master-Architect-Prompt) — tidak ada
   improvisasi doctrine.
2. **Handoff tertulis, bukan ingatan.** Akhir tiap sesi → tulis FM-02 handoff; awal sesi →
   baca handoff terakhir. (Pelajaran nyata: sesi lalu terputus karena kredit; handoff mencegah
   kehilangan konteks.)
3. **Credit-aware.** Sprint (FM-03) selalu menyertakan anggaran kredit & biaya estimasi; tidak
   ada eksekusi "buta biaya".
4. **Truth-Lock + kode-live-menang.** Status di handoff/resume = diverifikasi dari
   kode/`git`/build/route nyata — bukan klaim. Bila dokumen konflik dengan kode live →
   **kode live menang** (`CODEBASE-TRUTH-RECONCILIATION.md`).
5. **HITL pada payment/legal/secrets.** Perubahan Duitku/MoR/secret/domain WAJIB lewat gate
   owner (lihat FM-01 §HITL).
6. **Tambah, jangan hancurkan.** Lapisan ini **menambah** di atas Batch 2–10; tidak mengubah
   kode produk yang sudah live.
7. **100% Cloudflare-Native + MoR patuh.** Stack tetap Hono + Pages + D1 + Duitku/OBP.

---

## 4. Hubungan dengan SSOT lain

```
Batch 2–3   → operasional + skala (runbook, metrik, API agen)      [DOCTRINE]
Batch 4     → KEPUTUSAN reposition (skill→outcome)                  [DISERAP]
Batch 5     → TUNTASKAN pivot = sistem & model OaaS                 [KANONIK produk]
Batch 8     → ECC reference + roadmap upgrade R6                    [STANDAR]
Batch 9     → standards (skill-authoring, eval-loop, AgentShield)   [STANDAR]
Batch 10    → Launch-From-Zero (GTM 0-follower, konten faceless)    [KANONIK go-to-market]
CODEBASE-TRUTH → jangkar kebenaran (kode live menang)               [TRUTH-ANCHOR]
FOUNDRY-MASTER (FM) → OS lapisan sesi-kerja (boot/handoff/sprint/resume)  [KANONIK proses] ⭐
```

- **Tidak men-supersede** apa pun — murni **menambah lapisan proses kerja**.
- **Mengikat skill:** `sovereign-outcome-foundry-context-injection` meng-inject FM-01..FM-04
  + CODEBASE-TRUTH + SSOT terkait ke konteks agent saat boot.

---

## 5. Definisi "FOUNDRY-MASTER tuntas" (DoD)

- [x] FM-01 Master-Architect-Prompt kanonik (boot 1-prompt) — di-retarget ke Outcome-Foundry.
- [x] FM-02 Master-Handoff template + aturan per-session.
- [x] FM-03 Master-Sprint-Kas template + anggaran kredit.
- [x] FM-04 Resume-Boot doc + `resume_boot.py` (zero-dep, + verifikasi route live opsional).
- [x] Skill `sovereign-outcome-foundry-context-injection` (frontmatter patuh R6-1).
- [x] MANIFEST + index (dok ini).
- [x] Handoff pembuatan lapisan ini ditulis di `handoffs/`.
- [x] Di-commit + push ke GitHub (`main`). *(sesi OF-20260701-02: FM layer + skill terpasang di repo LIVE)*

> **Truth-Lock:** centang `[x]` di atas hanya untuk artefak yang benar-benar ada di repo saat commit.
