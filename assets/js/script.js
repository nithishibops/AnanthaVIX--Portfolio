(function(){
  'use strict';

  var WHATSAPP_NUMBER = '971541643097'; // Nithish — matches "Chat with Nithish" copy

  document.addEventListener('DOMContentLoaded', function(){
    initNav();
    initReveal();
    initChat();
  });

  /* ---------------- mobile nav ---------------- */
  function initNav(){
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function(){
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------- scroll reveal ---------------- */
  function initReveal(){
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)){
      items.forEach(function(el){ el.classList.add('in-view'); });
      return;
    }

    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function(el){ io.observe(el); });
  }

  /* ---------------- chat widget ---------------- */
  function initChat(){
    var launcher = document.querySelector('.chat-launcher');
    var panel = document.getElementById('business-chat');
    var closeBtn = document.querySelector('.chat-close');
    var form = document.getElementById('chat-form');
    var messageField = document.getElementById('chat-message');
    var quickButtons = document.querySelectorAll('.chat-quick button');
    var openTriggers = document.querySelectorAll('.js-open-chat');

    if (!panel) return;

    function openChat(topic){
      panel.classList.add('is-open');
      panel.setAttribute('aria-hidden', 'false');
      if (launcher) launcher.setAttribute('aria-expanded', 'true');
      if (topic && messageField && !messageField.value){
        messageField.value = 'Hi, I need help with ' + topic + '. ';
      }
      var nameField = document.getElementById('chat-name');
      if (nameField) nameField.focus();
    }
    function closeChat(){
      panel.classList.remove('is-open');
      panel.setAttribute('aria-hidden', 'true');
      if (launcher) launcher.setAttribute('aria-expanded', 'false');
    }

    if (launcher){
      launcher.addEventListener('click', function(){
        if (panel.classList.contains('is-open')) closeChat(); else openChat();
      });
    }
    if (closeBtn) closeBtn.addEventListener('click', closeChat);

    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && panel.classList.contains('is-open')) closeChat();
    });

    openTriggers.forEach(function(btn){
      btn.addEventListener('click', function(){
        openChat(btn.dataset.chatTopic || null);
      });
    });

    quickButtons.forEach(function(btn){
      btn.addEventListener('click', function(){
        var topic = btn.dataset.chatTopic;
        if (messageField && topic){
          messageField.value = 'Hi, I need help with ' + topic + '. ';
          messageField.focus();
        }
      });
    });

    if (form){
      form.addEventListener('submit', function(e){
        e.preventDefault();
        var name = document.getElementById('chat-name').value.trim();
        var contact = document.getElementById('chat-contact').value.trim();
        var message = document.getElementById('chat-message').value.trim();

        var lines = [];
        lines.push('Hi, this is ' + (name || 'a website visitor') + '.');
        if (contact) lines.push('Contact: ' + contact);
        lines.push('');
        lines.push(message);

        var text = encodeURIComponent(lines.join('\n'));
        var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + text;
        window.open(url, '_blank', 'noopener');
      });
    }
  }
})();
