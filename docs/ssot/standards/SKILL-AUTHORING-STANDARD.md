# SKILL AUTHORING STANDARD (R6-1)
## Standar Penulisan Skill — Sovereign Agent Foundry

> SSOT Standar · v1.0 · 2026-06-21 · Eksekusi **R6-1** dari [Batch 8 Blueprint](../batch-8-ecc-reference/B8-03-UPGRADE-BLUEPRINT-DOC.md).
> Menutup gap **EG1 (authoring standard), EG2 (references/ terstruktur), EG10 (konsistensi metadata)**.
> Pola diadopsi dari `affaan-m/ECC` (MIT, atribusi) lalu **ditulis ulang** untuk konteks Indonesia-first + OUTCOME.

---

## 0. Tujuan

Membuat **satu standar tunggal** agar setiap skill di `skills/`:
1. **Boot konsisten** — agent bisa memilih & memuat skill yang tepat tanpa ambiguitas.
2. **Truth-Lock-native** — skill yang bergantung API eksternal wajib menandai dirinya "drift-prone".
3. **Outcome-first** — setiap skill menyatakan OUTCOME yang dihasilkan, bukan sekadar kapabilitas.
4. **Aman by-design** — setiap skill menandai `hitl-gate` & `cloudflare-native`.

Standar ini **murni dokumen + metadata** (tidak menyentuh kode produk) → aman & credit-aware.

---

## 1. Struktur folder skill (kanonik)

```
skills/<nama-skill>/
├── SKILL.md            # WAJIB — definisi utama (frontmatter + body)
├── references/         # OPSIONAL — knowledge mendalam (dipisah dari SKILL.md)
│   ├── <topik>.md      #   dimuat HANYA saat dibutuhkan (hemat context/credit)
│   └── ...
├── examples/           # OPSIONAL — contoh konkret (snippet, template)
└── scripts/            # OPSIONAL — script pendukung (idempoten, no-secret)
```

**Aturan emas (adopsi ECC, konteks SAF):**
- `SKILL.md` = **ringkas & dapat dieksekusi**. Knowledge panjang → pindah ke `references/`.
- `references/` di-load **progresif** (saat relevan saja) agar boot instan & hemat credit.
- **Tidak ada secret** di file mana pun (kunci Duitku/Resend/CF token → secret store, bukan repo).

---

## 2. Frontmatter WAJIB (YAML)

Setiap `SKILL.md` dibuka dengan blok YAML berikut:

```yaml
---
name: sovereign-<nama>                 # WAJIB — sama dgn nama folder, kebab-case
version: <semver>                      # WAJIB — mis. 2.0.0
description: >-                        # WAJIB — format "Use when… / Dipakai saat…"
  Kalimat trigger jelas: KAPAN skill ini dipakai + apa yang dilakukan.
  Awali dengan konteks pemicu agar agent bisa auto-match.
outcome: >-                            # WAJIB (khas SAF) — OUTCOME nyata yang dihasilkan
  Hasil konkret yang pembeli/owner dapatkan (bukan fitur, tapi hasil).
metadata:                              # WAJIB
  skill_category: "<anthropic-cat>"    # WAJIB — kategori Anthropic (lihat §3)
  layer: "<L0..L6>"                    # WAJIB untuk skill peran (C-suite/squad/boot)
  version_pack: "SOVEREIGN-SKILLS-PACK-v5.0"
  owner: "Reza Estes / Haidar Faras + Gyss (spousal 50/50)"
  doctrine: "MASTER-ARCHITECT-PROMPT v8.0 OVERRIDE-LOCK"
  cloudflare-native: true|false        # WAJIB (khas SAF) — jalan di edge CF tanpa runtime luar?
  hitl-gate: payment|legal|customer-facing|secrets|outbound|none  # WAJIB (khas SAF)
  drift-prone: true|false              # WAJIB — bergantung API eksternal yg bisa berubah?
  requires:                            # OPSIONAL — dependensi eksekusi
    bins: ["wrangler", "npx", "npm"]
    tools: ["setup_cloudflare_api_key", "meta_info"]
---
```

### Penjelasan field khas SAF (yang membedakan dari ECC)

| Field | Arti | Kenapa penting |
|---|---|---|
| `outcome` | OUTCOME nyata (bukan kapabilitas) | Inti tesis **Outcome Foundry** (Batch 5) |
| `cloudflare-native` | `true` jika murni jalan di edge CF | Jaga MOAT edge + hindari klaim palsu |
| `hitl-gate` | Gerbang yang butuh persetujuan manusia | Lindungi payment/legal/secret (Duitku!) |
| `drift-prone` | `true` jika bergantung API eksternal | Truth-Lock: **verifikasi sebelum klaim** |

---

## 3. Kategori skill (Anthropic `skill_category`)

Gunakan salah satu kategori kanonik berikut (selaras 9 kategori Anthropic):

| # | `skill_category` | Contoh skill SAF |
|---|---|---|
| 1 | `business-process-automation` | `sovereign-agent-foundry` |
| 2 | `knowledge-retrieval` | `sovereign-context-injection`, `sovereign-cowork-handoff` |
| 3 | `data-analysis` | (calon: eval/trace R6-3) |
| 4 | `content-generation` | `sovereign-cmo` (adaptasi) |
| 5 | `agent-orchestration` | `sovereign-orchestrator`, `sovereign-crewai-swarm` |
| 6 | `code-quality-review` | `sovereign-enterprise-patterns`, `sovereign-verify-rubric` |
| 7 | `ci-cd-deployment` | `sovereign-cf-byok-deploy`, `sovereign-github-push`, `sovereign-hf-spaces-deploy` |
| 8 | `security-compliance` | `sovereign-zero-trust`, `sovereign-supabase-vault` |
| 9 | `infrastructure-operations` | `sovereign-credit-aware`, `sovereign-workflow-ops` |

