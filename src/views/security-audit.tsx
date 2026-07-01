// /security-audit — R6-4 "Sovereign AgentShield" landing + intake (Done-for-You).
// Spec: docs/ssot/standards/R6-4-AGENTSHIELD-SKU-SPEC.md
//
// Truth-Lock (spec §6): JANGAN klaim "100% aman". Keamanan = reduksi risiko.
// Copy pakai "lulus audit baseline", bukan jaminan hukum. Pricing = custom (HITL owner),
// dibaca dari OFFERS (offer `agentshield-audit`, priceIdr: null) — tidak hardcode angka.
// Metodologi ditulis ulang sendiri (konteks SAF); tidak meniru kode/branding ECC.
//
// Intake form → POST /api/leads (tabel `leads`, migration 0003) — TANPA payment/Duitku.
import { getOffer } from '../data/offers'

const SURFACES = [
  { id: 'whatsapp', label: 'WhatsApp bot', icon: 'fa-whatsapp' },
  { id: 'email', label: 'Email / inbox agent', icon: 'fa-envelope' },
  { id: 'pdf', label: 'PDF / upload dokumen', icon: 'fa-file-pdf' },
  { id: 'mcp', label: 'MCP / tool-calling', icon: 'fa-plug' },
  { id: 'webhook', label: 'Webhook / PR / issue', icon: 'fa-code-branch' },
  { id: 'other', label: 'Lainnya', icon: 'fa-ellipsis' }
]

const METHOD = [
  {
    n: '01', icon: 'fa-diagram-project', title: 'Petakan surface',
    body: 'Inventaris titik masuk agent Anda: WhatsApp, email, PDF/upload, MCP/tool, webhook/PR/issue.'
  },
  {
    n: '02', icon: 'fa-list-check', title: 'Checklist OWASP MCP Top 10',
    body: '+ 5 aturan prompt-defense (identitas, secret, untrusted input, penyamaran, lethal-trifecta).'
  },
  {
    n: '03', icon: 'fa-vial', title: 'Uji injeksi terkontrol',
    body: 'Sample payload jahat yang aman dijalankan → catat mana yang lolos & dampaknya.'
  },
  {
    n: '04', icon: 'fa-user-shield', title: 'Rekomendasi gate HITL',
    body: 'Perbaikan least-privilege token + gate human-in-the-loop per surface berisiko.'
  },
  {
    n: '05', icon: 'fa-file-shield', title: 'Laporan outcome',
    body: 'Verdict PASS / FAIL baseline + daftar tindakan prioritas — dalam bahasa yang bisa dieksekusi.'
  }
]

