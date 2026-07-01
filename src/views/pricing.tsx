// /pricing — tangga harga ringkas untuk cold visitor (1 pintu masuk ke /checkout).
// Truth-Lock: harga & tier dibaca langsung dari OFFERS (sumber kanonik B5-03) — tidak
// meng-hardcode angka baru. Menutup gap CT-3.
import { OFFERS, OFFER_TIERS, type OfferTier } from '../data/offers'

function billingSuffix(billing: string): string {
  if (billing === 'per-bulan') return '/bln'
  return ''
}

export function PricingPage() {
  return (
    <main class="max-w-6xl mx-auto px-4 py-14">
      <section id="pricing-hero" class="text-center max-w-2xl mx-auto">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-5">
          <i class="fas fa-tags"></i> Harga transparan
        </div>
        <h1 class="text-3xl md:text-4xl font-bold tracking-tight">Bayar outcome, bukan proses</h1>
        <p class="text-slate-300 mt-4">
          Pilih hasil yang Anda butuhkan. Semua pembayaran aman via QRIS/VA — diproses Oasis BI Pro
          (Merchant-of-Record) di rel Duitku terdaftar Bank Indonesia.
        </p>
      </section>

      {OFFER_TIERS.map((tierDef) => {
        const items = OFFERS.filter((o) => o.tier === (tierDef.id as OfferTier))
        if (items.length === 0) return null
        return (
          <section id={`tier-${tierDef.id}`} class="mt-12">
            <div class="flex items-baseline justify-between mb-4">
              <h2 class="text-xl font-bold">{tierDef.label}</h2>
              <span class="text-xs text-slate-500">{tierDef.role}</span>
            </div>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((o) => (
                <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col">
                  <div class="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
                    <i class={`fas ${o.icon}`}></i>
                  </div>
                  <h3 class="font-semibold">{o.name}</h3>
                  <p class="text-sm text-slate-400 mt-1 flex-1">{o.promise}</p>
                  <div class="mt-4 text-amber-300 font-bold text-lg">
                    {o.priceLabel}<span class="text-sm font-medium text-slate-400">{billingSuffix(o.billing)}</span>
                  </div>
                  <a
                    href={`/checkout?offer=${o.slug}${o.checkout === 'intake' ? '&mode=intake' : ''}`}
                    class="mt-3 text-center px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition"
                  >
                    {o.checkout === 'intake' ? 'Ajukan / Konsultasi' : 'Pilih outcome ini'}
                  </a>
                </div>
              ))}
            </div>
          </section>
        )
      })}

      <section class="mt-14 max-w-2xl mx-auto text-center">
        <div class="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <p class="text-sm text-slate-400">
            Belum yakin yang mana? Lihat <a href="/foundry" class="text-amber-300 hover:text-amber-200">katalog lengkap</a>{' '}
            atau baca <a href="/about" class="text-amber-300 hover:text-amber-200">cara kami bekerja</a>.
          </p>
        </div>
      </section>
    </main>
  )
}
