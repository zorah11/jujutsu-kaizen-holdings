const body = document.body;
const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const menu = document.querySelector('[data-menu]');

const setMenu = (open) => {
  body.classList.toggle('menu-open', open);
  menuButton?.setAttribute('aria-expanded', String(open));
};

menuButton?.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => event.key === 'Escape' && setMenu(false));

const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
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
  formStatus.hidden = false;
  formStatus.textContent = 'Your enquiry is ready. The company’s public email is awaiting approval, so nothing has been sent. Copy your enquiry below and share it through an approved contact channel.';
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
