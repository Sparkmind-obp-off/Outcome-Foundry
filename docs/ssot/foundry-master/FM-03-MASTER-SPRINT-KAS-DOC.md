# FM-03 · MASTER-SPRINT-KAS — Sprint Terikat Kas & Kredit (Per-Session)
## SparkMind X · Outcome-Foundry · SSOT Foundry-Master

> v1.0 · 2026-07-01 · Fokus: menjalankan sprint **credit-aware** — tiap sprint sesi punya
> anggaran kredit/biaya, OMTM, exit-gate, & log kas. "Jangan ngoding buta biaya."
> **Sumber kanonik:** `docs/ssot/foundry-master/FM-03-MASTER-SPRINT-KAS-DOC.md`
> **Selaras:** B5-03 (business model), 05-MONETIZATION, 12-TODO-ROADMAP, Batch 10 (launch).

═══════════════════════════════════════════════════════════════
🔒 HARD CONSTRAINTS (embedded — sama 6 constraint, lihat FM-01)
═══════════════════════════════════════════════════════════════
1. 100% genspark.ai/ai_developer + Cloudflare Workers/Pages. 2. Niche-first.
3. Horizontal-play. 4. D-1 Truth-Lock (kode live menang). 5. MoR Oasis BI Pro Duitku PRODUCTION. 6. OVERRIDE-CLOSE-OUT.
═══════════════════════════════════════════════════════════════

---

## 1. Apa itu "Sprint-Kas"

> **Sprint-Kas** = unit kerja 1-sesi (atau beberapa sesi) yang **selalu** menyatakan:
> (a) **scope** (apa yang dirakit), (b) **anggaran kredit/biaya** (berapa "kas" yang dipakai),
> (c) **OMTM** (1 metrik yang paling penting), dan (d) **exit-gate** (kapan dianggap selesai).

Dua makna "kas" yang diikat dokumen ini:
- **Kas kredit eksekusi** — kredit AI Developer / token LLM / waktu build (biaya *membangun*).
- **Kas bisnis (MoR)** — uang masuk via Duitku/`invoices` (hasil *menjual* outcome).

> Sprint sehat = biaya membangun << nilai yang dihasilkan, dan keduanya **terukur**.

---

## 2. Prinsip credit-aware (kanonik)

1. **Estimasi sebelum eksekusi.** Tulis perkiraan kredit (rendah/sedang/tinggi) + alasan.
2. **Batch, jangan boros.** Gabungkan edit; hindari build/deploy berulang tanpa perlu.
3. **Verify sekali, benar.** Build/test terarah (`npm run build` + curl route), bukan trial-and-error membabi buta.
4. **Stop-loss.** Bila biaya melampaui anggaran → STOP, tulis handoff, minta keputusan owner.
   (Pelajaran nyata: sesi lalu terputus mid-work karena kredit; stop-loss + handoff mencegah kerja hilang.)
5. **Reuse mesin.** Pakai engine/skill yang sudah ada (checkout MoR `src/duitku.ts`, fan-out) — jangan tulis ulang.

---

## 3. TEMPLATE SPRINT-KAS (copy-paste)

> Tulis di awal sesi (setelah resume). Simpan di handoff (FM-02 §1 & §6) atau `sprints/`.

```markdown
# SPRINT-KAS — {{OF-YYYYMMDD-NN}}
**Sprint:** {{nama singkat, mis. "R6-4: halaman /security-audit + template laporan AgentShield"}}
**Doctrine:** MASTER-ARCHITECT-PROMPT v8.0 · D-1 Truth-Lock · credit-aware

## 1. Scope (locked)
- {{1–3 deliverable konkret, "tambah jangan hancurkan kode live"}}

## 2. OMTM (1 metrik terpenting)
- {{mis. "route /security-audit HTTP 200 + form lead tersimpan/terkirim"}}

## 3. Anggaran KAS-KREDIT (biaya membangun)
| Aktivitas | Estimasi kredit | Catatan |
|---|---|---|
| Tulis kode/doc | rendah/sedang/tinggi | {{...}} |
| Build (`npm run build`) | {{x kali}} | batasi seminimal mungkin |
| Deploy | {{ada/tidak}} | deploy = GATE bila sentuh prod |
| **Total target** | {{rendah/sedang/tinggi}} | stop-loss bila lewat |

## 4. KAS-BISNIS terkait (bila menyentuh monetisasi)
- SKU/harga yang tersentuh (`src/data/offers.ts`): {{atau "-"}}
- Dampak ke `invoices` / MoR: {{atau "-"}}  (perubahan harga/payment = GATE HITL)

## 5. Exit-gate (DoD sprint ini)
- [ ] {{kriteria 1 — terukur}}
- [ ] {{kriteria 2 — terverifikasi build/curl}}
- [ ] Handoff (FM-02) ditulis & di-commit.

## 6. Risiko & stop-loss
- {{risiko}} → bila terjadi: {{tindakan}}
```

