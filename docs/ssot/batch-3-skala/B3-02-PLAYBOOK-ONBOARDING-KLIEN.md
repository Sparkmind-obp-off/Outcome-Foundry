# B3-02 · PLAYBOOK ONBOARDING KLIEN

> SSOT Batch 3 — Skala · SPARKMIND-OBP / Sovereign Agent Foundry
> Tujuan: mengubah lead jadi klien aktif yang berhasil memakai produk — untuk dua jalur: **Self-Serve** (beli ZIP) dan **Done-for-You** (jasa).

---

## 0. Dua Jalur Onboarding

| Jalur | Cocok untuk | Titik masuk | Hasil akhir |
|---|---|---|---|
| **Self-Serve** | UMKM/solo yang mau pakai skill sendiri | `/catalog` → `/checkout/:slug` | lisensi + download ZIP, aktif <10 menit |
| **Done-for-You** | Klien yang mau dibangunkan/diintegrasikan | `/done-for-you` → intake | proyek terjadwal + handoff |

---

## 1. Jalur A — SELF-SERVE

### A.1 Tahapan
1. **Discover** — pengunjung lihat `/catalog` / `/product/:slug`.
2. **Decide** — bandingkan tier (59k–149k) / bundle 990k / founder-pass.
3. **Checkout** — `POST /api/checkout` → buat invoice Duitku (PRODUCTION).
4. **Pay** — bayar di Duitku; callback `POST /webhook/duitku` (HMAC-verified, idempoten).
5. **Activate** — `GET /api/download/:token` → unduh ZIP (maks 5x default).
6. **Succeed** — pelanggan jalankan skill; kirim quick-start dalam ZIP.

### A.2 DoD Onboarding Self-Serve
- [ ] Order `paid` tercatat di `orders`.
- [ ] Lisensi terbit di `licenses` dengan token valid.
- [ ] Minimal 1 download sukses (aktivasi).
- [ ] Tidak ada error signature pada webhook.

### A.3 Gate HITL
- Perubahan harga/bundle yang ditampilkan = **approval owner**.
- Email/notifikasi outbound ke pembeli = **approval owner** (bila ditambahkan).

---

## 2. Jalur B — DONE-FOR-YOU (Jasa)

### B.1 Tahapan
1. **Intake** — klien isi form `/done-for-you` → `POST /api/intake` (tercatat di `leads`).
2. **Qualify** — owner menilai scope, anggaran, kelayakan (cocok untuk CF-native?).
3. **Proposal** — lingkup + harga + jadwal (gate: approval owner sebelum dikirim).
4. **Kickoff** — sepakati outcome + DoD; buat sprint plan (B2-04).
5. **Build** — eksekusi via role-switching (B2-03), micro-sprint per sesi.
6. **Verify** — Verifier rubric (B2-03 §6) + demo ke klien.
7. **Handoff** — serahkan artefak, dokumentasi, akses; catat di `brand_ledger` bila transaksi.
8. **Aftercare** — periode dukungan singkat; tawarkan retensi (founder-pass/partner).

### B.2 DoD Onboarding Done-for-You
- [ ] Scope & DoD tertulis dan disetujui klien.
- [ ] Deliverable lolos Verifier + demo diterima.
- [ ] Pembayaran tercatat via MoR (Oasis BI Pro) + `brand_ledger`.
- [ ] Dokumentasi handoff diserahkan.

### B.3 Gate HITL
- Proposal/harga jasa, kontrak, dan komunikasi klien = **approval owner**.
- Akses kredensial/secret klien = **approval owner** + simpan sebagai secret, jangan di FE.

---

## 3. SLA & Ekspektasi (default, dapat disesuaikan)

| Item | Self-Serve | Done-for-You |
|---|---|---|
| Aktivasi | instan setelah bayar | sesuai jadwal proyek |
| Respons pertanyaan | best-effort | sesuai kesepakatan |
| Revisi | N/A (produk fix) | sesuai scope |
| Dukungan | quick-start di ZIP | periode aftercare |

---

## 4. Template Pesan Onboarding (isi & minta approval owner sebelum kirim)

```
Halo {{nama}}, terima kasih sudah bergabung dengan {{brand}} (SparkMind).
Pesananmu ({{produk}}) sudah aktif. Unduh di: {{link_download}} (berlaku {{n}}x).
Mulai cepat: buka README di dalam ZIP. Butuh bantuan? Balas pesan ini.
— Tim SparkMind via Oasis BI Pro (Merchant-of-Record)
```

---

## 5. Konversi Onboarding → Retensi

Setelah klien aktif, arahkan ke ekspansi (lihat metrik B3-01):
- Self-serve sukses → tawarkan **bundle all-access** / **founder-pass**.
- Done-for-you selesai → tawarkan **partner-program** / retainer.

> Semua penawaran ekspansi yang menyentuh harga/komitmen = **gate approval owner**.

---

## 6. Keterkaitan

- Kontrak endpoint (checkout/webhook/download/intake) → **B2-02 API Spec Agen**.
- Eksekusi proyek done-for-you → **B2-03 role** + **B2-04 sprint** + **B2-05 master prompt**.
- Bila ada masalah saat onboarding (gagal bayar/download) → **B3-03 Runbook Insiden**.
