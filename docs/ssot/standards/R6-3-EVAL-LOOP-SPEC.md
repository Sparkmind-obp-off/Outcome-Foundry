# R6-3 — EVAL LOOP RINGAN (Spec Siap-Eksekusi)
## Trace → Verifier → Promoted Playbook (Cloudflare-native)

> SSOT Standar/Spec · v1.0 · 2026-06-21 · Eksekusi **R6-3** dari [Batch 8 Blueprint](../batch-8-ecc-reference/B8-03-UPGRADE-BLUEPRINT-DOC.md).
> Menutup gap **EG4 (observability/continuous-learning loop)**. Diadopsi dari ECC lapis-4, di-adapt ke edge CF.
> ⚠️ **Status: SPEC SAJA.** Dokumen ini aman (tidak menyentuh kode/schema). **Eksekusi kode = HITL `secrets`/schema D1.**

---

## 1. Tujuan

Membuat **proof-of-outcome** terukur (inti Outcome Foundry / Batch 5): tiap outcome run
dicatat → diverifikasi (lulus/gagal + alasan) → run yang lulus dipromosikan jadi playbook reusable.

Tanpa loop ini, klaim "outcome delivered" = klaim tak teruji (melanggar Truth-Lock).

---

## 2. Komponen (3 lapis)

```
[1] TRACE      → catat tiap run ke D1 (input ringkas, output, gate, biaya estimasi)
      ↓
[2] VERIFIER   → sovereign-verify-rubric → skor lulus/gagal + alasan, diikat ke DoO (B5-02)
      ↓
[3] PLAYBOOK   → run yg lulus → template playbook reusable utk outcome serupa
      ↓
[HUD]          → status payload (context/biaya/queue/risk) di dashboard admin (T10)
```

---

## 3. Skema D1 (DRAFT — perlu approval HITL sebelum migrate)

> File rencana: `migrations/0003_outcome_traces.sql` (BELUM dibuat — tunggu HITL).
> Tabel eksisting (jangan diubah): `customers, orders, licenses, webhook_events, waitlist, brand_ledger, leads`.

```sql
-- DRAFT — tinjau sebelum apply (HITL: schema D1)
CREATE TABLE IF NOT EXISTS outcome_traces (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  outcome_slug  TEXT NOT NULL,            -- jenis outcome (mis. "onboarding-umkm")
  input_summary TEXT,                     -- ringkasan input (NON-secret, NON-PII mentah)
  output_ref    TEXT,                     -- pointer hasil (URL/key), bukan data sensitif
  gate_result   TEXT,                     -- none|payment|legal|... (gate yang aktif)
  verifier_score INTEGER,                 -- 0..100 dari rubrik
  verifier_pass  INTEGER DEFAULT 0,       -- 0=gagal 1=lulus
  verifier_notes TEXT,                    -- alasan lulus/gagal (bukti)
  cost_estimate  REAL,                    -- estimasi biaya/credit
  created_at     DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_traces_outcome ON outcome_traces(outcome_slug);
CREATE INDEX IF NOT EXISTS idx_traces_pass    ON outcome_traces(verifier_pass);

CREATE TABLE IF NOT EXISTS promoted_playbooks (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  outcome_slug  TEXT NOT NULL,
  source_trace_id INTEGER,                -- trace yang lulus → jadi playbook
  title         TEXT NOT NULL,
  steps_md      TEXT NOT NULL,            -- langkah reusable (markdown)
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (source_trace_id) REFERENCES outcome_traces(id)
);
```

**Privasi (UU PDP 27/2022):** `input_summary` & `output_ref` WAJIB non-PII-mentah & non-secret.
Simpan pointer, bukan data sensitif. (Konsisten `sovereign-zero-trust` ZT-1.)

---

## 4. Endpoint (DRAFT — Hono, tunggu HITL)

| Method | Path | Fungsi | Gate |
|---|---|---|---|
| POST | `/api/admin/trace` | catat 1 outcome run | admin token |
| GET | `/api/admin/traces?outcome=` | list trace + skor | admin token |
| POST | `/api/admin/playbook/promote` | promosikan trace lulus → playbook | admin token |
| GET | `/api/admin/hud` | status payload (context/biaya/queue/risk) | admin token |

> Semua endpoint di bawah `/api/admin/*` (sudah ter-proteksi token terpisah — lihat 04-PRODUCTIONIZED §8).
> Prepared statement wajib (`?`). Tidak ada endpoint publik untuk trace.

---

## 5. Verifier rubrik (ikat ke DoO B5-02)

Pakai `sovereign-verify-rubric` sebagai gate terstruktur. Skor lulus bila SEMUA:
- [ ] Bukti outcome ada (bukan klaim) — link/artefak terverifikasi.
- [ ] Sesuai **Definition-of-Outcome** spesifik (B5-02) untuk `outcome_slug` tsb.
- [ ] Tidak ada secret/PII bocor di trace.
- [ ] Gate HITL yang relevan sudah dilewati (bila menyentuh payment/legal/customer-facing).

---

## 6. Definition of Done (R6-3, saat dieksekusi nanti)

- [ ] HITL owner approve schema `0003_outcome_traces.sql`.
- [ ] Migrasi local + apply; endpoint admin trace/playbook/hud jalan + diuji `curl` (bukti).
- [ ] 1 playbook contoh dipromosikan dari 1 trace yang lulus.
- [ ] Dashboard admin menampilkan HUD (context/biaya/queue/risk).
- [ ] `sovereign-verify-rubric` di-update: formalkan trace+verifier+playbook.

---

## 7. Ringkasan satu kalimat (kanonik)

> **R6-3 menjadikan setiap outcome dapat dibuktikan: dicatat (trace D1) → diverifikasi vs DoO →
> dipromosikan jadi playbook — proof-of-outcome edge-native yang menegakkan Truth-Lock.**

---

*Truth-Lock: spec ini dokumen saja. Schema/endpoint/migrasi = HITL owner (schema D1 + admin).
Atribusi: pola eval-loop terinspirasi `affaan-m/ECC` (MIT), ditulis ulang konteks SAF.*
