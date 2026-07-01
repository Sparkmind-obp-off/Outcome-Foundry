# B2-04 · SPRINT PER SESSION

> SSOT Batch 2 — Operasional · SPARKMIND-OBP / Sovereign Agent Foundry
> Prinsip: **1 sesi Genspark AI Dev = 1 micro-sprint**. Sempit, terukur, selesai dengan DoD & bukti.

---

## 0. Mengapa Micro-Sprint?

Karena doctrine **D-1 Truth-Lock**: satu sesi = satu agent, konteks terbatas, kredit terbatas.
Maka tiap sesi harus:
- **1 outcome dominan** (bukan 5 hal setengah jadi).
- **Berhenti di DoD** (Definition of Done) dengan bukti yang bisa diverifikasi.
- **Meninggalkan jejak** (commit + catatan handoff) agar sesi berikutnya lanjut tanpa kehilangan konteks.

---

## 1. Anatomi Satu Micro-Sprint

| Tahap | Durasi relatif | Aktivitas | Bukti keluaran |
|---|---|---|---|
| **S0 Ingest** | ~5% | Baca SSOT index, README, git log, todo terakhir | Ringkasan "state sekarang" |
| **S1 Plan** | ~10% | Tentukan 1 outcome + DoD + gate (lihat B2-03 Orchestrator) | Tabel fase + DoD |
| **S2 Build** | ~50% | Eksekusi via role-switching (Code-Writer → Reviewer) | Diff kode / dokumen |
| **S3 Verify** | ~20% | Build + smoke-test + Verifier rubric (B2-03 §6) | Log PASS/FAIL |
| **S4 Land** | ~10% | Commit + update README/SSOT + handoff note | Commit hash |
| **S5 Backup** | ~5% | ProjectBackup bila stabil (opsional) | URL backup |

> Aturan emas: jika S3 FAIL dan kredit menipis → **commit work-in-progress + tulis handoff jelas**, jangan paksa selesai.

---

## 2. Definition of Done (DoD) Standar

Sebuah micro-sprint **selesai** hanya jika:
1. `npm run build` hijau (worker ter-bundle).
2. Smoke-test endpoint terdampak = 200 (B2-01 loop).
3. Tidak ada secret bocor / Node-only API di runtime worker.
4. Docs/README diperbarui bila ada perubahan publik.
5. Commit dibuat dengan pesan deskriptif.
6. Gate HITL dihormati (tidak ada aksi berisiko tanpa approval).

---

## 3. Backlog → Sprint Mapping

Sumber backlog: `12-TODO-ROADMAP-DOC.md` (T1–T15) + `13-GAP-ANALYSIS` (G1–G8 sudah closed).
Aturan: **1 item backlog setara ±1 sesi**. Item besar dipecah dulu.

| Sprint | Outcome dominan | Role utama | DoD kunci |
|---|---|---|---|
| SP-A | Tambah/ubah 1 produk di katalog | CPO → Product Squad | /api/products tetap valid, checkout produk baru 200 |
| SP-B | Perbaikan/penguatan webhook Duitku | CFO → Finance-Ops | webhook idempoten, signature HMAC+MD5 lolos, gate approval |
| SP-C | Halaman legal / kebijakan baru | COO → Legal-Compliance | /legal/:slug 200, link nav benar |
| SP-D | Optimasi SEO (sitemap/meta) | CMO → SEO | sitemap.xml valid, meta per halaman benar |
| SP-E | Hardening error-shape API | CTO → Engineering | semua error JSON konsisten, smoke-test hijau |
| SP-F | Dokumentasi SSOT batch (spt ini) | Orchestrator → editor | docs ditulis, index diperbarui, push |

> Sprint di atas adalah **template kategori**, bukan urutan wajib. Owner memilih 1 per sesi.

---

## 4. Template Catatan Sprint (isi tiap sesi)

```
# SPRINT LOG — {{tanggal}} / {{sprint_id}}
Outcome dominan : {{1 kalimat}}
Role utama      : {{role}}
Credit budget   : {{angka}}  Gate aktif: {{daftar}}

S0 State        : {{ringkasan dari git log + todo}}
S1 Plan/DoD     : {{tabel fase ringkas}}
S2 Build        : {{apa yang diubah, file}}
S3 Verify       : build={{OK/FAIL}} smoke={{OK/FAIL}}
S4 Land         : commit={{hash}} docs={{updated?}}
S5 Backup       : {{url / skip}}

HANDOFF NEXT SESSION:
  - Selesai   : {{...}}
  - Belum     : {{...}}
  - Langkah berikut: {{1-3 bullet}}
```

---

## 5. Anti-Pattern (jangan dilakukan)

- ❌ Mengerjakan 4 fitur sekaligus dalam 1 sesi → semua setengah jadi.
- ❌ Klaim "tim paralel" — pelanggaran truth-lock.
- ❌ Deploy prod / sentuh payment tanpa approval owner.
- ❌ Menutup sesi tanpa commit & handoff note.
- ❌ Over-build melebihi DoD (boros kredit).

---

## 6. Keterkaitan Dokumen

- Fase teknis tiap sprint → **B2-01 Runbooks per-fase (F0–F7)**.
- Kontrak API yang disentuh → **B2-02 API Spec Agen**.
- Role & prompt eksekusi → **B2-03 Template Prompt per Role**.
- Header pembuka sesi → **B2-05 Master Architect Prompt per Session**.
