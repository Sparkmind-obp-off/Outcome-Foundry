# R6-4 — "SOVEREIGN AGENTSHIELD" SKU (Spec Siap-Eksekusi)
## Security review agentik untuk agency/UMKM (jasa + web)

> SSOT Standar/Spec · v1.0 · 2026-06-21 · Eksekusi **R6-4** dari [Batch 8 Blueprint](../batch-8-ecc-reference/B8-03-UPGRADE-BLUEPRINT-DOC.md).
> Menutup gap **EG3 (security platform)** → di-adapt jadi **jasa+web** (bukan npm desktop seperti ECC).
> ⚠️ **Status: SPEC SAJA.** Aman (dokumen). **Eksekusi = HITL `customer-facing` + `pricing` + `legal`.**

---

## 1. Tesis

ECC punya "AgentShield" (security/SARIF, npm). Kita **tidak meniru produknya**; kita ambil
KEBUTUHANNYA: UMKM/agency yang pasang agent (WhatsApp/email/PDF/MCP) **rentan prompt-injection**
& tidak tahu cara mengamankannya. Kita jual **OUTCOME**: "agent Anda aman & lulus audit."

Selaras MOAT lokal: Indonesia-first, done-for-you, jual outcome (Batch 5).

---

## 2. Penawaran (DRAFT — pricing tunggu HITL owner)

| Tier | Isi | Harga (USULAN — belum final) | Gate |
|---|---|---|---|
| **Audit Kilat** | Audit 1 surface (mis. WA bot) + laporan ringkas | _hubungi / custom_ | pricing HITL |
| **AgentShield Pro** | Audit multi-surface + checklist OWASP MCP + rekomendasi gate HITL | _custom_ | pricing HITL |
| **Retainer** | Review berkala + monitoring | _custom_ | pricing + legal HITL |

> Harga sengaja `null` / "custom" sampai owner menetapkan (konsisten pola `offers.ts` `price_idr: null`).

---

## 3. Metodologi audit (yang dijual)

Berbasis `sovereign-zero-trust` (ZT-8/ZT-9) + lethal-trifecta:

1. **Petakan surface** klien: WhatsApp, email, PDF/upload, MCP/tool, PR/issue, webhook.
2. **Checklist OWASP MCP Top 10** + 5 aturan prompt-defense (identitas/secret/untrusted/penyamaran/trifecta).
3. **Uji injeksi terkontrol** (sample payload jahat) → catat mana yang lolos.
4. **Rekomendasi gate HITL** per surface + perbaikan least-privilege token.
5. **Laporan ringkas (web)** — verdict PASS/FAIL + tindakan prioritas.

---

## 4. Implementasi web (DRAFT — tunggu HITL customer-facing)

| Item | Rencana | Status |
|---|---|---|
| SKU baru di `src/data/offers.ts` | tambah Offer model `service`, `price_idr: null` | 📋 tunggu HITL pricing |
| Halaman `/security-audit` | landing + value + metodologi + CTA intake | 📋 tunggu HITL customer-facing |
| Form intake | nama, kontak, surface yang dipakai (lead → tabel `leads` eksisting) | 📋 reuse `leads` |
| Template laporan | 1 template markdown verdict + tindakan | 📋 dokumen |

> `leads` table sudah ada (migration `0002`) → intake bisa pakai itu, **tanpa schema baru**.
> Tidak ada perubahan payment/Duitku (penjualan via kontak/manual dulu) → risiko rendah.

---

## 5. Definition of Done (R6-4, saat dieksekusi nanti)

- [ ] HITL owner setujui **pricing** + **copy customer-facing** + cek **legal** (klaim "aman").
- [ ] Offer `sovereign-agentshield` ditambah di `offers.ts`.
- [ ] Halaman `/security-audit` live + form intake → simpan ke `leads`.
- [ ] 1 template laporan audit jadi.
- [ ] Disebut di `09-GTM` sebagai channel Done-for-You keamanan.

---

## 6. Truth-Lock & batas

- **Jangan klaim "100% aman"** — keamanan = reduksi risiko, bukan jaminan. Gunakan "lulus audit baseline".
- Tidak menjanjikan kepatuhan hukum spesifik tanpa review legal (HITL `legal`).
- Tidak meniru kode/branding ECC AgentShield (MIT) — metodologi ditulis ulang sendiri.

---

## 7. Ringkasan satu kalimat (kanonik)

> **R6-4 mengubah kebutuhan keamanan agentik UMKM/agency menjadi SKU done-for-you "Sovereign
> AgentShield" — audit prompt-injection + laporan outcome — dengan pricing & copy menunggu HITL owner.**

---

*Truth-Lock: spec ini dokumen saja. SKU/halaman/pricing = HITL (customer-facing + pricing + legal).
Atribusi: kebutuhan terinspirasi ECC AgentShield (MIT); metodologi & implementasi ditulis ulang konteks SAF.*
