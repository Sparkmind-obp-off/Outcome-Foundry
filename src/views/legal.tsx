// /legal — Ketentuan Layanan + Kebijakan Refund + Privasi (UU PDP). SSR.
// Truth-Lock: bahasa hati-hati, tidak mengklaim janji hukum di luar kapasitas;
// detail final = HITL owner. Halaman ini menutup gap trust/legal (CT-2).
export function LegalPage() {
  const updated = '1 Juli 2026'
  return (
    <main class="max-w-3xl mx-auto px-4 py-14">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-5">
        <i class="fas fa-scale-balanced"></i> Ketentuan &amp; Kebijakan
      </div>
      <h1 class="text-3xl md:text-4xl font-bold tracking-tight">Ketentuan Layanan &amp; Privasi</h1>
      <p class="text-xs text-slate-500 mt-2">Terakhir diperbarui: {updated}</p>

      <nav class="mt-6 flex flex-wrap gap-2 text-sm" aria-label="Navigasi legal">
        <a href="#terms" class="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-300">Ketentuan Layanan</a>
        <a href="#refund" class="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-300">Kebijakan Refund</a>
        <a href="#privacy" class="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-300">Privasi (UU PDP)</a>
      </nav>

      <section id="terms" class="mt-10 space-y-3 text-sm text-slate-300 leading-relaxed">
        <h2 class="text-xl font-bold text-slate-100">1. Ketentuan Layanan</h2>
        <p>
          Outcome Foundry (sub-brand SparkMind X) menyediakan pembuatan aplikasi &amp; otomasi berbasis
          outcome untuk UMKM. Dengan melakukan pembelian, Anda menyetujui bahwa yang disepakati adalah
          <strong class="text-slate-100"> hasil (outcome)</strong> sesuai deskripsi produk pada saat checkout.
        </p>
        <p>
          Ruang lingkup, waktu pengerjaan, dan hasil akhir mengikuti deskripsi produk. Perubahan di luar
          ruang lingkup dapat dikenakan biaya tambahan yang disepakati terlebih dahulu.
        </p>
        <p>
          Pembayaran diproses oleh <strong class="text-slate-100">Oasis BI Pro</strong> sebagai
          Merchant-of-Record di rel Duitku (terdaftar Bank Indonesia).
        </p>
      </section>

      <section id="refund" class="mt-10 space-y-3 text-sm text-slate-300 leading-relaxed">
        <h2 class="text-xl font-bold text-slate-100">2. Kebijakan Refund</h2>
        <p>
          Karena produk kami berbasis <strong class="text-slate-100">outcome</strong>, refund
          dipertimbangkan bila outcome yang dijanjikan tidak dapat kami sampaikan sesuai deskripsi produk.
        </p>
        <ul class="list-disc pl-5 space-y-1">
          <li>Permintaan refund diajukan melalui kontak resmi dengan bukti transaksi.</li>
          <li>Produk edukasi/digital yang sudah diakses penuh umumnya tidak dapat direfund.</li>
          <li>Untuk langganan (MRR), pembatalan berlaku pada siklus penagihan berikutnya.</li>
          <li>Proses refund yang disetujui difasilitasi oleh Merchant-of-Record (Oasis BI Pro).</li>
        </ul>
      </section>

      <section id="privacy" class="mt-10 space-y-3 text-sm text-slate-300 leading-relaxed">
        <h2 class="text-xl font-bold text-slate-100">3. Kebijakan Privasi (UU PDP)</h2>
        <p>
          Kami memproses data pribadi sesuai <strong class="text-slate-100">UU Perlindungan Data Pribadi
          (UU PDP) Indonesia</strong>. Data yang dikumpulkan terbatas pada yang diperlukan untuk
          memproses pembelian &amp; menyampaikan outcome (mis. nama, kontak, detail pesanan).
        </p>
        <ul class="list-disc pl-5 space-y-1">
          <li>Data pembayaran diproses oleh Merchant-of-Record &amp; PJP (Duitku); kami tidak menyimpan detail kartu/rekening.</li>
          <li>Data tidak dijual ke pihak ketiga.</li>
          <li>Anda dapat meminta akses, koreksi, atau penghapusan data melalui kontak resmi.</li>
          <li>Keamanan: prinsip zero-trust &amp; enkripsi in-transit pada infrastruktur edge Cloudflare.</li>
        </ul>
        <p class="text-xs text-slate-500">
          Dokumen ringkas ini bukan nasihat hukum. Ketentuan final &amp; kontak resmi ditetapkan oleh
          pemilik brand.
        </p>
      </section>

      <div class="mt-10">
        <a href="/about" class="text-sm text-amber-300 hover:text-amber-200">← Tentang Outcome Foundry &amp; cara pembayaran</a>
      </div>
    </main>
  )
}
