# B3-03 · RUNBOOK INSIDEN

> SSOT Batch 3 — Skala · SPARKMIND-OBP / Sovereign Agent Foundry
> Tujuan: respons cepat, terstruktur, dan truth-locked saat ada gangguan — terutama yang menyentuh **uang** dan **pelanggan**.

---

## 0. Prinsip Respons

1. **Lindungi uang & data dulu.** Insiden payment/lisensi = prioritas tertinggi.
2. **Hormati gate.** Komunikasi pelanggan, rollback prod, dan perubahan payment = **approval owner**.
3. **Idempoten by design.** Jangan perparah dengan retry buta; cek `webhook_events` dulu.
4. **Catat semuanya.** Setiap insiden meninggalkan jejak + post-mortem.

---

## 1. Klasifikasi Severity

| Sev | Definisi | Contoh | Target respons |
|---|---|---|---|
| **SEV-1** | Uang/akses rusak / data berisiko | webhook tidak verifikasi, signature gagal massal, pembeli tidak bisa download | segera, gate owner |
| **SEV-2** | Fungsi inti terganggu sebagian | checkout error intermiten, 1 halaman down | jam yang sama |
| **SEV-3** | Minor / kosmetik | typo, gambar rusak, SEO meta | sprint berikutnya |

---

## 2. Alur Respons Umum (semua sev)

```
1. DETECT   → dari metrik B3-01 (webhook success, signature-fail, availability)
2. TRIAGE   → tentukan SEV + ruang lingkup (brand/endpoint terdampak)
3. CONTAIN  → hentikan kerusakan (tanpa melanggar gate)
4. DIAGNOSE → cari akar masalah (log, D1, kode)
5. FIX      → patch via micro-sprint (B2-04) + Verifier (B2-03 §6)
6. RECOVER  → pulihkan layanan; verifikasi smoke-test
7. COMMS    → (gate owner) kabari pelanggan bila terdampak
8. POSTMORTEM → catat sebab, dampak, perbaikan permanen
```

---

## 3. Playbook per Skenario

### 3.1 SEV-1 · Webhook Duitku gagal verifikasi / signature-fail
- **Containment:** jangan tandai order `paid` jika signature gagal. Biarkan idempotensi `webhook_events` mencegah duplikasi.
- **Diagnose:** cek `src/lib/duitku.ts` (HMAC-SHA256 header; callback = `merchantCode+amount+merchantOrderId` keyed apiKey; MD5 fallback). Verifikasi env `DUITKU_API_KEY`/`MERCHANT_CODE` benar & mode PRODUCTION.
- **Cek data:**
  ```bash
  npx wrangler d1 execute sparkmind-obp-production --local \
    --command="SELECT moid,status,created_at FROM orders ORDER BY created_at DESC LIMIT 10;"
  npx wrangler d1 execute sparkmind-obp-production --local \
    --command="SELECT * FROM webhook_events ORDER BY created_at DESC LIMIT 10;"
  ```
- **Gate:** perubahan apa pun pada logika signature/payment = **approval owner**.
- **Recover:** setelah fix, replay manual hanya untuk order yang benar-benar dibayar (verifikasi di dashboard Duitku dulu).

### 3.2 SEV-1 · Pembeli tidak bisa download (lisensi)
- **Diagnose:** cek `licenses.token`, `downloads_used` vs `max_downloads` (default 5).
- **Fix sementara (gate owner):** naikkan `max_downloads` untuk token sah, atau terbitkan token baru.
  ```bash
  npx wrangler d1 execute sparkmind-obp-production --local \
    --command="SELECT token,downloads_used,max_downloads FROM licenses WHERE token='{{token}}';"
  ```
- **Comms:** kabari pembeli setelah download dipulihkan (gate owner).

### 3.3 SEV-2 · Checkout error intermiten
- **Diagnose:** log `POST /api/checkout` + `createInquiry()`; cek timeout/Duitku 5xx.
- **Containment:** tampilkan pesan ramah + retry aman; jangan buat order ganda (cek moid).
- **Fix:** perbaiki error-shape & retry policy; smoke-test.

### 3.4 SEV-2/3 · Halaman down / build rusak
- **Diagnose:** `npm run build` (cek error vite/tipe); `pm2 logs sparkmind-obp --nostream`.
- **Fix:** perbaiki, rebuild, restart:
  ```bash
  fuser -k 3000/tcp 2>/dev/null || true
  cd /home/user/webapp && npm run build && pm2 start ecosystem.config.cjs
  curl -s localhost:3000/api/health
  ```

---

## 4. Rollback (PROD) — GATE OWNER

```
[STOP] Rollback produksi & komunikasi pelanggan butuh approval owner.
Setelah approval:
  1. Identifikasi commit baik terakhir (git log).
  2. Deploy ulang versi baik via jalur deploy aktif (BYOK / hosted skill).
  3. Verifikasi /api/health + smoke-test inti.
  4. Catat di post-mortem.
```

---

## 5. Template Post-Mortem (wajib untuk SEV-1 & SEV-2)

```
# POST-MORTEM — {{tanggal}} / {{insiden_id}}  · SEV-{{1|2|3}}
Ringkasan     : {{1-2 kalimat}}
Dampak        : {{siapa/berapa terdampak, durasi}}
Timeline      : detect {{t}} → contain {{t}} → fix {{t}} → recover {{t}}
Akar masalah  : {{root cause}}
Perbaikan     : sementara={{...}} · permanen={{...}}
Pencegahan    : {{guardrail/metric/test baru}}
Gate dihormati: {{ya/tidak — jelaskan}}
Commit fix    : {{hash}}
```

---

## 6. Template Komunikasi Pelanggan (GATE OWNER sebelum kirim)

```
Halo {{nama}}, kami mendeteksi gangguan pada {{fitur}} pada {{waktu}}.
Status: {{sudah pulih / sedang ditangani}}. Pesanan & pembayaranmu aman.
{{instruksi jika perlu}}. Mohon maaf atas ketidaknyamanannya.
— Tim SparkMind via Oasis BI Pro (Merchant-of-Record)
```

---

## 7. Keterkaitan

- Sinyal deteksi → **B3-01 Metrik AaaS** (webhook success, signature-fail, availability).
- Kontrak endpoint terdampak → **B2-02 API Spec Agen**.
- Eksekusi perbaikan → **B2-01 Runbooks** + **B2-04 Sprint** + Verifier **B2-03 §6**.
