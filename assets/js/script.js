document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  if (toggle && nav) {
    const closeNav = function () {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
      document.body.classList.remove('nav-open');
    };

    toggle.addEventListener('click', function () {
      const open = !nav.classList.contains('open');
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      document.body.classList.toggle('nav-open', open);
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeNav();
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

    reveals.forEach(function (item) { observer.observe(item); });
  } else {
    reveals.forEach(function (item) { item.classList.add('visible'); });
  }
});

// Ananthavix website enquiry chat -> Nithish WhatsApp
(function () {
  const launcher = document.querySelector('.chat-launcher');
  const chat = document.getElementById('business-chat');
  const closeButton = document.querySelector('.chat-close');
  const openButtons = document.querySelectorAll('.js-open-chat');
  const form = document.getElementById('chat-form');
  const messageField = document.getElementById('chat-message');
  const topicButtons = document.querySelectorAll('[data-chat-topic]');
  const nithishWhatsApp = '971541643097';

  if (!launcher || !chat) return;

  function setOpen(open) {
    chat.classList.toggle('open', open);
    chat.setAttribute('aria-hidden', String(!open));
    launcher.setAttribute('aria-expanded', String(open));
    if (open) {
      window.setTimeout(function () {
        const nameField = document.getElementById('chat-name');
        if (nameField) nameField.focus();
      }, 180);
    }
  }

  launcher.addEventListener('click', function () {
    setOpen(!chat.classList.contains('open'));
  });

  if (closeButton) closeButton.addEventListener('click', function () { setOpen(false); });
  openButtons.forEach(function (button) { button.addEventListener('click', function () { setOpen(true); }); });

  topicButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      topicButtons.forEach(function (item) { item.classList.remove('active'); });
      button.classList.add('active');
      if (messageField) {
        const topic = button.getAttribute('data-chat-topic');
        if (!messageField.value.trim()) messageField.value = 'I would like to discuss ' + topic + '. ';
        messageField.focus();
      }
    });
  });

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const name = (document.getElementById('chat-name').value || '').trim();
      const contact = (document.getElementById('chat-contact').value || '').trim();
      const message = (messageField.value || '').trim();
      if (!name || !message) return;

      const enquiry = [
        'Hello Nithish, I am contacting Ananthavix Solutions from the website.',
        '',
        'Name / Company: ' + name,
        contact ? 'Contact: ' + contact : '',
        'Enquiry: ' + message
      ].filter(Boolean).join('\n');

      const url = 'https://wa.me/' + nithishWhatsApp + '?text=' + encodeURIComponent(enquiry);
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && chat.classList.contains('open')) setOpen(false);
  });
})();


// Dashboard library filters
(function () {
  const filters = document.querySelectorAll('.dash-filter');
  const cards = document.querySelectorAll('.dashboard-card');
  if (!filters.length || !cards.length) return;

  filters.forEach(function (button) {
    button.addEventListener('click', function () {
      const filter = button.getAttribute('data-filter') || 'all';
      filters.forEach(function (item) { item.classList.remove('active'); });
      button.classList.add('active');

      cards.forEach(function (card) {
        const categories = (card.getAttribute('data-category') || '').split(/\s+/);
        card.classList.toggle('filtered-out', !(filter === 'all' || categories.includes(filter)));
      });
    });
  });
})();