> Skill **peran** (C-suite L2, squad, boot) yang belum punya `skill_category` →
> petakan ke kategori yang paling dekat dengan fungsinya (lihat audit §5).

---

## 4. Body SKILL.md (heading kanonik)

Urutan heading yang disarankan (boleh subset; konsisten antar skill):

```markdown
## Kapan dipakai            # trigger eksplisit (cocok dgn `description`)
## OUTCOME                  # hasil nyata (cocok dgn frontmatter `outcome`)
## Urutan WAJIB             # langkah berurutan, jangan diacak
## Prompt-Defense           # baseline keamanan (R6-2) bila entry-point/eksternal
## HITL gate                # kapan WAJIB minta persetujuan owner
## Drift-prone warning      # bila `drift-prone: true` → verifikasi sebelum klaim
## Failure modes            # mode gagal umum + recovery
## Out of scope             # batas tegas (Truth-Lock)
```

---

## 5. HASIL AUDIT FRONTMATTER 39 SKILL (per 2026-06-21)

> Diaudit langsung dari `skills/sovereign-*/SKILL.md`. **Bukti, bukan klaim.**

### 5.1 Skor kepatuhan

| Field wajib | Patuh | Total | Status |
|---|---|---|---|
| `name` | 39 | 39 | ✅ 100% |
| `description` | 39 | 39 | ✅ 100% |
| `version` | 39 | 39 | ✅ 100% |
| `owner` | 39 | 39 | ✅ 100% |
| `skill_category` (eksplisit) | 24 | 39 | 🟠 62% |
| `outcome` (khas SAF) | 0 | 39 | 🔴 0% (field baru R6-1) |
| `cloudflare-native` (khas SAF) | 0 | 39 | 🔴 0% (field baru R6-1) |
| `hitl-gate` (khas SAF) | 0 | 39 | 🔴 0% (field baru R6-1) |
| `drift-prone` (khas SAF) | 0 | 39 | 🔴 0% (field baru R6-1) |
| folder `references/` | 0 | 39 | 🟢 opsional (belum dipakai) |

### 5.2 Skill TANPA `skill_category` eksplisit (15) — perlu dilengkapi

Mayoritas adalah skill **peran** yang saat ini hanya memakai `layer`:

```
sovereign-cfo            → security-compliance / business-process-automation
sovereign-claw-actuation → infrastructure-operations
sovereign-cmo            → content-generation
sovereign-cofounder      → business-process-automation
sovereign-coo            → business-process-automation
sovereign-cpo            → business-process-automation
sovereign-cto            → code-quality-review
sovereign-fullstack-cycle→ ci-cd-deployment
sovereign-hermes-memory  → knowledge-retrieval
sovereign-orchestrator   → agent-orchestration
sovereign-specialists    → business-process-automation
sovereign-squad-engineering → code-quality-review
sovereign-squad-marketing   → content-generation
sovereign-squad-opsfinance  → business-process-automation
sovereign-squad-product     → business-process-automation
sovereign-squad-sales-cs    → business-process-automation
sovereign-team-boot      → agent-orchestration
sovereign-workflow-ops   → infrastructure-operations
```

> Pemetaan di atas = **rekomendasi**. Penerapan (edit 15+ file frontmatter) dijadwalkan
> sebagai sub-tugas **R6-1b** (batch edit) agar tidak mengubah banyak file sekaligus tanpa review.

### 5.3 Field baru R6-1 (`outcome`, `cloudflare-native`, `hitl-gate`, `drift-prone`)

Field-field ini **diperkenalkan oleh standar ini** → 0% terisi (wajar, baru). Penerapan
bertahap: skill baru WAJIB mengikuti standar penuh; skill lama di-retrofit per sprint.

---

## 6. Checklist review skill (Definition-of-Done authoring)

Sebelum sebuah skill dianggap "patuh standar", centang semua:

- [ ] Folder = `skills/<name>/` dengan `SKILL.md` di dalamnya.
- [ ] Frontmatter punya **semua field WAJIB** (§2), termasuk `outcome`, `cloudflare-native`, `hitl-gate`, `drift-prone`.
- [ ] `name` == nama folder (kebab-case).
- [ ] `description` berformat trigger "Dipakai saat… → melakukan…".
- [ ] `skill_category` dari daftar §3.
- [ ] Bila `drift-prone: true` → ada section **Drift-prone warning** di body.
- [ ] Bila menyentuh payment/legal/secret/outbound → `hitl-gate` ≠ `none` + section **HITL gate**.
- [ ] Tidak ada secret/credential di file mana pun.
- [ ] Knowledge panjang dipindah ke `references/` (bila ada).

---

## 7. Contoh skill yang MENGIKUTI standar (referensi)

Lihat **`skills/sovereign-zero-trust/SKILL.md`** — di-upgrade pada R6-2 menjadi
skill pertama yang patuh standar penuh (frontmatter lengkap + section Prompt-Defense + HITL gate).

---

## 8. Ringkasan satu kalimat (kanonik)

> **SKILL-AUTHORING-STANDARD menyatukan cara menulis skill SAF — frontmatter wajib (termasuk
> `outcome`, `cloudflare-native`, `hitl-gate`, `drift-prone`), struktur `references/` progresif,
> dan checklist review — agar setiap skill konsisten, aman, Truth-Lock-native, & outcome-first.**

---

*Atribusi: pola authoring/references terinspirasi `affaan-m/ECC` (MIT). Ditulis ulang untuk konteks
Sovereign Agent Foundry. Truth-Lock: audit §5 diverifikasi langsung dari repo per 2026-06-21.*
