// /about — profil brand + penjelasan Merchant-of-Record (MoR) & kepatuhan.
// SSR page (Truth-Lock: hanya klaim yang selaras kode & SSOT B5/CODEBASE-TRUTH).
export function AboutPage() {
  return (
    <main class="max-w-3xl mx-auto px-4 py-14">
      <section id="about-hero">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-5">
          <i class="fas fa-industry"></i> Tentang Outcome Foundry
        </div>
        <h1 class="text-3xl md:text-4xl font-bold tracking-tight">
          Kami menjual <span class="text-amber-400">hasil</span>, bukan tools.
        </h1>
        <p class="text-slate-300 mt-4 leading-relaxed">
          <strong class="text-white">Outcome Foundry</strong> (sub-brand SparkMind X) adalah pabrik hasil
          bisnis untuk UMKM Indonesia. Masukkan masalah, keluarkan aplikasi/otomasi yang sudah jalan —
          dalam hitungan hari, bukan bulan. Anda membayar <em>outcome</em>, bukan proses.
        </p>
      </section>

      <section id="about-values" class="mt-10 grid sm:grid-cols-2 gap-4">
        {[
          ['fa-bullseye', 'Outcome over output', 'Yang dibeli adalah hasil nyata (mis. "kasir online jalan"), bukan deliverable teknis.'],
          ['fa-bolt', 'Kecepatan', 'Jalan dalam hitungan hari, bukan bulan — pipeline agentik yang terukur.'],
          ['fa-shield-halved', 'Kepatuhan', 'Infrastruktur legal, MoR Oasis BI Pro, rel Duitku terdaftar Bank Indonesia.'],
          ['fa-fingerprint', 'Kedaulatan', 'Sovereign stack, zero-trust, edge Cloudflare — aman & mandiri.']
        ].map(([icon, title, desc]) => (
          <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <i class={`fas ${icon} text-amber-400 mb-2`}></i>
            <h3 class="font-semibold">{title}</h3>
            <p class="text-sm text-slate-400 mt-1">{desc}</p>
          </div>
        ))}
      </section>

      <section id="about-mor" class="mt-10">
        <h2 class="text-xl font-bold mb-3">Bagaimana pembayaran bekerja (Merchant-of-Record)</h2>
        <div class="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3 text-sm text-slate-300">
          <p>
            Pembayaran Anda diproses oleh <strong class="text-slate-100">Oasis BI Pro</strong> sebagai
            <strong class="text-slate-100"> Merchant-of-Record (MoR)</strong> di atas rel PJP
            <strong class="text-slate-100"> Duitku</strong> yang terdaftar di Bank Indonesia.
          </p>
          <p>
            Satu <em>merchant code</em> Duitku melayani semua sub-brand SparkMind. Callback pembayaran
            tunggal di-<em>fan-out</em> berdasarkan prefix <code class="text-amber-300">merchantOrderId</code>
            ke produk yang tepat. MoR bertanggung jawab atas kepatuhan pajak &amp; proses refund.
          </p>
          <p>
            Metode pembayaran: <strong class="text-slate-100">QRIS</strong> dan
            <strong class="text-slate-100"> Virtual Account</strong>, aman dan terverifikasi.
          </p>
        </div>
      </section>

      <section id="about-cta" class="mt-10 flex flex-wrap gap-3">
        <a href="/foundry" class="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition">
          <i class="fas fa-industry mr-2"></i>Lihat Katalog Outcome
        </a>
        <a href="/legal" class="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-200 font-semibold hover:bg-slate-900 transition">
          <i class="fas fa-scale-balanced mr-2"></i>Ketentuan &amp; Kebijakan
        </a>
      </section>
    </main>
  )
}
