# B4-05 · MIGRATION-MAP-DOC — Aset Lama → Produk Baru + Roadmap Eksekusi
## SPARKMIND-OBP · Sovereign Agent Foundry · SSOT Batch 4

> v1.0 · 2026-06-20 · Fokus: peta konkret 36 skill → produk mainstream, perubahan kode minimal,
> dan urutan eksekusi (credit-aware) untuk mewujudkan repositioning.

---

## 1. Prinsip migrasi

1. **Tambah, jangan hancurkan.** Katalog skill (DIY/developer) **tetap**; kita **menambah**
   lapisan "solusi" (outcome) di atasnya. Reuse engine checkout/Duitku/MoR yang sama.
2. **Kode minimal, dampak maksimal.** Reposition utamanya soal **data (SKU) + copy + route**,
   bukan menulis ulang sistem.
3. **Truth-Lock.** Hanya jual outcome yang bisa dibangun dari skill yang ada.

---

## 2. Peta: 36 skill (mesin) → produk mainstream (yang dijual)

> Skill = *komponen mesin*. Produk = *hasil yang dirakit dari komponen itu*.

| Produk mainstream (outcome) | Skill mesin yang dipakai (contoh) |
|---|---|
| **BarberKas — Kas & Booking** | squad-opsfinance, credit-aware, fullstack-cycle, cf-byok-deploy, workflow-ops |
| **Toko Online + CS Auto** | fullstack-cycle, squad-sales-cs, claw-actuation, gtm-engineering, cf-byok-deploy |
| **PaceLokal — Mesin Konten** | cmo, squad-marketing, gtm-engineering, n8n-workflow |
| **MomentKas — Event & Kelas** | claw-actuation, computer-browser-use, fullstack-cycle, squad-product |
| **Nurani.OS — Donasi & Anggota** | zero-trust, supabase-vault, fullstack-cycle, verify-rubric |
| **KuratorKas — Otomasi Admin** | n8n-workflow, hermes-memory, verify-rubric, cowork-handoff |
| **App Custom (Done-for-You)** | fullstack-cycle, orchestrator, cf-byok-deploy, github-push, master-boot |
| **AI Company in a Box** | cofounder, cto, cfo, cmo, coo, cpo + semua squad + orchestrator |
| **AI Staff (langganan)** | squad-sales-cs (CS), squad-marketing (marketing), squad-opsfinance (admin) |
| **Edge Migration / Deploy** | cf-byok-deploy, hf-spaces-deploy, enterprise-patterns, workflow-ops |
| **MoR-as-a-Service** | (infra OBP+Duitku) + cfo + zero-trust |
| **Canon Course (ID)** | Anthropic-Canon + Cloudflare-Canon + hermes-memory + verify-rubric |

> **Pesan kunci:** kita tidak perlu skill baru untuk reposition — kita **merakit ulang** skill
> yang ada menjadi produk yang dimengerti pasar. "Productize", bukan "rebuild".

---

## 3. Perubahan kode (ringkas, minimal-invasif)

### 3.1 Data baru
| File | Isi |
|---|---|
| `src/data/solutions.ts` | Katalog **solusi** (outcome SKU): vertikal + high-ticket + langganan; tiap item: slug, nama-outcome, masalah, fitur, harga setup, harga langganan, ICP, skill mesin, CTA. |
| (perluas) `src/data/offers.ts` | Tambah SKU: Care Plan, AI Staff, setup per-vertikal, franchise. |

### 3.2 Route & view baru
| Route | Fungsi |
|---|---|
| `/` (re-copy) | Hero outcome (tanpa jargon); arahkan ke `/solutions`. |
| `/solutions` | Katalog solusi mainstream (per vertikal + high-ticket + langganan). |
| `/solutions/:slug` | Detail solusi: masalah → outcome → fitur → harga (DIY/DWY/DFY) → CTA. |
| `/developers` (atau `/skills`) | Pindahkan katalog skill teknis ke jalur developer (ICP-0). |
| `/partner` (perkaya) | Program reseller/white-label/MoR-aaS/franchise + intake. |

### 3.3 Yang TIDAK berubah
- `src/lib/duitku.ts`, `src/lib/gateway.ts`, `src/lib/email.ts` — engine pembayaran/email.
- `migrations/*` schema inti (orders/licenses/webhook_events/leads/brand_ledger) — reuse.
- `wrangler.jsonc`, stack, MoR, compliance — **tetap**.
- Checkout engine — reuse `OFFER_AS_PRODUCT` untuk SKU one-time/subscription baru.