export function SecurityAuditPage() {
  const offer = getOffer('agentshield-audit')
  const priceLabel = offer?.priceLabel ?? 'custom (tunggu pricing)'

  return (
    <main class="max-w-5xl mx-auto px-4 py-14">
      {/* Hero */}
      <section id="agentshield-hero" class="text-center max-w-2xl mx-auto">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-5">
          <i class="fas fa-shield-halved"></i> Sovereign AgentShield · R6-4
        </div>
        <h1 class="text-3xl md:text-4xl font-bold tracking-tight">
          Agent Anda aman dari <span class="text-amber-300">prompt-injection?</span>
        </h1>
        <p class="text-slate-300 mt-4">
          Audit done-for-you untuk agent WhatsApp / email / PDF / MCP Anda. Kami petakan surface,
          uji injeksi terkontrol, dan beri laporan outcome dengan tindakan prioritas —
          supaya bot Anda <strong class="text-slate-100">lulus audit baseline</strong>.
        </p>
        <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a href="#intake" class="px-5 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition">
            <i class="fas fa-clipboard-check mr-2"></i>Minta Audit
          </a>
          <span class="text-sm text-slate-400">Harga: <strong class="text-amber-300">{priceLabel}</strong> · scope disepakati via intake (HITL)</span>
        </div>
      </section>

      {/* Truth-Lock honesty banner (spec §6) */}
      <section class="mt-10 max-w-3xl mx-auto">
        <div class="bg-slate-900/60 border border-amber-500/20 rounded-2xl p-5 text-sm text-slate-300 flex gap-3">
          <i class="fas fa-circle-info text-amber-400 mt-0.5"></i>
          <p>
            <strong class="text-slate-100">Jujur soal keamanan:</strong> tidak ada yang "100% aman".
            Keamanan = <em>reduksi risiko</em>. Kami menargetkan <strong>lulus audit baseline</strong>
            (OWASP MCP Top 10 + prompt-defense), bukan jaminan hukum. Klaim kepatuhan spesifik butuh
            review legal terpisah.
          </p>
        </div>
      </section>

      {/* Methodology (spec §3) */}
      <section id="metodologi" class="mt-16">
        <h2 class="text-xl font-bold text-center">Metodologi audit</h2>
        <p class="text-center text-slate-400 text-sm mt-2">Berbasis sovereign zero-trust + lethal-trifecta defense.</p>
        <ol class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 list-none">
          {METHOD.map((m) => (
            <li class="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <div class="flex items-center gap-3 mb-2">
                <span class="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <i class={`fas ${m.icon}`}></i>
                </span>
                <span class="text-xs font-mono text-slate-500">{m.n}</span>
              </div>
              <h3 class="font-semibold">{m.title}</h3>
              <p class="text-sm text-slate-400 mt-1">{m.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Tiers (spec §2 — pricing custom / HITL) */}
      <section id="paket" class="mt-16">
        <h2 class="text-xl font-bold text-center">Paket</h2>
        <p class="text-center text-slate-400 text-sm mt-2">Harga final &amp; scope ditentukan via intake + disetujui owner (HITL).</p>
        <div class="grid sm:grid-cols-3 gap-4 mt-8">
          {[
            { name: 'Audit Kilat', body: 'Audit 1 surface (mis. WA bot) + laporan ringkas.', tag: 'custom' },
            { name: 'AgentShield Pro', body: 'Audit multi-surface + checklist OWASP MCP + rekomendasi gate HITL.', tag: 'custom' },
            { name: 'Retainer', body: 'Review berkala + monitoring surface baru.', tag: 'custom' }
          ].map((t) => (
            <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col">
              <h3 class="font-semibold">{t.name}</h3>
              <p class="text-sm text-slate-400 mt-1 flex-1">{t.body}</p>
              <div class="mt-4 text-amber-300 font-bold">{t.tag}</div>
              <a href="#intake" class="mt-3 text-center px-4 py-2 rounded-xl bg-slate-800 text-amber-300 font-semibold text-sm hover:bg-slate-700 transition">Pilih &amp; ajukan</a>
            </div>
          ))}
        </div>
      </section>

      {/* Intake form → POST /api/leads */}
      <section id="intake" class="mt-16 max-w-xl mx-auto">
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8">
          <h2 class="text-xl font-bold">Minta audit</h2>
          <p class="text-sm text-slate-400 mt-1 mb-6">
            Isi form — tim kami hubungi untuk sepakati scope &amp; harga. Tidak ada pembayaran di langkah ini.
          </p>
          <form id="audit-intake-form" class="space-y-4">
            <div>
              <label class="block text-sm text-slate-400 mb-1" for="lead_name">Nama</label>
              <input id="lead_name" name="name" required class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2" placeholder="Nama Anda" />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-slate-400 mb-1" for="lead_contact">Email / No. WA</label>
                <input id="lead_contact" name="contact" required class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2" placeholder="email atau 08xx" />
              </div>
              <div>
                <label class="block text-sm text-slate-400 mb-1" for="lead_company">Perusahaan (opsional)</label>
                <input id="lead_company" name="company" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2" placeholder="Nama usaha" />
              </div>
            </div>
            <fieldset>
              <legend class="block text-sm text-slate-400 mb-2">Surface agent yang dipakai</legend>
              <div class="grid grid-cols-2 gap-2">
                {SURFACES.map((s) => (
                  <label class="flex items-center gap-2 text-sm bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 cursor-pointer hover:border-amber-500/40">
                    <input type="checkbox" name="surface" value={s.id} class="accent-amber-500" />
                    <i class={`fa-solid ${s.icon} text-slate-500`}></i>
                    <span>{s.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div>
              <label class="block text-sm text-slate-400 mb-1" for="lead_message">Ceritakan singkat (opsional)</label>
              <textarea id="lead_message" name="message" rows={3} class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2" placeholder="Agent Anda dipakai untuk apa, kekhawatiran utama, dsb."></textarea>
            </div>
            <button type="submit" id="lead-submit" class="w-full py-3 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition">
              <i class="fas fa-paper-plane mr-2"></i>Kirim permintaan audit
            </button>
          </form>
          <div id="lead-result" class="mt-4 text-sm" role="status" aria-live="polite"></div>
          <p class="mt-6 text-xs text-slate-500 border-t border-slate-800 pt-4">
            Data Anda hanya dipakai untuk menindaklanjuti permintaan audit. Lihat{' '}
            <a href="/legal" class="text-amber-300 hover:text-amber-200">Ketentuan &amp; Privasi</a>.
          </p>
        </div>
      </section>

      <script src="/static/agentshield-intake.js"></script>
    </main>
  )
}