---

## 4. Tangga sprint (selaras roadmap produk)

Sprint-Kas memetakan ke roadmap yang sudah ada — **bukan** roadmap baru:

| Fase | Sumber roadmap | Fokus Sprint-Kas |
|---|---|---|
| **Reposition (B4)** | B4-05 migration map | tambah lapisan outcome (route/copy/data) |
| **Outcome Foundry (B5)** | B5-04 delivery engine, B5-05 pivot map | pipeline intake→live, proof |
| **R6 series (B8)** | B8-03 upgrade blueprint | R6-3 eval-loop, R6-4 AgentShield, R6-5 channel seat |
| **Launch (B10)** | B10-02/03/05 | GTM 0-follower, konten faceless, funnel (eksekusi = HITL owner) |
| **Foundry-Master (FM)** | dok ini | OS proses: boot/handoff/sprint/resume |

> Setiap Sprint-Kas WAJIB menyebut **fase mana** yang dilayaninya agar tidak keluar jalur.

---

## 5. OMTM & metrik kas (referensi cepat)

| Lapis | Metrik | Sumber |
|---|---|---|
| **Eksekusi (kredit)** | kredit/sesi, jumlah build, jumlah deploy | observasi sesi |
| **Outcome delivered** | app live, transaksi/invoice pertama tercatat | `/api/stats`, tabel `invoices` |
| **Kas bisnis (MoR)** | pembayaran `paid` di `invoices`, MRR | B5-03, 05-MONETIZATION |
| **Retensi** | churn langganan | 05-MONETIZATION |

> Truth-Lock: laporkan metrik **nyata** bila tersedia (query D1 / `/api/stats`); tandai *est.* bila estimasi.

---

## 6. HITL gate (kas-bisnis)

WAJIB persetujuan owner sebelum:
- Mengubah **harga** SKU publik (`src/data/offers.ts`) atau tier langganan.
- Mengubah **payment flow / Duitku / MoR** atau callback (`/webhooks/duitku`).
- Menjanjikan **garansi/ROI** (legal) ke pembeli.
- Membelanjakan **kredit besar** (mis. batch generasi/eksperimen mahal) melampaui anggaran.

---

## 7. Failure modes & recovery

| Mode gagal | Gejala | Recovery |
|---|---|---|
| Scope creep | sprint membengkak tanpa OMTM | kunci ulang scope §1, sisanya → sprint baru |
| Kredit jebol | biaya lewat anggaran | stop-loss §6, handoff, keputusan owner |
| Build berulang boros | banyak build trial | batch edit, build sekali setelah yakin |
| Klaim "selesai" tanpa exit-gate | DoD tidak dicentang | tegakkan §3.5 sebelum tutup sprint |

---

## 8. Out of scope (Truth-Lock)

- FM-03 **bukan** model bisnis (itu B5-03 / 05-MONETIZATION) — ia disiplin *eksekusi sprint*.
- FM-03 **tidak** menjamin angka MRR; ia menjamin sprint **terukur & sadar-biaya**.

---

## 9. Ringkasan satu kalimat (kanonik)

> **MASTER-SPRINT-KAS (FM-03) memaksa setiap sprint sesi menyatakan scope, OMTM, anggaran
> kas-kredit + kas-bisnis, dan exit-gate sebelum eksekusi — dengan stop-loss & gate HITL pada
> harga/payment — agar build Outcome-Foundry selalu credit-aware, terukur, dan tidak keluar jalur.**
