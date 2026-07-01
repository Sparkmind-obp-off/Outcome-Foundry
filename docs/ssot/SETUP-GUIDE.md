# 🚀 PANDUAN SETUP — Master Super Crystal-Clear
## Cara Memasang & Memakai Sovereign Skill (SparkMind-OBP)

> **Untuk siapa:** setiap pembeli skill di **SparkMind · Sovereign Agent Foundry**.
> **Tujuan:** dari "baru beli ZIP" → "skill aktif & dipakai agent" dalam **< 10 menit**, **tanpa bingung, tanpa miss, tanpa error**.
> **Bahasa:** Indonesia. **Versi:** v1.0 · 2026-06-20.

---

## 0. TL;DR (3 langkah, 90 detik)

```
1. UNDUH   → buka /orders (atau email lisensi) → unduh file <nama-skill>.zip
2. PASANG  → unzip ke folder  skills/<nama-skill>/SKILL.md
3. AKTIFKAN→ di sesi AI (Genspark AI Dev / Claude), ketik:
             "aktifkan skill <nama-skill>"  →  agent membaca SKILL.md → siap kerja
```

Selesai. Sisa dokumen ini menjelaskan **setiap langkah dengan jelas + cara mengatasi semua kemungkinan error.**

---

## 1. APA YANG ANDA BELI? (paham dulu, biar tidak salah pakai)

Anda **TIDAK** membeli aplikasi, plugin, atau software yang di-install.

Anda membeli sebuah **PLAYBOOK AGENTIK** — sebuah file **`SKILL.md`** (Markdown) berisi
**instruksi terstruktur** yang membuat **AI agent** (Genspark AI Dev, Claude, atau LLM
sejenis yang mendukung "skills") bertindak seperti seorang **ahli/role tertentu**.

| Istilah | Arti sederhana |
|---|---|
| **Skill** | 1 folder berisi `SKILL.md` (+ kadang file pendukung) |
| **`SKILL.md`** | "otak"-nya — instruksi yang dibaca agent |
| **Aktivasi** | momen agent membaca `SKILL.md` lalu mengikuti aturannya |
| **Trigger** | kata kunci yang otomatis memanggil skill (mis. "deploy", "CFO") |

> **Analogi:** skill = "buku resep ahli". Agent = "koki". Anda kasih buku resepnya,
> koki langsung masak sesuai standar ahli. Tidak ada instalasi rumit.

**Isi ZIP yang Anda terima:**
```
sovereign-<nama>.zip
└── sovereign-<nama>/
    └── SKILL.md        ← file utama (wajib)
        (+ references/, scripts/, assets/  bila skill butuh)
```

---

## 2. SYARAT (yang perlu Anda punya)

| Wajib | Keterangan |
|---|---|
| ✅ Akses ke **AI agent yang mendukung skills** | Genspark **AI Developer**, atau Claude (Anthropic) dengan dukungan Agent Skills, atau IDE-agent sejenis. |
| ✅ Aplikasi **unzip** | Bawaan Windows/macOS/Linux/HP sudah cukup. |
| ⬜ (opsional) Akun **GitHub** | hanya bila skill menyuruh push kode. |
| ⬜ (opsional) Akun **Cloudflare** | hanya untuk skill deploy (`cf-byok-deploy`). |

> Tidak perlu: server, VPS, kartu kredit, instalasi software berat. **Rp 0 infrastruktur.**

---

## 3. LANGKAH SETUP (lengkap, anti-gagal)

### Langkah 1 — Unduh skill Anda
1. Buka **`/orders`** di situs (atau klik tautan di **email lisensi**).
2. Masukkan **Merchant Order ID** (ada di halaman thank-you & email).
3. Klik **Unduh** → file `sovereign-<nama>.zip` tersimpan.

> Batas unduh default: beberapa kali per lisensi. Bila habis, hubungi support (lihat §8).

