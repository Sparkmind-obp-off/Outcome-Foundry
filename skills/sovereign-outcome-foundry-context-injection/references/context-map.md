# Context-Map — Peta Doc SSOT & Kapan Memuat (Outcome-Foundry)

> Referensi progresif untuk skill `sovereign-outcome-foundry-context-injection`. Muat doc
> **hanya saat relevan** agar boot instan & hemat kredit (credit-aware). D-1 Truth-Lock: bila
> doc konflik dengan kode live → **kode live menang** (`CODEBASE-TRUTH-RECONCILIATION.md`).

## 1. Selalu (setiap boot)

| Doc | Kenapa | Kapan |
|---|---|---|
| `docs/ssot/foundry-master/FM-01-MASTER-ARCHITECT-PROMPT-DOC.md` | Doctrine induk + 6 hard-constraint | Boot |
| `docs/ssot/CODEBASE-TRUTH-RECONCILIATION.md` | Jangkar kebenaran (kode live menang) | Boot |
| `docs/ssot/foundry-master/handoffs/` (terbaru) | NEXT STEP sesi lalu | Boot |
| `resume_boot.py` (output) | Status git/handoff/SSOT/route | Boot |

## 2. Saat merencanakan sprint

| Doc | Untuk |
|---|---|
| `docs/ssot/foundry-master/FM-03-MASTER-SPRINT-KAS-DOC.md` | Template sprint credit-aware + exit-gate |
| `docs/ssot/12-TODO-ROADMAP-DOC.md` | Backlog/roadmap resmi |
| `docs/ssot/batch-8-ecc-reference/B8-03-UPGRADE-BLUEPRINT-DOC.md` | Roadmap R6 (R6-1..R6-6) |

## 3. Saat menyentuh produk / route

| Area kerja | Muat doc |
|---|---|
| Route/UI (`src/index.tsx`) | `CODEBASE-TRUTH` + `03-ARCHITECT-DOC.md` |
| Payment/MoR (`src/duitku.ts`, `/webhooks/duitku`) | `docs/DUITKU-MOR-CANONICAL-SSOT.md` (⚠ GATE HITL) |
| Harga/SKU (`src/data/offers.ts`) | `05-MONETIZATION-DOC.md` + `B5-03` (⚠ GATE HITL) |
| Data/D1 (`migrations/`) | `03-ARCHITECT-DOC.md` (⚠ migrasi destruktif = HITL) |

## 4. Saat go-to-market / konten

| Doc | Untuk |
|---|---|
| `docs/ssot/batch-10-launch-zero/B10-00-INDEX.md` | Peta launch-from-zero |
| `B10-02-LAUNCH-STRATEGY-ZERO.md` | Strategi 90 hari |
| `B10-03-GTM-ZERO-FOLLOWER.md` | Dapat lead tanpa follower |
| `B10-04-FREE-TIER-CONTENT-TOOLKIT.md` | Tool konten free-tier no-CC |
| `B10-05-CONTENT-ENGINE-30DAY.md` | Kalender 30 hari + funnel |

## 5. Saat menulis/mengubah skill

| Doc | Untuk |
|---|---|
| `docs/ssot/standards/SKILL-AUTHORING-STANDARD.md` | Frontmatter R6-1 WAJIB |
| `docs/ssot/standards/R6-3-EVAL-LOOP-SPEC.md` | Eval-loop |
| `docs/ssot/standards/R6-4-AGENTSHIELD-SKU-SPEC.md` | AgentShield SKU |

## 6. Route live (Truth-Lock snapshot — verifikasi via `--check-live`)

```
UI : /  ·  /foundry  ·  /checkout  ·  /admin  ·  /payment/return
API: /api/health · /api/offers · /api/stats · /api/sub-brands · /api/invoices/:id
     POST /api/invoices · POST /webhooks/duitku (HMAC + replay-protected)
DATA: D1 → sub_brands, invoices, callbacks, fanout_log · SKU → src/data/offers.ts
```

> Bila route di doc ≠ kode live → **kode live menang**; update doc, bukan sebaliknya.
