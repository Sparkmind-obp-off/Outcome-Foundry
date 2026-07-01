# B8-02 — GAP-MAP: ECC vs Sovereign Agent Foundry
## Apa yang ECC punya & kita belum · Apa moat unik kita

> SSOT Batch 8 · v1.0 · 2026-06-21 · Komparasi ECC (referensi) vs SAF (produk hidup).
> Tujuan: identifikasi gap yang layak ditutup + tegaskan diferensiasi yang TIDAK boleh hilang.

---

## 1. Perbandingan tingkat tinggi

| Dimensi | ECC (affaan-m/ECC) | Sovereign Agent Foundry (kita) |
|---|---|---|
| **Kategori** | Harness OS untuk developer (tooling) | Outcome Foundry untuk UMKM (hasil jadi) |
| **Pembeli** | Developer / engineering team global | UMKM/SMB Indonesia + agency + developer |
| **Yang dijual** | Tooling agentik (skills/agents) | **Outcome** (app/otomasi/sistem jalan) |
| **Bahasa pasar** | English-first, 12 lokalisasi | **Indonesia-first** |
| **Payment** | Stripe-style global ($/seat) | **Duitku/QRIS/VA lokal sebagai MoR** |
| **Deploy** | Lintas-harness, desktop, CLI | **100% Cloudflare-Native (web), ZERO VPS** |
| **Skala aset** | 271 skills · 67 agents · 92 cmd · 114 rules | 36–40 skill (mesin) |
| **Popularitas** | 211K+ stars (OSS viral) | Produk komersial baru, live |
| **Lisensi** | MIT (open) | Privat/komersial (produk berbayar) |
| **Monetisasi** | OSS gratis → Pro $19/seat → App → Sponsor | OaaS hibrida (Setup+langganan+jasa), MoR |

---

## 2. GAP yang ECC punya & kita belum (kandidat adopsi)

| # | Gap | Bukti ECC | Dampak jika diadopsi | Prioritas |
|---|---|---|---|---|
| **EG1** | **Standar authoring skill tertulis** | `SKILL-DEVELOPMENT-GUIDE`, frontmatter konsisten, `references/`, drift-warning | Kualitas skill naik, onboarding kontributor cepat, kepercayaan pembeli naik | 🔴 P0 |
| **EG2** | **Pemisahan komponen** (skill/agent/command/hook/rule) | 5 jenis dgn kontrak aktivasi | Presisi naik + SKU baru (rule pack, command pack) | 🟡 P1 |
| **EG3** | **Security sebagai lapis platform + SKU** | `the-security-guide`, AgentShield, prompt-defense baseline | SKU keamanan untuk agency/UMKM + moat compliance | 🔴 P0 |
| **EG4** | **Observability / eval loop terukur** | JSONL traces, scenario→verifier→playbook, harness audit | Proof-of-outcome (Batch 5) jadi terukur & dapat dijual | 🟡 P1 |
| **EG5** | **Portabilitas lintas-harness** | Codex/Cursor/Gemini/Zed/Copilot adapter | Jangkauan distribusi developer global (top-of-funnel) | 🟢 P2 |
| **EG6** | **App-as-distribution + entitlement/seat** | GitHub App `ecc-tools`, Pro $19/seat | Channel akuisisi + recurring (lengkapi Founder Pass) | 🟡 P1 |
| **EG7** | **RESUME/continuity sudah ada** ✅ | ECC pakai WORKING-CONTEXT.md, kita pakai RESUME.md | Sudah selaras — pertahankan & perketat | ✅ done |
| **EG8** | **Sponsor/community tier** | GitHub Sponsors, Discord, ecc.tools | Tier murah top-of-funnel + community moat | 🟢 P2 |
| **EG9** | **Prompt-defense baseline di tiap entry-point** | Verbatim block di `CLAUDE.md` | Hardening langsung; murah; menutup risiko injeksi | 🔴 P0 |
| **EG10** | **Skill testing & CI** | `tests/run-all.js`, harness audit di CI | Regression-proof; layak label "production-grade" | 🟡 P1 |

---

## 3. Pemetaan gap → dokumen SSOT yang perlu di-upgrade