### Langkah 2 — Ekstrak (unzip)
- **Windows:** klik kanan ZIP → *Extract All*.
- **macOS:** klik dua kali ZIP.
- **Linux / Terminal:** `unzip sovereign-<nama>.zip`
- **HP (Android/iOS):** buka via aplikasi Files → *Extract*.

Hasil yang benar:
```
sovereign-<nama>/
└── SKILL.md     ✅
```

### Langkah 3 — Tempatkan di folder `skills/`
Buat folder bernama **`skills/`** di proyek/workspace Anda, lalu taruh skill di dalamnya:

```
proyek-anda/
└── skills/
    └── sovereign-<nama>/
        └── SKILL.md
```

> **Penting:** struktur harus `skills/<nama-skill>/SKILL.md`. Jangan menaruh
> `SKILL.md` langsung di akar `skills/` tanpa folder pembungkusnya.

### Langkah 4 — Aktifkan di sesi AI

**A. Genspark AI Developer**
- Cara cepat (semua skill sekaligus):
  ```
  aktifkan semua skill di folder skills/
  ```
- Cara satu skill:
  ```
  aktifkan skill sovereign-<nama>
  ```
- Atau pakai **trigger word** skill (tertulis di bagian akhir `SKILL.md`), contoh:
  - `sovereign-cf-byok-deploy` → ketik **"deploy ke cloudflare"**
  - `sovereign-cfo` → ketik **"CFO"**, "runway", "pajak"
  - `sovereign-master-boot` → ketik **"boot sovereign mode"**

**B. Claude (Anthropic, dukungan Agent Skills)**
- Letakkan folder skill di direktori skills yang dibaca Claude.
- Sebut skill di prompt: *"Gunakan skill sovereign-<nama> untuk ...".*

**C. LLM/IDE lain**
- Buka `SKILL.md`, **salin seluruh isinya** ke awal percakapan sebagai instruksi sistem,
  lalu beri perintah kerja Anda. (Cara universal — selalu berhasil.)

### Langkah 5 — Verifikasi aktif (bukti, bukan tebakan)
Tanya ke agent:
```
skill apa saja yang sekarang aktif? ringkas aturan utamanya.
```
Bila agent menyebut nama skill Anda + aturannya → **AKTIF & SIAP.** ✅

---

## 4. CARA PAKAI PER-KATEGORI (peta cepat)

| Kategori | Contoh skill | Kalimat pemicu contoh |
|---|---|---|
| **Boot / identitas** | `master-boot`, `team-boot`, `system-prompt-opus-4.8` | "boot sovereign mode, lanjut" |
| **C-Suite (penasihat)** | `cfo`, `cto`, `cmo`, `cpo`, `coo`, `cofounder` | "jadi CFO, hitung runway 6 bulan" |
| **Squad (tim eksekusi)** | `squad-engineering`, `squad-marketing`, ... | "squad engineering, buat fitur X" |
| **Deploy / infra** | `cf-byok-deploy`, `github-push`, `hf-spaces-deploy` | "deploy app ini ke cloudflare akun saya" |
| **Pipeline penuh** | `fullstack-cycle` | "full cycle: bangun sampai production" |
| **Orkestrasi** | `orchestrator`, `orchestration-patterns` | "pecah tugas ini jadi sub-task" |
| **Memory** | `hermes-memory`, `memory-dreaming` | "simpan keputusan ini ke memory" |
| **Keamanan/QA** | `zero-trust`, `verify-rubric`, `enterprise-patterns` | "audit keamanan sebelum deploy" |
| **Framework** | `langchain-tools`, `langgraph-statemachine`, `crewai-swarm`, `n8n-workflow` | "bangun agent LangChain dengan tool X" |
| **Integrasi data** | `supabase-vault` | "pakai Supabase untuk auth + vector" |

> Tiap `SKILL.md` punya bagian **"Kapan dipakai"**, **"Urutan WAJIB"**, dan
> **"Failure modes"**. Baca bagian itu sekali — itu sudah cukup.

