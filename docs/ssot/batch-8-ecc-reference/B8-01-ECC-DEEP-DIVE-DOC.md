# B8-01 — ECC Deep-Dive (Dokumen Kanonik Referensi)
## "Everything Claude Code" (affaan-m/ECC) — analisis untuk Sovereign Agent Foundry

> SSOT Batch 8 · v1.0 · 2026-06-21 · Hasil clone & deep-dive langsung `github.com/affaan-m/ECC`
> Lisensi sumber: **MIT** (© 2026 Affaan Mustafa). Dokumen ini = analisis & pembelajaran pola,
> bukan penyalinan konten. Truth-Lock: setiap angka diverifikasi dari repo per 2026-06-21.

---

## 1. Apa itu ECC (definisi kanonik)

**ECC = "Everything Claude Code"** — self-described sebagai **"the harness-native operator
system for agentic work"** dan **"harness operating system, not only a catalog of commands,
agents, and skills"** (`docs/ECC-2.0-REFERENCE-ARCHITECTURE.md`).

Bukan sekadar kumpulan config. Ia adalah **sistem lengkap**: skills, instincts, memory
optimization, continuous learning, security scanning, dan research-first development —
**dievolusi >10 bulan pemakaian harian** membangun produk nyata (`README.md`).

ECC bersifat **lintas-harness (cross-harness)**: jalan di **Codex, Claude Code, Cursor,
OpenCode, Gemini, Zed, GitHub Copilot**, dan harness AI lainnya.

---

## 2. Angka & skala (verified per 2026-06-21)

| Aset | Jumlah | Bukti di repo |
|---|---|---|
| **Skills** | **271** | `ls skills/` = 271 folder (AGENTS.md klaim "271 skills") |
| **Agents** | **67** | `ls agents/*.md` = 67 (AGENTS.md klaim "67 specialized agents") |
| **Commands** | **92** | `ls commands/*.md` = 92 |
| **Rules** | **114** file | `find rules -name "*.md"` = 114 (22 set bahasa) |
| **Bahasa/ekosistem** | **12+** | rules: angular, arkts, cpp, csharp, dart, fsharp, golang, java, kotlin, nuxt, perl, php, python, react, ruby, rust, swift, typescript, vue, web |
| **Popularitas** | **211.9K+ stars · 32.5K+ forks · 230+ contributors** | `README.md` (badge endpoint `api.ecc.tools`) |
| **Versi** | **2.0.0** | `VERSION`, `package.json` (`ecc-universal`) |

> Catatan Truth-Lock: `SOUL.md` (file lebih lama) masih menyebut "30 agents, 135 skills, 60
> commands" — bukti repo bertumbuh cepat & beberapa dok belum sinkron. **Angka kanonik =
> hasil hitung langsung** (271/67/92/114), bukan klaim dokumen.

---

## 3. Arsitektur — 5 lapis "harness OS"

Dari `docs/ECC-2.0-REFERENCE-ARCHITECTURE.md` (disederhanakan):

```
┌──────────────────────────────────────────────────────────────┐
│ 1. Operator Surface — CLI, plugin, TUI, HUD/statusline,      │
│    release gates, PR checks                                   │
├──────────────────────────────────────────────────────────────┤
│ 2. Harness Adapter Layer — Claude Code, Codex, OpenCode,     │
│    Cursor, Gemini, Zed, dmux, Orca, Superset, terminal-only  │
├──────────────────────────────────────────────────────────────┤
│ 3. Worktree, Session & Queue Runtime — worktrees, panes,    │
│    sessions, todos, checks, merge/conflict queue, handoff    │
├──────────────────────────────────────────────────────────────┤
│ 4. Observability & Evaluation Loop — JSONL traces, status   │
│    snapshots, risk ledger, harness audit, scenario specs,    │
│    verifiers, promoted playbooks, RAG sets                    │
├──────────────────────────────────────────────────────────────┤
│ 5. Security & Commercial Platform — AgentShield/SARIF,      │
│    ECC Tools checks, billing, Linear/GitHub sync, reports    │
└──────────────────────────────────────────────────────────────┘
```

