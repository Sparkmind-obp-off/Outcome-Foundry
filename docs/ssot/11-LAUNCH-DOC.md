# LAUNCH-DOC — End-to-End Launch Checklist
## SPARKMIND-OBP · Sovereign Agent Foundry

> SSOT batch 11 · v1.0 · 2026-06-20 · Tujuan: checklist peluncuran terverifikasi (technical + commercial)

---

## 1. Definisi "launched"

Produk dianggap **launched** ketika: (a) publik bisa membeli, (b) 1 transaksi paid
end-to-end terverifikasi, (c) pembeli menerima akses unduh, (d) GTM aktif menarik traffic.

---

## 2. Pre-launch — Teknis (gate)

- [x] SSR semua halaman live (landing/katalog/pricing/product/about/thank-you).
- [x] D1 production migrated (`sparkmind-obp-production`).
- [x] Secrets `DUITKU_*` terpasang (encrypted).
- [x] Checkout → `paymentUrl` prod (`app-prod.duitku.com`) terverifikasi.
- [x] Webhook signature (HMAC + fallback MD5) tervalidasi.
- [ ] **1 transaksi paid live nominal kecil** end-to-end (callback `paid`).  ⟵ kritikal
- [ ] File skill di **R2** + bind `/api/download/:token` (saat ini metadata).
- [ ] **Email license** otomatis (Resend/Mailgun via REST).
- [ ] Custom domain bind (`sparkmind.web.id`/`oasis-bi-pro.web.id`) + update callback/return URL.
- [x] Health `GET /api/health` 200.

---

## 3. Pre-launch — Compliance (gate)

- [x] Disclosure MoR (Oasis BI Pro) di footer & checkout.
- [x] `brand_ledger` mencatat settlement per order.
- [ ] Halaman kebijakan: refund, privasi (PDP), terms.
- [ ] Kontak support tampil (email/WA).

---

## 4. Pre-launch — Commercial (gate)

- [ ] **All-Access Bundle (Rp 990k)** aktif sebagai anchor offer.
- [ ] Founding discount + copy "harga pendiri".
- [ ] Waitlist aktif (`POST /api/waitlist`) + halaman terkait.
- [ ] 3–5 aset konten "build in public" siap.
- [ ] OG image minimal untuk landing & top produk.

---

## 5. Launch day — Runbook

```
T-1: deploy final (RUNPLAYBOOK §6) + smoke test semua URI + 1 transaksi kecil live
T0 : publish konten launch + buka penawaran founding
T0 : monitor real-time: orders(status), webhook_events(processed), health
T+1: respons lead/komentar; catat objection → update copy (voice tuning)
T+7: review metrik funnel; iterasi penawaran
```

Smoke test cepat:
```bash
for p in / /catalog /pricing /about /thank-you /api/health /api/products; do
  echo "== $p =="; curl -s -o /dev/null -w "%{http_code}\n" https://sparkmind-obp.pages.dev$p
done
```

---

## 6. Post-launch — Pekan 1

- [ ] Verifikasi ≥ 1 pembeli sukses unduh.
- [ ] Rekonsiliasi `brand_ledger` vs dashboard Duitku.
- [ ] Kumpulkan testimoni/feedback → konten sosial.
- [ ] `sovereign-memory-dreaming`: distil pelajaran launch ke doctrine.
- [ ] Update README + SSOT (status, metrik).

---

## 7. Rollback plan

| Masalah | Rollback |
|---|---|
| Bug checkout/payment | `wrangler pages deploy` versi sebelumnya; matikan tombol beli (feature flag copy) sementara |
| Webhook salah proses | hentikan minting; reprocess dari `webhook_events` setelah fix |
| Secret bocor | rotasi `DUITKU_API_KEY` (`wrangler pages secret put`) + audit |

---

## 8. Go / No-Go

**GO** jika semua gate **Teknis kritikal** (transaksi paid live) + **Compliance** terpenuhi.
**NO-GO** jika transaksi paid end-to-end belum tervalidasi — risiko menjual tanpa delivery.

> Status saat ini: **SOFT-LIVE** (publik bisa checkout, paymentUrl nyata) →
> **FULL-GO** setelah transaksi paid live + R2/email delivery tervalidasi.
