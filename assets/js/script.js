(function(){
'use strict';
const nav=document.querySelector('.site-nav'),toggle=document.querySelector('.nav-toggle');
if(toggle&&nav){toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false')}));}
const panel=document.getElementById('business-chat'),launcher=document.querySelector('.chat-launcher'),form=document.getElementById('chat-form');
if(!panel)return;
let opener=null;
function open(topic){opener=document.activeElement;panel.hidden=false;panel.setAttribute('aria-hidden','false');launcher.setAttribute('aria-expanded','true');document.querySelectorAll('body > :not(script)').forEach(el=>{if(el!==panel){el.inert=true;}});if(topic)document.getElementById('chat-message').value='Hi, I need help with '+topic+'. ';document.getElementById('chat-name').focus();}
function close(){panel.hidden=true;panel.setAttribute('aria-hidden','true');launcher.setAttribute('aria-expanded','false');document.querySelectorAll('body > [inert]').forEach(el=>el.inert=false);if(opener)opener.focus();}
launcher.addEventListener('click',()=>open());document.querySelector('.chat-close').addEventListener('click',close);
document.querySelectorAll('.js-open-chat').forEach(b=>b.addEventListener('click',()=>open(b.dataset.chatTopic)));
document.querySelectorAll('.chat-quick button').forEach(b=>b.addEventListener('click',()=>{document.getElementById('chat-message').value='Hi, I need help with '+b.dataset.chatTopic+'. ';document.getElementById('chat-message').focus();}));
panel.addEventListener('keydown',e=>{if(e.key==='Escape'){close();return}if(e.key==='Tab'){const f=Array.from(panel.querySelectorAll('button,input,textarea,a[href]')).filter(x=>!x.disabled),first=f[0],last=f[f.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const name=document.getElementById('chat-name').value.trim(),reply=document.getElementById('chat-contact').value.trim(),message=document.getElementById('chat-message').value.trim();if(!name||!message)return;const body='Hello Ananthavix Solutions,\n\n'+message+'\n\nFrom: '+name+(reply?'\nReply to: '+reply:'');window.location.href='mailto:nithish.ibops@gmail.com?subject='+encodeURIComponent('Ananthavix business enquiry')+'&body='+encodeURIComponent(body);document.querySelector('.chat-privacy').textContent='An email draft has been requested. If your email app did not open, email nithish.ibops@gmail.com directly. Your enquiry has not been sent by this website.';});
})();

// Ananthavix cinematic reveal for the updated 3D orbit panel and existing reveal elements.
(function(){
  const items=document.querySelectorAll('.reveal');
  if(!items.length)return;
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.12,rootMargin:'0px 0px -36px'});
  items.forEach(item=>observer.observe(item));
})();
