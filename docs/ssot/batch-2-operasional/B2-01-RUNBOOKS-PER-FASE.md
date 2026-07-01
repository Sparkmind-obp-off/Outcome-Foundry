# B2-01 — RUNBOOKS PER-FASE (F0–F7)
## SPARKMIND-OBP · Sovereign Agent Foundry · SSOT Batch 2

> v1.0 · 2026-06-20 · Operasionalisasi `sovereign-fullstack-cycle` fase 0–7.
> Setiap fase: **Tujuan → Langkah persis → Perintah → Definition-of-Done (DoD)**.
> Working dir WAJIB `/home/user/webapp`. Port **3000**. PM2 untuk service.

---

## F0 — Context Ingest + Scope Lock

**Tujuan:** kunci ruang lingkup & sumber kebenaran sebelum menyentuh kode.

**Langkah:**
1. Baca SSOT batch 1 (`docs/ssot/00`–`13`) + batch 2 index.
2. Identifikasi perubahan yang diminta → petakan ke TODO (`12-TODO-ROADMAP`).
3. Tentukan *blast radius*: file mana saja yang tersentuh.
4. Konfirmasi HITL bila menyentuh payment/legal/secret.

**DoD F0:**
- [ ] Lingkup tertulis (1 paragraf) + daftar file target.
- [ ] Tidak ada konflik dengan batch 1 (atau dicatat di GAP).

---

## F1 — Scaffold / Code

**Tujuan:** implementasi perubahan (Hono + CF Pages + D1) konsisten gaya repo.

**Langkah:**
1. Edit/ tambah file di `src/` (views = `.tsx`, data = `src/data`, lib = `src/lib`).
2. Migrasi DB baru → tambah `migrations/000X_*.sql` (idempoten `IF NOT EXISTS`).
3. Tambah binding baru → `src/types.ts` (`Bindings`) + `wrangler.jsonc` bila perlu.
4. Frontend statis → `public/static/*.js` (vanilla, tanpa SPA berat).

**Aturan teknis (non-negotiable):**
- `serveStatic` dari `hono/cloudflare-workers` (BUKAN node-server).
- Web API only: `crypto.subtle`, `fetch`, `TextEncoder`. Tanpa Node `fs`.
- State persisten di D1; jangan simpan di memory/file.

**DoD F1:**
- [ ] Kode ditulis, import konsisten, tanpa Node-only API.

---

## F2 — Build

**Tujuan:** SSR bundle produksi valid.

```bash
cd /home/user/webapp && npm run build   # timeout 300s+
```

**DoD F2:**
- [ ] `dist/_worker.js` terbentuk, `✓ built`, tanpa error TS/Vite.

---

## F3 — Test Lokal (PM2 + curl)

```bash
fuser -k 3000/tcp 2>/dev/null || true
cd /home/user/webapp && pm2 start ecosystem.config.cjs   # atau pm2 restart sparkmind-obp
sleep 5
curl http://localhost:3000/api/health
# smoke semua route
for r in / /catalog /pricing /about /legal /done-for-you /partner /orders \
         /product/sovereign-cfo /checkout/all-access-bundle /admin; do
  echo "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000$r)  $r"
done
```

**DoD F3:**
- [ ] `/api/health` → `{"status":"ok"}` + `products:36`.
- [ ] Semua route 200/expected.
- [ ] `pm2 logs --nostream` tanpa error fatal.

---

## F4 — Preview + Hardening

**Tujuan:** keamanan & kepatuhan sebelum produksi.

**Langkah:**
1. Cek security headers aktif (`curl -sI / | grep -i x-frame`).
2. Scan kebocoran secret (jangan ada `DUITKU_API_KEY` di kode/commit).
3. Validasi proteksi admin (`/admin` tanpa token → login).
4. Validasi webhook signature path (HMAC + fallback MD5).

**DoD F4:**
- [ ] Headers keamanan ada. Admin ter-gate. Tidak ada secret di repo.

---

## F5 — Deploy Production (BYOK / Hosted)

```bash
# BYOK (akun CF user)
setup_cloudflare_api_key            # TOOL; gagal → STOP, minta token Deploy panel
cd /home/user/webapp && npm run build
npx wrangler d1 migrations apply sparkmind-obp-production   # bila ada migrasi baru
npx wrangler pages deploy dist --project-name sparkmind-obp
curl https://sparkmind-obp.pages.dev/api/health
```
**JANGAN** `wrangler login` (OAuth tidak jalan di sandbox).

**DoD F5:**
- [ ] URL produksi `/api/health` OK. Migrasi remote applied. Secret terpasang.

---

## F6 — Push GitHub

```bash
setup_github_environment            # TOOL; gagal → STOP, arahkan ke #github tab
cd /home/user/webapp && git add -A && git commit -m "<pesan jelas & spesifik>"
git push origin main                # repo existing
```
Repo kanonik: `ganihypha/Sovereign-Agent-Foundry`.

**DoD F6:**
- [ ] Commit & push hijau ke `main`.

---

## F7 — Backup + README + Handoff

**Langkah:**
1. Update `README.md` (fitur, URI, status) bila ada perubahan besar.
2. Update SSOT terkait (mis. `13-GAP-ANALYSIS`).
3. `ProjectBackup` bila milestone besar.
4. Handoff ringkas (apa berubah, apa sisa, langkah berikut).

**DoD F7:**
- [ ] README & SSOT sinkron. Backup dibuat (bila milestone). Handoff tertulis.

---

## Lampiran — DoD ringkas seluruh siklus

| Fase | Gate hijau |
|---|---|
| F0 | scope + file target jelas |
| F1 | kode tanpa Node-only API |
| F2 | build sukses |
| F3 | health + semua route OK |
| F4 | hardening lulus |
| F5 | produksi health OK |
| F6 | push hijau |
| F7 | dokumentasi & handoff sinkron |
