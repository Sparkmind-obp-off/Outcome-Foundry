# RUNPLAYBOOK-DOC — Daily Operations & Release SOP
## SPARKMIND-OBP · Sovereign Agent Foundry

> SSOT batch 10 · v1.0 · 2026-06-20 · Sumber: `sovereign-workflow-ops`, `fullstack-cycle`, `cf-byok-deploy`, `github-push`

---

## 1. Prinsip operasi

- Working dir **WAJIB** `/home/user/webapp`. Setiap bash: `cd /home/user/webapp && …`
- **PM2 untuk service** (jangan jalankan server langsung). Port **3000**.
- **Build dulu** sebelum start. Timeout npm **300s+**.
- **Credit-aware**: eksekusi hemat; jangan boros langkah/token.

---

## 2. SOP boot sesi (1 kalimat → siap kerja)

```
User: "boot sovereign mode, resume project, lanjut"
→ sovereign-master-boot:
   1. cari skills/ (workspace > upload > sb-git)
   2. load semua SKILL.md sebagai playbook aktif
   3. context-injection (ingest + scope lock)
   4. laporan boot 1 blok → auto-continue jika ada perintah kerja
```

---

## 3. SOP full-cycle (nol → production)

```
sovereign-fullstack-cycle (fase 0–7):
  F0 context ingest + scope lock
  F1 scaffold/code (Hono + CF Pages + D1)
  F2 build (npm run build)
  F3 test lokal (PM2 + curl /api/health)
  F4 preview + hardening (enterprise-patterns, zero-trust scan)
  F5 deploy production (cf-byok-deploy)
  F6 push GitHub (github-push)
  F7 backup + README + handoff (cowork-handoff)
```

---

## 4. SOP start/restart service (EXACT)

```bash
fuser -k 3000/tcp 2>/dev/null || true
cd /home/user/webapp && npm run build
cd /home/user/webapp && pm2 start ecosystem.config.cjs
curl http://localhost:3000/api/health
pm2 logs --nostream
```

Jika `wrangler.jsonc` berubah:
```bash
cd /home/user/webapp && rm -rf .wrangler && npm run build
npx wrangler d1 migrations apply sparkmind-obp-production --local
```

---

## 5. SOP database (D1)

```bash
# Lokal
npm run db:migrate:local
npm run db:seed
npm run db:console:local --command "SELECT status, COUNT(*) FROM orders GROUP BY status"
# Produksi (hati-hati)
npx wrangler d1 migrations apply sparkmind-obp-production
npx wrangler d1 execute sparkmind-obp-production --command "SELECT COUNT(*) FROM licenses"
```

---

## 6. SOP deploy production (BYOK)

```
1. setup_cloudflare_api_key   (TOOL; jika gagal → STOP, minta token Deploy panel)
2. cd /home/user/webapp && npm run build
3. npx wrangler d1 migrations apply sparkmind-obp-production   (jika ada migrasi baru)
4. npx wrangler pages deploy dist --project-name sparkmind-obp
5. npx wrangler pages secret put DUITKU_API_KEY   (saat rotasi)
6. curl https://sparkmind-obp.pages.dev/api/health
```
JANGAN `wrangler login` (OAuth tak jalan di sandbox).

---

## 7. SOP push GitHub

```
1. setup_github_environment   (TOOL; jika gagal → STOP, arahkan ke #github tab)
2. cd /home/user/webapp && git add -A && git commit -m "<pesan jelas>"
3. git push origin main        (repo baru: git push -f origin main)
```
Prioritaskan repo existing user (`ganihypha/Sovereign-Agent-Foundry`).

---

## 8. SOP harian (operate)

| Frekuensi | Tugas |
|---|---|
| Harian | cek `orders` pending lama, `webhook_events` unprocessed, health |
| Mingguan | rekonsiliasi `brand_ledger` (cfo), review KPI funnel |
| Saat rilis | jalankan LAUNCH-DOC checklist; bump README & SSOT |
| Saat sesi panjang | `sovereign-memory-dreaming` → distil pelajaran ke doctrine |

---

## 9. SOP keamanan (zero-trust)

- Secret hanya via secret store / `.dev.vars` (gitignored). JANGAN commit secret.
- HITL gate: payment / legal / customer-facing / secrets / outbound → minta approval owner.
- Scan pra-deploy (`sovereign-zero-trust`): cek kebocoran secret, least-privilege.

---

## 10. SOP verifikasi (DoD)

Sebelum tandai "selesai" → `sovereign-verify-rubric`:
- [ ] semua entry URI 200/expected
- [ ] checkout → paymentUrl prod
- [ ] webhook → paid + license + ledger
- [ ] README & SSOT diperbarui
- [ ] commit & push hijau

---

## 11. Failure modes cepat

| Gejala | Fix |
|---|---|
| basic command gagal/freeze | `ResetSandbox` |
| port 3000 sibuk | `fuser -k 3000/tcp` |
| deploy auth gagal | `setup_cloudflare_api_key`; cek Deploy panel |
| push gagal auth | `setup_github_environment`; cek #github tab |
| build error | cek `vite.config.ts`, dependency, `rm -rf .wrangler && build` |