**Pelajaran untuk SAF:** doctrine kita (Batch 1 §4) sudah punya 2-pack (SIAPA + BAGAIMANA).
ECC menambah lapis yang kita **belum** formalkan: **(2) adapter lintas-harness**, **(4)
observability/eval loop**, **(5) security sebagai platform**. → ditindaklanjuti di B8-03.

---

## 4. Taksonomi komponen (5 jenis, kontrak jelas)

ECC memisahkan 5 jenis komponen dengan **kontrak aktivasi** yang tegas
(`docs/SKILL-DEVELOPMENT-GUIDE.md`):

| Komponen | Fungsi | Aktivasi |
|---|---|---|
| **Skill** | Repositori pengetahuan (knowledge module) | Context-based (otomatis) |
| **Agent** | Eksekutor tugas (subagent terspesialisasi) | Delegasi eksplisit |
| **Command** | Aksi user (`/command`) | Dipanggil user |
| **Hook** | Otomasi | Event-triggered |
| **Rule** | Pedoman selalu-aktif | Always active |

**Pelajaran:** SAF menyebut semuanya "skill". Memisahkan **skill (pengetahuan) vs agent
(eksekutor) vs command vs hook vs rule** akan menaikkan presisi & kualitas — dan membuka
**SKU baru** (mis. "rule pack Indonesia compliance", "command pack UMKM").

---

## 5. Standar authoring skill (yang kita belum punya)

ECC memperlakukan pembuatan skill sebagai **disiplin**, bukan ad-hoc:

- **Frontmatter konsisten** — `name`, `description` (kapan dipakai), `metadata.origin`.
  Contoh `skills/deep-research/SKILL.md`:
  ```yaml
  ---
  name: deep-research
  description: Multi-source deep research using firecrawl and exa MCPs...
    Use when the user wants thorough research on any topic with evidence and citations.
  metadata:
    origin: ECC
  ---
  ```
- **Folder `references/`** untuk knowledge mendalam (mis. `skills/brand-discovery/references/`
  punya 8 file: purpose, positioning, audience, personality, voice, narrative, founder-tension,
  SYNTHESIS).
- **"Drift-prone skill" warning** — skill yang bergantung API eksternal diberi peringatan
  eksplisit untuk verifikasi sebelum klaim (Truth-Lock-style!).
- **State-to-disk pattern** — skill multi-sesi menyimpan progress ke disk agar resumable.
- **Skill testing** — `node tests/run-all.js`, `/skill-create` dari git history, kebijakan
  penempatan (`SKILL-PLACEMENT-POLICY.md`: curated di `skills/`, generated di `~/.claude/skills/`).

**Pelajaran:** SAF perlu `SKILL-AUTHORING-STANDARD.md` sendiri (versi Indonesia-first +
Cloudflare-native + Truth-Lock). → B8-03 R6-1.

---

## 6. Security agentik sebagai kategori produk

`the-security-guide.md` + prompt-defense baseline di `CLAUDE.md` menunjukkan ECC
memperlakukan keamanan agentik **secara serius & komersial**:

- **Prompt-defense baseline** (verbatim di tiap entry-point) menolak: ganti peran/identitas,
  bocor secret/API key, eksekusi konten tak tervalidasi; mewaspadai homoglyph, zero-width
  char, urgency/authority pressure, dan **konten tool/dokumen ber-embed perintah**.
- **Untrusted content discipline** — data eksternal/fetched/URL dianggap untrusted; validasi
  sebelum bertindak.
- **Lethal trifecta** (Simon Willison): *private data + untrusted content + external
  communication* dalam satu runtime = pintu exfiltrasi.
- **AgentShield** — npm package komersial (`ecc-agentshield`) untuk policy/SARIF scanning.
- Referensi CVE nyata (CVE-2025-59536 CVSS 8.7; CVE-2026-21852 `ANTHROPIC_BASE_URL` leak),
  OWASP MCP Top 10, GitHub coding-agent threat model.

**Pelajaran:** SAF sudah punya `sovereign-zero-trust`. ECC membuktikan ini layak jadi
**lapis platform + SKU** (mis. "Sovereign AgentShield" untuk klien UMKM/agency). → B8-03 R6-2.

