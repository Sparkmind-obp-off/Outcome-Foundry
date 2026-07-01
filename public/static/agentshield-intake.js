// AgentShield /security-audit intake — posts lead to /api/leads.
// No payment/Duitku involved; just captures a lead into the `leads` table.
(function () {
  var form = document.getElementById('audit-intake-form');
  var result = document.getElementById('lead-result');
  var btn = document.getElementById('lead-submit');
  if (!form) return;

  function show(msg, ok) {
    result.innerHTML =
      '<div class="rounded-lg px-4 py-3 border ' +
      (ok
        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
        : 'bg-red-500/10 border-red-500/30 text-red-300') +
      '">' + msg + '</div>';
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var name = (document.getElementById('lead_name').value || '').trim();
    var contact = (document.getElementById('lead_contact').value || '').trim();
    if (!name || !contact) {
      show('Nama dan kontak wajib diisi.', false);
      return;
    }
    var surfaces = Array.prototype.slice
      .call(form.querySelectorAll('input[name="surface"]:checked'))
      .map(function (el) { return el.value; });

    var payload = {
      source: 'security-audit',
      name: name,
      contact: contact,
      company: (document.getElementById('lead_company').value || '').trim(),
      surfaces: surfaces,
      message: (document.getElementById('lead_message').value || '').trim()
    };

    btn.disabled = true;
    var prev = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Mengirim...';
    try {
      var r = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      var d = await r.json();
      if (r.ok && d.ok) {
        form.reset();
        show('Terima kasih! Permintaan audit #' + d.id + ' diterima. Tim kami akan menghubungi Anda.', true);
      } else {
        show(d.error || 'Gagal mengirim. Coba lagi.', false);
      }
    } catch (err) {
      show('Kesalahan jaringan. Coba lagi.', false);
    } finally {
      btn.disabled = false;
      btn.innerHTML = prev;
    }
  });
})();
