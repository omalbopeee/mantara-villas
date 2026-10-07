(() => {
  'use strict';
  const config = window.VILLA_CONFIG || {};
  const name = config.name || 'Mantara Villas';
  document.title = `${name} · Tapx`;
  if (name !== 'Mantara Villas') document.getElementById('villa-name').textContent = name;
  function setLogo(id, url, alt) {
    if (!url) return;
    const image = new Image();
    image.alt = alt;
    image.onload = () => document.getElementById(id).replaceChildren(image);
    image.src = url;
  }
  setLogo('villa-logo', config.villaLogo, `${name} logo`);
  setLogo('tapx-logo', config.tapxLogo, 'Tapx logo');
  const toast = document.getElementById('toast');
  let toastTimer;
  function notify(message) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('visible');
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 5500);
  }
  function go(url) {
    try {
      const target = new URL(url);
      if (target.protocol !== 'https:') throw new Error('Invalid link');
      window.open(target.href, '_blank', 'noopener,noreferrer');
    } catch { notify('This link is unavailable. Please ask reception for help.'); }
  }
  function whatsapp(number, message, missing) {
    const digits = String(number || '').replace(/\D/g, '');
    if (digits.length < 8 || digits.length > 15) return notify(missing);
    go(`https://wa.me/${digits}?text=${encodeURIComponent(message)}`);
  }
  const dialog = document.getElementById('wifi-dialog');
  const wifi = config.wifi || {};
  document.getElementById('wifi-name').textContent = wifi.name || 'Ask reception';
  document.getElementById('wifi-password').textContent = wifi.password || 'Ask reception';
  if (!wifi.name) document.getElementById('wifi-description').textContent = 'Please ask reception for the Wi-Fi network and password.';
  const copyButton = document.getElementById('copy-password');
  copyButton.disabled = !wifi.password;
  copyButton.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(wifi.password); notify('Password copied. Open your Wi-Fi settings to connect.'); }
    catch { notify('Select and copy the password above, then open your Wi-Fi settings.'); }
  });
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  function saveContact() {
    if (!config.phone) return notify('The villa contact will be available soon. Please ask reception.');
    const escape = value => String(value || '').replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,');
    const lines = ['BEGIN:VCARD', 'VERSION:3.0', `FN:${escape(name)}`, `ORG:${escape(name)}`, `TEL;TYPE=WORK,VOICE:${escape(config.phone)}`];
    if (config.email) lines.push(`EMAIL;TYPE=WORK:${escape(config.email)}`);
    if (config.address) lines.push(`ADR;TYPE=WORK:;;${escape(config.address)};;;;`);
    lines.push('END:VCARD');
    const url = URL.createObjectURL(new Blob([lines.join('\r\n') + '\r\n'], {type:'text/vcard;charset=utf-8'}));
    const link = document.createElement('a');
    link.href = url; link.download = `${name.replace(/[^a-z0-9-]/gi, '-')}.vcf`;
    document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
    notify('Contact downloaded. Open it to add the villa to your contacts.');
  }
  document.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => {
    switch (button.dataset.action) {
      case 'wifi': dialog.showModal(); break;
      case 'contact': saveContact(); break;
      case 'review': config.reviewUrl ? go(config.reviewUrl) : notify('The Google review link will be available soon. Please ask reception.'); break;
      case 'whatsapp': whatsapp(config.whatsapp, `Hello ${name}, I’d like some help with my stay.`, 'The villa WhatsApp number will be available soon. Please ask reception.'); break;
      case 'tapx': whatsapp(config.tapxWhatsapp, 'Hello Tapx, I’d like to learn more about your digital guest pages.', 'Tapx’s WhatsApp contact will be available soon.'); break;
    }
  }));
})();
