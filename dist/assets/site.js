const body = document.body;
const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const menu = document.querySelector('[data-menu]');
const pageContent = document.querySelectorAll('main, .site-footer');

const setMenu = (open) => {
  body.classList.toggle('menu-open', open);
  document.documentElement.classList.toggle('menu-open', open);
  menuButton?.setAttribute('aria-expanded', String(open));
  menuButton?.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  pageContent.forEach((element) => { element.inert = open; });
  if (open) {
    header?.classList.remove('is-hidden');
    menu?.querySelector('a')?.focus({ preventScroll: true });
  }
};

menuButton?.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => {
  if (!body.classList.contains('menu-open')) return;
  if (event.key === 'Escape') {
    setMenu(false);
    menuButton?.focus({ preventScroll: true });
  }
  if (event.key === 'Tab') {
    const controls = [...header.querySelectorAll('a, button')].filter((element) => element.getClientRects().length);
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }
});
matchMedia('(max-width: 980px)').addEventListener('change', (event) => {
  if (!event.matches) setMenu(false);
});

let lastScrollY = window.scrollY;
const updateHeader = () => {
  if (!header) return;
  const currentScrollY = window.scrollY;
  header.classList.toggle('is-scrolled', currentScrollY > 24);
  const scrollingDown = currentScrollY > lastScrollY && currentScrollY > 120;
  header.classList.toggle('is-hidden', scrollingDown && !body.classList.contains('menu-open'));
  lastScrollY = currentScrollY;
};
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const revealItems = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const contactForm = document.querySelector('[data-contact-form]');
const formStatus = document.querySelector('[data-form-status]');
const copyButton = document.querySelector('[data-copy-enquiry]');
const getEnquiry = () => {
  const data = new FormData(contactForm);
  return `JUJUTSU KAIZEN HOLDINGS LIMITED — WEBSITE ENQUIRY\n\nName: ${data.get('name') || ''}\nEmail: ${data.get('email') || ''}\nPhone: ${data.get('phone') || 'Not provided'}\nArea of interest: ${data.get('interest') || ''}\n\nMessage:\n${data.get('message') || ''}`;
};

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  const data = new FormData(contactForm);
  const subject = `Website enquiry: ${data.get('interest') || 'General Enquiry'}`;
  window.location.href = `mailto:jujutsukaisenholding@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(getEnquiry())}`;
  formStatus.hidden = false;
  formStatus.textContent = 'Your email application should open with the enquiry ready to send. If it does not, copy the enquiry below.';
  copyButton.hidden = false;
});

copyButton?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(getEnquiry());
    copyButton.textContent = 'Enquiry copied';
  } catch {
    formStatus.textContent = `${formStatus.textContent}\n\n${getEnquiry()}`;
  }
});

document.querySelectorAll('[data-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });
