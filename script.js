// Hjälpfunktioner
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* Mobilmeny */
const navToggle = $('.nav-toggle');
const nav = $('#primary-nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

/* År i sidfot */
$('#year').textContent = new Date().getFullYear();

/* Modaler för Raser */
$$('.more').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-modal-target');
    const dialog = document.getElementById(id);
    if (dialog?.showModal) dialog.showModal();
  });
});

/* Galleri – enkel lightbox som använder samma bilder (picsum) */
const lightbox = $('#lightbox');
const lightboxImg = $('#lightbox-img');
$$('.gallery-item').forEach((item, idx) => {
  item.addEventListener('click', () => {
    // Använd samma seed som i CSS bakgrunden
    const n = idx + 1;
    lightboxImg.src = `https://picsum.photos/seed/horse${n}/1200/800`;
    if (lightbox?.showModal) lightbox.showModal();
  });
});

/* Newsletter – fejkad validering och feedback */
$('#newsletter')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.email.value.trim();
  const msg = $('#newsletter-msg');
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!valid) {
    msg.textContent = 'Ogiltig e-postadress. Försök igen.';
    msg.style.color = '#f87171';
    return;
  }
  msg.textContent = 'Tack! Du är nu anmäld.';
  msg.style.color = '';
  e.target.reset();
});

/* Kontaktformulär – demo */
$('#contact-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = e.target.name.value.trim();
  const message = e.target.message.value.trim();
  const out = $('#contact-msg');
  if (!name || !message) {
    out.textContent = 'Fyll i både namn och meddelande.';
    out.style.color = '#f87171';
    return;
  }
  out.textContent = `Tack ${name}! Vi återkommer inom kort.`;
  out.style.color = '';
  e.target.reset();
});

/* Quiz */
$('#quiz-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const answers = new FormData(e.target);
  let score = 0;
  ['q1','q2','q3'].forEach(q => { if (answers.get(q) === 'ratt') score++; });
  const res = $('#quiz-result');
  const feedback = [
    'Bra början! Läs igenom skötselavsnittet igen.',
    'Snyggt! Du har koll på det mesta.',
    'Full pott! Du och hästen är ett team 🐴'
  ];
  res.textContent = `${score}/3 rätt – ${feedback[Math.min(score, feedback.length-1)]}`;
});
