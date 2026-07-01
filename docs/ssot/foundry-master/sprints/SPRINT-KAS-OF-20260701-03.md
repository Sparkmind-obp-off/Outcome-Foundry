# SPRINT-KAS — OF-20260701-03
**Sprint:** CT-1..CT-4 — tutup DRIFT: implement `notFound`/`onError` + halaman `/about`, `/legal`, `/pricing` + `/sitemap.xml`, `/robots.txt` yang **diklaim done tapi belum ada di kode**
**Doctrine:** MASTER-ARCHITECT-PROMPT v8.0 · D-1 Truth-Lock · credit-aware
**Tanggal:** 2026-07-01 WIB
**Agent:** Genspark AI Developer (Sovereign Architect mode)

## 1. Scope (locked)
Temuan Truth-Lock sesi ini: `CODEBASE-TRUTH-RECONCILIATION.md §4` menandai **CT-1..CT-5 = ✅**,
tetapi `src/index.tsx` **tidak memiliki** `app.notFound()`, `app.onError()`, maupun route
`/about`, `/legal`, `/pricing`, `/sitemap.xml`, `/robots.txt`. Ini **DRIFT dok↔kode** (dok
mengklaim fitur yang belum ada). Sprint ini **menutup drift dengan mengimplementasikan kode
nyata**, lalu mengoreksi dok agar jujur.

Scope kode (additive, backward-compatible, TIDAK menyentuh engine MoR/invoice/webhook/fan-out):
1. **CT-1** `app.notFound()` (404 bersih SSR) + `app.onError()` (500 aman, no-leak).
2. **CT-2** `/about` (profil + penjelasan MoR Oasis BI Pro) + `/legal` (Terms + Refund + Privasi UU PDP) — SSR.
3. **CT-3** `/pricing` (tangga harga ringkas dari `OFFERS`, 1 pintu masuk ke `/checkout`).
4. **CT-4** `/sitemap.xml` + `/robots.txt` (discoverability, konsisten route nyata).

Di luar scope: pricing SKU baru, klaim customer-facing besar, perubahan harga → **HITL owner**.

## 2. OMTM (1 metrik terpenting)
**0 route mengembalikan HTTP 500 saat diakses langsung** (semua route publik → 200; route
tak-match → 404 bersih). Diverifikasi via `curl` lokal (`wrangler pages dev`).

## 3. Anggaran KAS-KREDIT (biaya membangun)
| Aktivitas | Estimasi kredit | Catatan |
|---|---|---|
| Tulis kode/doc | sedang | 3 view baru + handler + edit index.tsx + koreksi dok |
| Build (`npm run build`) | 1–2 kali | batasi seminimal mungkin |
| Deploy | tidak (sesi ini) | deploy prod = GATE HITL owner (BYOK) → dilakukan owner/sesi lain |
| **Total target** | sedang | stop-loss bila > 2 build gagal berturut |

## 4. KAS-BISNIS terkait
Tidak menambah/ubah harga. `/pricing` hanya menampilkan harga yang **sudah** ada di `OFFERS`
(sumber kanonik B5-03). Tidak ada perubahan monetisasi → tidak butuh gate harga.

## 5. Exit-gate (DoD sprint ini)
- [ ] `app.notFound()` + `app.onError()` ada di `src/index.tsx`.
- [ ] Route `/about`, `/legal`, `/pricing`, `/sitemap.xml`, `/robots.txt` ada & render.
- [ ] `npm run build` sukses.
- [ ] `curl` lokal: semua route publik → 200; route acak → 404 (bukan 500).
- [ ] `CODEBASE-TRUTH` dikoreksi jujur (status berbasis kode nyata) + README route list diupdate.
- [ ] HANDOFF OF-20260701-03 ditulis + commit + push `main`.

## 6. Risiko & stop-loss
- **Risiko:** `jsxRenderer` butuh `c.render()` di handler; pastikan pola konsisten dgn view lain.
- **Risiko:** menyentuh engine MoR tak sengaja → **dilarang**; edit hanya bagian route publik.
- **Stop-loss:** bila build gagal > 2x atau ada regresi pada route API/webhook → STOP, tulis handoff,
  jangan push kode rusak.

> Truth-Lock: sprint ini menutup drift dengan **kode nyata dulu, baru klaim dok** — bukan sebaliknya.
