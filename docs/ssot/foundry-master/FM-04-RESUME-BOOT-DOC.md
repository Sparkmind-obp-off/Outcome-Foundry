# FM-04 · RESUME-BOOT — Resume Keadaan Repo dalam 1 Perintah
## SparkMind X · Outcome-Foundry · SSOT Foundry-Master

> v1.0 · 2026-07-01 · Fokus: cara me-**resume** keadaan repo & sesi secara instan, lewat
> 1 dokumen + 1 script zero-dependency (`resume_boot.py`). "Buka sesi → langsung tahu posisi."
> **Sumber kanonik:** `docs/ssot/foundry-master/FM-04-RESUME-BOOT-DOC.md`
> **Script:** `docs/ssot/foundry-master/resume_boot.py`

═══════════════════════════════════════════════════════════════
🔒 HARD CONSTRAINTS (embedded — sama 6 constraint, lihat FM-01)
═══════════════════════════════════════════════════════════════
1. 100% genspark.ai/ai_developer + Cloudflare Workers/Pages. 2. Niche-first.
3. Horizontal-play. 4. D-1 Truth-Lock (kode live menang). 5. MoR Oasis BI Pro Duitku PRODUCTION. 6. OVERRIDE-CLOSE-OUT.
═══════════════════════════════════════════════════════════════

---

## 1. Tujuan

Saat membuka sesi baru, agent/owner perlu tahu dalam hitungan detik:
- **Di mana posisi repo** (branch, commit terakhir, file berubah).
- **Handoff terakhir** (next-step yang ditinggalkan sesi sebelumnya).
- **Peta SSOT** (doc kanonik mana yang harus dibaca).
- **Status produk** (live? di mana? — fakta dari README, bukan klaim).
- **Route live** (opsional, `--check-live`): verifikasi HTTP route nyata terhadap `outcome-foundry.biz.id`.

`resume_boot.py` mengumpulkan semua ini menjadi **satu ringkasan Truth-Lock** tanpa dependency
eksternal (zero-dep, credit-aware: tidak memanggil API berbayar).

---

## 2. Cara pakai (1 perintah)

```bash
# Dari root repo:
python3 docs/ssot/foundry-master/resume_boot.py

# Output ringkas (default) — untuk dibaca cepat
# Output JSON (untuk di-inject ke konteks agent):
python3 docs/ssot/foundry-master/resume_boot.py --json

# (Opsional) verifikasi route live via HTTP (butuh jaringan; tetap read-only, no secret):
python3 docs/ssot/foundry-master/resume_boot.py --check-live
```

> Tidak ada `pip install` apa pun. Hanya butuh Python 3 + `git` (sudah ada di sandbox).
> `--check-live` memakai `urllib` standar library — tetap zero-dependency.

---

## 3. Apa yang dilaporkan script

| Bagian | Isi | Sumber |
|---|---|---|
| **Repo** | branch, commit terakhir (sha + subject), jumlah file uncommitted | `git` |
| **Recent commits** | 5 commit terakhir (oneline) | `git log` |
| **Handoff terakhir** | path + NEXT STEP ringkas handoff terbaru | `handoffs/` |
| **Peta SSOT** | daftar doc kanonik FM + Batch 2/3/4/5/8/10 + standards + CODEBASE-TRUTH | scan `docs/ssot/` |
| **Status produk** | URL/produksi dari README (fakta tertulis) | `README.md` |
| **Route live** | HTTP code tiap route (opsional `--check-live`) | HTTP GET |
| **Reminder doctrine** | 6 hard-constraint + urutan wajib FM-01 | embedded |

> **Truth-Lock:** script hanya **melaporkan fakta** (git/file/HTTP). Ia **tidak menebak** status
> deploy/payment — bila tak ada bukti tertulis, ditandai "unknown / cek manual".

---

## 4. Alur boot lengkap (recommended)

```
1. Tempel MASTER-ARCHITECT-PROMPT (FM-01) sebagai pesan pertama.
2. Jalankan:  python3 docs/ssot/foundry-master/resume_boot.py
3. Baca ringkasan → konfirmasi NEXT STEP dari handoff terakhir.
4. Tulis SPRINT-KAS (FM-03) untuk sesi ini.
5. Eksekusi (OVERRIDE-CLOSE-OUT, kecuali GATE HITL).
6. Akhir sesi: tulis HANDOFF (FM-02) + commit + push.
```

---

## 5. resume.boot (versi markdown manual — fallback)

Bila Python tak tersedia, baca peta minimal ini (selalu benar untuk repo ini):

```text
REPO     : Sparkmind-obp-off/Outcome-Foundry (branch main)
PRODUK   : SparkMind X · Outcome Foundry — LIVE di CF Pages (outcome-foundry.biz.id)
ENGINE   : OBP Checkout Orchestrator (MoR fan-out multi sub-brand)
PAYMENT  : Duitku PRODUCTION, MoR Oasis BI Pro (merchant D20919)
DOCTRINE : MASTER-ARCHITECT-PROMPT v8.0 · D-1 Truth-Lock (kode live menang)
ROUTE    : / · /foundry · /checkout · /admin · /payment/return
           /api/health · /api/offers · /api/stats · /api/sub-brands · /api/invoices(/:id) · /webhooks/duitku
DATA     : D1 tables → sub_brands, invoices, callbacks, fanout_log · SKU → src/data/offers.ts
SSOT     : docs/ssot/CODEBASE-TRUTH-RECONCILIATION.md (jangkar), B4-*, B5-*, B8-*, B10-*, standards,
           foundry-master/FM-01..FM-04 (OS sesi-kerja)
SKILL    : skills/sovereign-outcome-foundry-context-injection/SKILL.md
NEXT     : baca handoff terbaru di docs/ssot/foundry-master/handoffs/
GATE     : payment/legal/secret/domain/harga = HITL owner
```

---

## 6. Failure modes & recovery

| Mode gagal | Gejala | Recovery |
|---|---|---|
| Bukan di root repo | `git` error / file tak ketemu | `cd` ke root repo lalu ulangi |
| Belum ada handoff | "no handoff found" | wajar untuk sesi pertama; mulai bersih |
| Python tak ada | command not found | pakai fallback §5 (markdown manual) |
| Git tak ter-init | bukan repo git | clone/`git init` dulu |
| `--check-live` timeout | jaringan/produksi lambat | abaikan; route-check opsional, bukan blocker |

---

## 7. Out of scope (Truth-Lock)

- Script **tidak** memodifikasi repo (read-only) — aman dijalankan kapan saja.
- Script **tidak** memanggil API berbayar, tidak membaca secret, tidak deploy.
- Script **tidak** menebak status deploy/payment tanpa bukti tertulis.
- `--check-live` hanya melakukan HTTP GET publik (route publik) — **tidak** mengirim data/secret.

---

## 8. Ringkasan satu kalimat (kanonik)

> **RESUME-BOOT (FM-04) + `resume_boot.py` adalah cara zero-dependency, read-only, Truth-Lock
> untuk me-resume keadaan repo (git, handoff terakhir, peta SSOT, status produk, opsional route
> live) dalam satu perintah — agar setiap sesi langsung terorientasi tanpa kehilangan konteks.**
