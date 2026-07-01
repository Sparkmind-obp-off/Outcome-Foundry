# FOUNDRY-MASTER (Outcome-Foundry) — MANIFEST

**Bundle ID**: `OUTCOME-FOUNDRY-MASTER-BUNDLE-v1.0`
**Owner**: Reza Estes / Haidar Faras — Sovereign AI Dev (Purwokerto)
**Doctrine**: MASTER-ARCHITECT-PROMPT v8.0 OVERRIDE-LOCK · D-1 Truth-Lock
**Status**: CANONICAL · EXECUTE-READY · PUBLIC-SAFE · v1.0 · 2026-07-01
**Repo (LIVE)**: https://github.com/Sparkmind-obp-off/Outcome-Foundry
**App (LIVE)**: https://outcome-foundry.biz.id

═══════════════════════════════════════════════════════════════
🔒 HARD CONSTRAINTS (embedded)
═══════════════════════════════════════════════════════════════
1. 100% genspark.ai/ai_developer + Cloudflare Workers/Pages.
2. Niche-first: UMKM Indonesia (barbershop → retail/jasa → ID), outcome-first.
3. Horizontal-play (multi sub-brand via MoR fan-out).
4. D-1 Truth-Lock (kode live menang).
5. MoR Oasis BI Pro Duitku PRODUCTION (merchant D20919).
6. OVERRIDE-CLOSE-OUT.
═══════════════════════════════════════════════════════════════

## 1. File index (urutan kanonik)

| # | File | Tujuan | Status |
|---|---|---|---|
| 00 | `FM-00-INDEX.md` | Index + peta lapisan proses + DoD | ✅ |
| 01 | `FM-01-MASTER-ARCHITECT-PROMPT-DOC.md` | Prompt induk boot agent (retargeted Outcome-Foundry) | ✅ |
| 02 | `FM-02-MASTER-HANDOFF-DOC.md` | Handoff per-session | ✅ |
| 03 | `FM-03-MASTER-SPRINT-KAS-DOC.md` | Sprint credit-aware | ✅ |
| 04 | `FM-04-RESUME-BOOT-DOC.md` | Resume keadaan repo | ✅ |
| — | `resume_boot.py` | Script resume (zero-dep, read-only, +`--check-live`) | ✅ |
| — | `handoffs/HANDOFF-OF-20260701-01.md` | Handoff sesi pembuatan lapisan ini | ✅ |

**Skill terkait** (folder lain):
| File | Tujuan | Status |
|---|---|---|
| `skills/sovereign-outcome-foundry-context-injection/SKILL.md` | Inject konteks + boot doctrine | ✅ |
| `.../references/context-map.md` | Peta doc + kapan memuat | ✅ |
| `.../references/inject-snippet.md` | Snippet siap-tempel | ✅ |

## 2. Hubungan dengan SSOT lain

- **Tidak men-supersede** apa pun. Murni **menambah lapisan PROSES** di atas:
  - Batch 2–3 (operasional + skala).
  - Batch 4 (`B4-00..07`) — reposition skill→outcome.
  - Batch 5 (`B5-00..06`) — pivot Outcome Foundry / OaaS.
  - Batch 8 (`B8-00..03`) — ECC reference + roadmap R6.
  - Batch 10 (`B10-00..05`) — launch from zero.
  - Standards (`SKILL-AUTHORING-STANDARD`, `R6-3`, `R6-4`).
  - `CODEBASE-TRUTH-RECONCILIATION.md` — jangkar kebenaran (kode live menang).
- Skill context-injection **menunjuk & menegakkan** SSOT di atas (lihat `../../../skills/.../references/context-map.md`).

## 3. Verifikasi

```bash
# Resume-boot harus jalan tanpa dependency
python3 docs/ssot/foundry-master/resume_boot.py
python3 docs/ssot/foundry-master/resume_boot.py --json | python3 -m json.tool > /dev/null && echo "JSON OK"
# Opsional: verifikasi route live
python3 docs/ssot/foundry-master/resume_boot.py --check-live
```

> **Truth-Lock:** MANIFEST ini hanya mendaftar file yang benar-benar ada di folder bundle &
> skill. Status `✅` diklaim setelah file diverifikasi ada + `resume_boot.py` diuji jalan.
> Bundle **public-safe**: tidak memuat secret/credential.

## 4. Catatan keamanan (penting)

File credential (mis. `DUITKU_API_KEY`, CF token) **TIDAK** dimasukkan ke repo/bundle ini.
Credential WAJIB disimpan di **secret store** (`wrangler pages secret put` / `.dev.vars` lokal
yang di-`.gitignore`), bukan di SSOT. Bila ada credential yang terlanjur terekspos, **rotate**
segera (GATE HITL owner).

## 5. Beda dari bundle Barberkas-foundry (sumber adaptasi)

| Aspek | Barberkas-foundry (sumber) | Outcome-Foundry (di sini) |
|---|---|---|
| Repo | `Barberkas-foundry` | **`Outcome-Foundry`** |
| App URL | (barberkas) | **`outcome-foundry.biz.id`** |
| Session-ID prefix | `BKF-` | **`OF-`** |
| Skill name | `sovereign-barberkas-foundry-context-injection` | **`sovereign-outcome-foundry-context-injection`** |
| resume_boot | git + handoff + ssot + README | **+ `--check-live` route verifier** + grup SSOT B2/B3/B8/B10 + truth-anchor |
| Jangkar kebenaran | (implisit) | **eksplisit `CODEBASE-TRUTH-RECONCILIATION.md` (kode live menang)** |
| Route snapshot | generic | **route nyata `src/index.tsx` embedded di FM-01** |