### 3.4 Migrasi DB tambahan (jika perlu)
- `0003_solutions_subscriptions.sql` — opsional: tabel `subscriptions` (status langganan
  Care Plan/AI Staff/Founder Pass) bila MRR diaktifkan; reuse `orders` untuk bulan pertama.

---

## 4. Urutan eksekusi (sprint, credit-aware)

### Sprint R1 (D0–D14) — Reposition permukaan
- [ ] `solutions.ts` + `/solutions` + `/solutions/:slug` (≥6 SKU vertikal).
- [ ] Re-copy `/` ke bahasa outcome; pindahkan katalog skill ke `/developers`.
- [ ] Update nav, footer, OG/SEO ke pesan outcome.
- **DoD:** pengunjung non-teknis paham & bisa menuju checkout solusi.

### Sprint R2 (D15–D30) — Continuity & jasa
- [ ] Perluas `offers.ts`: Care Plan, AI Staff (langganan); halaman `/done-for-you` (App Custom/AI Company).
- [ ] (opsional) migrasi `subscriptions`.
- **DoD:** ada SKU langganan + intake high-ticket aktif.

### Sprint R3 (D31–D60) — Partner & proof
- [ ] Perkaya `/partner` (reseller/white-label/MoR-aaS/franchise) + kit partner.
- [ ] Rakit 2–3 case study beachhead → tampilkan di solusi terkait.
- **DoD:** ≥1 partner onboarding; case study live.

### Sprint R4 (D61–D90) — Edukasi & skala
- [ ] Canon Course (ID) landing + checkout; teaser Cloudflare Mastery.
- [ ] SEO lokal per-vertikal; referral.
- **DoD:** tripwire edukasi jalan; corong organik tumbuh.

> Selaras & memperbarui **12-TODO-ROADMAP** (tambahkan epik R1–R4 di atas backlog T-existing).

---

## 5. Backlog reposition (RICE ringkas)

| ID | Tugas | Impact | Effort | P |
|---|---|---|---|---|
| R1 | `solutions.ts` + katalog solusi + re-copy landing | 3 | 2 | 🔴 P0 |
| R2 | Pindah skill ke `/developers` (dual-front) | 2 | 1 | 🔴 P0 |
| R3 | Care Plan + AI Staff (langganan) | 3 | 2 | 🟠 P1 |
| R4 | Halaman Done-for-You (App Custom/AI Company) diperkaya | 3 | 1 | 🟠 P1 |
| R5 | Case study beachhead (3) | 3 | 2 | 🟠 P1 |
| R6 | Program partner + kit | 3 | 2 | 🟡 P2 |
| R7 | Canon Course landing+checkout | 2 | 2 | 🟡 P2 |
| R8 | SEO lokal per-vertikal | 2 | 2 | 🟡 P2 |
| R9 | tabel `subscriptions` (MRR) | 2 | 2 | 🟡 P2 |

---

## 6. Risiko migrasi & mitigasi

| Risiko | Mitigasi |
|---|---|
| Kanibalisasi jalur developer | pisahkan navigasi (`/solutions` vs `/developers`); pesan berbeda per audiens |
| Over-promise outcome | Truth-Lock: hanya jual yang bisa dirakit dari skill nyata; DFY untuk yang kompleks |
| Beban delivery jasa (1-operator) | akselerasi via `fullstack-cycle` + agent squad; batasi slot DFY/bulan |
| Copy masih teknis | tes 10-detik; review oleh non-teknis sebelum publish |
| Langganan menambah kompleksitas | mulai manual (renewal via invoice) sebelum otomasi penuh |

---

## 7. Definition of Done (migrasi reposition)

- [ ] Katalog solusi live (`/solutions`) dengan ≥6 SKU berharga & ber-CTA.
- [ ] Landing publik = outcome; jalur developer terpisah & utuh.
- [ ] ≥1 SKU langganan + halaman jasa high-ticket aktif.
- [ ] Engine pembayaran/MoR reuse tanpa regresi (smoke test hijau).
- [ ] SSOT (index, 06/07/08 upgrade, README) konsisten dengan reposition.
- [ ] Commit & push ke `Sovereign-Agent-Foundry`.

> **Catatan:** dokumen B4 ini adalah **cetak biru kanonik**. Eksekusi kode dilakukan di sprint
> berikutnya (R1–R4) sebagai micro-sprint terpisah (B2-04), agar credit-aware & ter-gate.