---

## 7. Observability & continuous-learning loop

ECC tidak menebak kualitas — ia **mengukurnya** (`docs/architecture/*`, lapis 4):

- **JSONL traces** + **status snapshots** + **risk ledger**.
- **Scenario spec → proposer trace → verifier result → promoted playbook** (loop perbaikan
  diri, diilhami meta-harness Stanford & autocontext).
- **HUD/status payload**: context pressure, tool activity, agent activity, queue activity,
  cost/risk — semua sebagai sinyal terstruktur.
- **Harness audit**: `npm run harness:audit -- --format json`, `npm run observability:ready`.

**Pelajaran:** SAF `sovereign-verify-rubric` adalah benih ini. Formalkan jadi **trace +
verifier + playbook** akan menaikkan kualitas outcome (Batch 5) secara terukur. → B8-03 R6-4.

---

## 8. Model bisnis (OSS → komersial berlapis)

Dari `docs/architecture/platform-value-loop.md` + `README.md`:

**Tiga lapis produk:**
1. **Meta-harness** (OSS gratis) — skills, rules, hooks, MCP, release gates, evals, security.
2. **Dedicated ECC agent** — agent yang mengoperasikan aset ECC, bukan hanya membacanya.
3. **Control pane / agentic IDE** — permukaan operator (sessions, queues, skills, memory,
   evidence, releases, team workflows).

**Monetisasi:**
- **ECC Pro** — private repos · GitHub App · **$19/seat/bln**.
- **GitHub App** (`ecc-tools`) — PR audits, free tier → berbayar.
- **Sponsor** — dari $5/bln.
- **npm packages** — `ecc-universal`, `ecc-agentshield` (distribusi + funnel).

**Tesis platform (verbatim disederhanakan):** OSS gratis menciptakan *default developer
vocabulary*; nilai berbayar = **team memory, observable queues, managed evals/release gates,
security review, billing/entitlement, integrasi produk** yang bisa jadi skill ECC reusable.

**Pelajaran untuk SAF (validasi Batch 5):** model OaaS hibrida kita (Setup + langganan + jasa)
**searah** dengan pola ini. ECC menambah ide: **entitlement/seat, app-as-distribution,
sponsor tier**. Tapi **moat kita beda** (lihat B8-02 §4): ECC menjual *tooling ke developer*;
kita menjual *outcome ke UMKM* dengan *payment lokal sebagai MoR*.

---

## 9. Hal yang TIDAK relevan / harus dihindari untuk SAF

Truth-Lock — tidak semua di ECC cocok dengan doctrine kita:

| Hal di ECC | Kenapa hati-hati untuk SAF |
|---|---|
| Multi-bahasa pemrograman (12+ rule set) | SAF fokus Hono/TS + Cloudflare. Jangan over-scope. |
| Desktop/TUI/control-pane native | Melanggar "100% Cloudflare-Native, ZERO VPS". Adopsi sebagai **dashboard web** saja. |
| Klaim "lintas-harness" tanpa uji | Truth-Lock: hanya klaim setelah benar-benar diuji per harness. |
| Skala 271 skill | Kita **tidak** kejar jumlah; kita kejar **outcome value**. Kualitas > kuantitas. |
| Penyalinan skill/agent ECC | MIT mengizinkan, tetapi doctrine kita = tulis ulang sesuai konteks ID + atribusi. |

---

## 10. Ringkasan satu kalimat (kanonik)

> **ECC adalah cermin "sistem agentik matang berskala global" (harness OS + observability +
> security + OSS-komersial berlapis); Sovereign Agent Foundry mengadopsi POLA-nya (authoring
> standard, security platform, eval loop, model berlapis) tanpa kehilangan MOAT uniknya —
> Indonesia-first, payment lokal MoR, dan penjualan OUTCOME ke UMKM.**

➡️ Lanjut: **[B8-02 — GAP-MAP ECC vs SAF](B8-02-GAP-MAP-ECC-vs-SAF-DOC.md)**.
