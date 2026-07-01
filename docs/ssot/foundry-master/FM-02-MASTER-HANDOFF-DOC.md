# FM-02 · MASTER-HANDOFF — Serah-Terima Antar-Sesi (Per-Session)
## SparkMind X · Outcome-Foundry · SSOT Foundry-Master

> v1.0 · 2026-07-01 · Fokus: **template & aturan handoff** agar konteks, status, & blocker
> tidak pernah hilang antar-sesi build. Akhir sesi → tulis handoff; awal sesi → baca handoff.
> **Sumber kanonik:** `docs/ssot/foundry-master/FM-02-MASTER-HANDOFF-DOC.md`
> **Lokasi file handoff aktual:** `docs/ssot/foundry-master/handoffs/HANDOFF-<session-id>.md`

═══════════════════════════════════════════════════════════════
🔒 HARD CONSTRAINTS (embedded — sama 6 constraint, lihat FM-01)
═══════════════════════════════════════════════════════════════
1. 100% genspark.ai/ai_developer + Cloudflare Workers/Pages. 2. Niche-first.
3. Horizontal-play. 4. D-1 Truth-Lock (kode live menang). 5. MoR Oasis BI Pro Duitku PRODUCTION. 6. OVERRIDE-CLOSE-OUT.
═══════════════════════════════════════════════════════════════

---

## 1. Prinsip handoff

1. **Tertulis, bukan ingatan.** Setiap sesi yang menyentuh kode/doc WAJIB diakhiri 1 file handoff.
2. **Truth-Lock.** Isi handoff = status nyata (diverifikasi dari `git`, build, route/curl) — bukan klaim.
3. **Self-contained.** Sesi berikutnya cukup baca 1 handoff terbaru + jalankan resume_boot.py.
4. **Singkat & terstruktur.** Maksimal ~1 layar; detail panjang → tunjuk commit/file.
5. **Blocker eksplisit.** Apa yang menghambat & siapa yang harus bertindak (owner vs agent).

> **Pelajaran nyata:** sesi build lalu terputus karena kredit tepat setelah menulis draf B10-04,
> dan B10-05 belum sempat dibuat meski sudah direferensikan. Handoff yang benar mencegah
> ambiguitas seperti ini — sesi lanjutan langsung tahu apa yang selesai vs terpotong.

---

## 2. Konvensi penamaan & lokasi

```
docs/ssot/foundry-master/handoffs/
├── HANDOFF-OF-20260701-01.md     # 1 file per sesi
├── HANDOFF-OF-20260702-01.md
└── LATEST.md                      # symlink/duplikat handoff terbaru (opsional)
```

- **Session-ID:** `OF-YYYYMMDD-NN` (OF = Outcome-Foundry; NN = urutan sesi di hari itu, mulai 01).
- File terbaru = handoff aktif. `resume_boot.py` (FM-04) otomatis menemukan yang terbaru.

---

## 3. TEMPLATE HANDOFF (copy-paste)

> Salin ke `handoffs/HANDOFF-<session-id>.md` di akhir sesi. Isi semua field; tulis `-` bila kosong.

```markdown
# HANDOFF — {{OF-YYYYMMDD-NN}}
**Tanggal:** {{YYYY-MM-DD HH:MM WIB}}
**Agent:** {{Genspark AI Dev / Claude / dst}}
**Doctrine:** MASTER-ARCHITECT-PROMPT v8.0 · D-1 Truth-Lock
**Repo/branch:** Sparkmind-obp-off/Outcome-Foundry · main
**Commit terakhir sesi ini:** {{git short-sha + subject}}

## 1. Misi sesi ini (scope locked)
- {{1–3 bullet apa yang seharusnya dikerjakan}}

## 2. Apa yang SELESAI (verified)
| Item | Bukti (file/route/commit) | Status |
|---|---|---|
| {{...}} | {{...}} | ✅ |

## 3. Apa yang BELUM / sebagian
| Item | Kenapa belum | Sisa pekerjaan |
|---|---|---|
| {{...}} | {{...}} | {{...}} |

## 4. Blocker & gate
- **HITL menunggu owner:** {{secret/payment/legal/domain/harga — atau "tidak ada"}}
- **Blocker teknis:** {{...}}

## 5. Status verifikasi (Truth-Lock)
- Build: {{`npm run build` → hijau? jumlah modul/kB}}
- Test cepat: {{curl / route mana yang dicek + HTTP code}}
- Deploy: {{ada/tidak — sebut kalau tidak deploy}}

## 6. Anggaran kredit sesi ini (FM-03)
- Estimasi terpakai: {{rendah/sedang/tinggi + catatan}}

## 7. NEXT STEP (untuk sesi berikutnya)
1. {{langkah pertama paling jelas}}
2. {{...}}

## 8. Catatan brutal-honest
- {{risiko, asumsi, hal yang perlu owner tahu}}
```

---

## 4. Aturan baca-tulis (lifecycle)

```
AWAL SESI                         AKHIR SESI
─────────                         ──────────
1. Boot FM-01 (prompt induk)      1. Update artefak (commit)
2. resume_boot.py (FM-04)         2. Tulis HANDOFF-<id>.md (template §3)
3. Baca handoff terbaru           3. (opsional) refresh LATEST.md
4. Konfirmasi NEXT STEP           4. git add docs/ssot/foundry-master/handoffs && commit + push
```

> **Aturan emas:** Sesi tidak dianggap "ditutup" sampai handoff tertulis & ter-commit.

---

## 5. Contoh handoff terisi (referensi)

Lihat file nyata: [`handoffs/HANDOFF-OF-20260701-01.md`](handoffs/HANDOFF-OF-20260701-01.md) —
handoff sesi pembuatan lapisan FOUNDRY-MASTER ini (adaptasi dari Barberkas-foundry).

---

## 6. Out of scope (Truth-Lock)

- Handoff **bukan** changelog penuh (itu `git log`); ia ringkasan keadaan + next-step.
- Handoff **tidak** memuat secret/credential apa pun (public-safe).

---

## 7. Ringkasan satu kalimat (kanonik)

> **MASTER-HANDOFF (FM-02) memaksa setiap sesi ditutup dengan 1 dokumen serah-terima
> Truth-Lock (selesai / belum / blocker / verifikasi / next-step) di `handoffs/`, sehingga
> sesi berikutnya bisa melanjutkan tanpa kehilangan konteks — bahkan bila sesi sebelumnya
> terputus mendadak (mis. kredit habis).**