| Gap | Dokumen SSOT yang disentuh | Aksi |
|---|---|---|
| EG1, EG2, EG10 | `03-ARCHITECT-DOC`, baru: `SKILL-AUTHORING-STANDARD.md` | Tambah standar + taksonomi komponen |
| EG3, EG9 | `04-PRODUCTIONIZED-DOC`, `sovereign-zero-trust` | Tambah prompt-defense baseline + rencana AgentShield |
| EG4 | `B5-04-OUTCOME-DELIVERY-ENGINE`, `sovereign-verify-rubric` | Formalkan trace+verifier+playbook |
| EG5, EG6, EG8 | `05-MONETIZATION-DOC`, `09-GTM-DOC` | Tambah channel app/seat/sponsor + portabilitas |
| Semua | `13-GAP-ANALYSIS-AND-UPGRADE-DOC` | Catat gap EG1–EG10 sebagai log enhancement |

> Eksekusi konkret + roadmap → **[B8-03 UPGRADE-BLUEPRINT](B8-03-UPGRADE-BLUEPRINT-DOC.md)**.

---

## 4. MOAT kita yang ECC TIDAK punya (jangan sampai hilang)

Ini krusial: meniru ECC mentah-mentah = kehilangan keunggulan. Diferensiasi kita:

1. **Indonesia-first secara struktural.** Copy, harga IDR, UX non-teknis untuk UMKM. ECC =
   English-first developer tool. Pasar 30 juta+ UMKM Indonesia **tidak terlayani** ECC.
2. **Payment lokal sebagai Merchant-of-Record.** Duitku/QRIS/VA via Oasis BI Pro. ECC tidak
   menyentuh rail pembayaran lokal Indonesia sama sekali. Ini **moat distribusi + compliance**.
3. **Menjual OUTCOME, bukan tooling.** UMKM tidak mau "271 skills"; mereka mau "toko online
   saya jalan". Batch 5 (OaaS) = framing yang ECC **tidak** punya.
4. **100% Cloudflare-Native edge.** Biaya nyaris nol, global, tanpa VPS. ECC bias ke
   desktop/CLI/local harness.
5. **Done-for-You + intake high-ticket** (G4) untuk pasar yang tidak bisa self-serve. ECC
   murni self-serve developer.
6. **Sub-brand & MoR ledger** (4-Layer Hybrid Lock) untuk monetisasi multi-brand — pola
   bisnis lokal, bukan OSS tooling.

> **Kesimpulan strategis:** ECC menang di **luas (developer global, OSS viral)**. Kita menang
> di **dalam (UMKM Indonesia, outcome, payment lokal)**. Kita adopsi **rekayasa & governance**
> ECC, **bukan** model pasarnya.

---

## 5. Matriks keputusan (adopt / adapt / reject)

| Pola ECC | Keputusan | Alasan |
|---|---|---|
| Skill authoring standard | **ADOPT** | Murni positif, murah, menaikkan kualitas |
| Prompt-defense baseline | **ADOPT** | Hardening langsung, murah, menutup risiko |
| Pemisahan komponen 5-jenis | **ADAPT** | Pakai versi ringkas (skill/agent/rule cukup dulu) |
| Security platform/AgentShield | **ADAPT** | Jadikan SKU + dashboard web (bukan desktop) |
| Observability/eval loop | **ADAPT** | Implement di edge (D1/KV log + verifier) |
| Lintas-harness adapter | **ADAPT (P2)** | Mulai dari export skill ke format Claude/Codex; klaim hanya jika teruji |
| App/seat/sponsor monetisasi | **ADAPT** | Sesuaikan ke konteks ID (seat agency, sponsor lokal) |
| 271 skill / multi-bahasa PL | **REJECT** | Over-scope; lawan prinsip credit-aware & fokus UMKM |
| Desktop/TUI/control-pane native | **REJECT** | Lawan "100% Cloudflare-Native, ZERO VPS" → ganti dashboard web |
| Penyalinan konten skill ECC | **REJECT** | Tulis ulang sendiri (konteks ID) + atribusi MIT |

---

## 6. Ringkasan satu kalimat (kanonik)

> **Tutup 10 gap rekayasa ECC (terutama EG1 authoring, EG3/EG9 security, EG4 eval loop) yang
> menaikkan kualitas & kepercayaan; tegakkan 6 moat lokal (Indonesia-first, MoR, outcome,
> edge, done-for-you, multi-brand) yang ECC tidak bisa tiru.**

➡️ Lanjut: **[B8-03 — UPGRADE-BLUEPRINT](B8-03-UPGRADE-BLUEPRINT-DOC.md)**.