---

## 5. URUTAN REKOMENDASI (kalau beli banyak skill)

Untuk hasil maksimal, aktifkan dengan urutan ini (fondasi → eksekusi):

```
1) system-prompt-opus-4.8   (identitas tertinggi)
2) master-boot / team-boot  (booting)
3) context-injection        (baca konteks)
4) credit-aware             (guard biaya)
5) orchestration-patterns   (cara pecah tugas)
6) [skill kerja Anda]       (cfo / deploy / squad / dst.)
7) verify-rubric            (gate "selesai")
```

Punya **All-Access Bundle**? Cukup:
```
aktifkan semua skill di folder skills/, lalu boot sovereign mode.
```

---

## 6. CONTOH NYATA (end-to-end)

**Kasus:** Anda beli `sovereign-cf-byok-deploy` + `sovereign-github-push`,
ingin app Anda live di Cloudflare + tersimpan di GitHub.

```
1. Unzip kedua skill ke skills/
2. Di Genspark AI Dev:  "aktifkan semua skill di folder skills/"
3. Ketik: "deploy webapp saya ke Cloudflare Pages pakai akun saya,
           lalu push ke GitHub repo saya"
4. Agent mengikuti SKILL.md:
   - cf-byok-deploy → minta API token CF → build → deploy
   - github-push    → setup auth → commit → push
5. Verifikasi: agent kasih URL live + URL repo. Selesai. ✅
```

---

## 7. TROUBLESHOOTING (semua kemungkinan error)

| Gejala | Penyebab | Solusi |
|---|---|---|
| Agent "tidak menemukan skill" | struktur folder salah | pastikan `skills/<nama>/SKILL.md` (ada folder pembungkus) |
| Skill tidak ter-trigger | belum diaktifkan | ketik eksplisit "aktifkan skill <nama>" |
| ZIP tidak bisa dibuka | unduhan korup / terpotong | unduh ulang dari `/orders` |
| "download limit reached" | kuota unduh habis | hubungi support, sertakan Merchant Order ID |
| Agent abaikan aturan skill | konteks penuh / skill lain bentrok | mulai sesi baru, aktifkan skill yang relevan saja |
| LLM tidak dukung "skills" | platform tidak punya fitur skills | pakai **cara universal** (§3 Langkah 4-C): salin isi `SKILL.md` ke prompt |
| Skill minta token (CF/GitHub) | memang butuh kredensial | siapkan token sesuai instruksi di `SKILL.md` bagian "Secrets" |

> **Aturan emas:** kalau ragu, **buka `SKILL.md`** skill itu dan baca bagian
> **"Cara pakai"** + **"Failure modes"**. Semua jawaban ada di sana.

---

## 8. DUKUNGAN & LISENSI

- **Cek pesanan / unduh ulang:** `/orders`
- **Legal & kebijakan:** `/legal` (Terms · Refund · Privacy · Compliance)
- **Support:** kontak di halaman `/legal/compliance`.
- **Lisensi:** untuk penggunaan Anda sendiri. Reseller/white-label → lihat `/partner`.
- **MoR (Merchant-of-Record):** **Oasis BI Pro** via **Duitku** (PJP diawasi Bank Indonesia).

---

## 9. CHECKLIST FINAL (centang semua = sukses)

- [ ] ZIP terunduh & ter-ekstrak → ada `SKILL.md`
- [ ] Ditempatkan di `skills/<nama-skill>/SKILL.md`
- [ ] Diaktifkan di sesi AI ("aktifkan skill ...")
- [ ] Diverifikasi aktif (agent menyebut skill + aturannya)
- [ ] Dijalankan dengan perintah kerja nyata
- [ ] Hasil terverifikasi (bukti, bukan klaim)

> 🎉 **Selamat — skill sovereign Anda kini aktif & menghasilkan.**
> Butuh lebih banyak kapabilitas? Kunjungi katalog: **/catalog**.
