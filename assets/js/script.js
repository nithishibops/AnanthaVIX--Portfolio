(function(){
  'use strict';

  var BUSINESS_EMAIL = 'nithish.ibops@gmail.com';
  var MEMORA_EMAIL = 'memoraapp.support@gmail.com';

  document.addEventListener('DOMContentLoaded', function(){
    initLoader();
    initNav();
    initReveal();
    initChat();
    initShaderFX();
    initTiltCards();
    initGSAPStory();
    initScrollFx();
  });


  /* ---------------- lightweight opening loader ---------------- */
  function initLoader(){
    var loader=document.getElementById('site-loader');
    var bar=document.getElementById('loader-bar');
    var percent=document.getElementById('loader-percent');
    if(!loader) return;

    var start=performance.now();
    var pageLoaded=document.readyState==='complete';
    var done=false;
    window.addEventListener('load',function(){pageLoaded=true;},{once:true});

    function finish(){
      if(done) return;
      done=true;
      if(bar) bar.style.width='100%';
      if(percent) percent.textContent='[100%]';
      setTimeout(function(){loader.classList.add('is-hidden');},160);
      setTimeout(function(){if(loader&&loader.parentNode) loader.parentNode.removeChild(loader);},620);
    }

    function tick(now){
      var elapsed=now-start;
      var progress=Math.min(92,Math.round((elapsed/900)*92));
      if(pageLoaded && elapsed>520) progress=Math.max(progress,96);
      if(bar) bar.style.width=progress+'%';
      if(percent) percent.textContent='['+progress+'%]';
      if((pageLoaded && elapsed>680) || elapsed>1500){finish();return;}
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

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
    var routeField = document.getElementById('chat-route');
    var quickButtons = document.querySelectorAll('.chat-quick button');
    var openTriggers = document.querySelectorAll('.js-open-chat');

    if (!panel) return;

    function openChat(topic, route){
      panel.classList.add('is-open');
      panel.setAttribute('aria-hidden', 'false');
      if (launcher) launcher.setAttribute('aria-expanded', 'true');
      if (routeField && route) routeField.value = route;
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
        openChat(btn.dataset.chatTopic || null, btn.dataset.chatRoute || 'business');
      });
    });

    quickButtons.forEach(function(btn){
      btn.addEventListener('click', function(){
        var topic = btn.dataset.chatTopic;
        if (routeField && btn.dataset.chatRoute) routeField.value = btn.dataset.chatRoute;
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
        var route = routeField ? routeField.value : 'business';
        var destination = route === 'memora' ? MEMORA_EMAIL : BUSINESS_EMAIL;
        var subject = route === 'memora' ? 'Memora App Support' : 'Ananthavix Website Enquiry';
        if(name) subject += ' — ' + name;

        var lines = [];
        lines.push('Name: ' + (name || 'Website visitor'));
        if (contact) lines.push('Visitor email: ' + contact);
        lines.push('Enquiry type: ' + (route === 'memora' ? 'Memora app support' : 'Business / analytics / automation'));
        lines.push('');
        lines.push(message);
        lines.push('');
        lines.push('Submitted from: ' + window.location.href);

        var url = 'mailto:' + destination + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
        window.location.href = url;
      });
    }
  }


  /* ---------------- cinematic 3D canvas ---------------- */
  function initCinematic3D(){
    var canvas = document.getElementById('av-3d-canvas');
    var hero = document.querySelector('.hero');
    if (!canvas || !hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 1.8);
    var width = 0, height = 0, cx = 0, cy = 0;
    var pointer = {x:0,y:0,tx:0,ty:0};
    var stars = [];
    var towers = [];
    var raf = 0;

    function rand(min,max){ return min + Math.random()*(max-min); }

    function resize(){
      var rect = hero.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      cx = width * .5;
      cy = height * .43;
      canvas.width = Math.floor(width*dpr);
      canvas.height = Math.floor(height*dpr);
      canvas.style.width = width+'px';
      canvas.style.height = height+'px';
      ctx.setTransform(dpr,0,0,dpr,0,0);
      stars = [];
      var starCount = Math.max(70, Math.min(170, Math.round(width/8)));
      for (var i=0;i<starCount;i++){
        stars.push({x:rand(-width,width),y:rand(-height,height),z:rand(150,1200),r:rand(.4,1.6),p:rand(0,Math.PI*2)});
      }
      towers = [];
      var count = Math.max(14, Math.min(30, Math.floor(width/55)));
      for (var j=0;j<count;j++){
        var x = (j/(count-1))*width;
        towers.push({
          x:x,
          w:rand(18,54),
          h:rand(height*.10,height*.34),
          depth:rand(.2,1),
          lights:Math.floor(rand(3,8))
        });
      }
    }

    function project(s){
      var scale = 620 / s.z;
      return {x:cx + (s.x + pointer.x*55)*scale, y:cy + (s.y + pointer.y*36)*scale, scale:scale};
    }

    function drawBackground(){
      var g = ctx.createLinearGradient(0,0,0,height);
      g.addColorStop(0,'#020711');
      g.addColorStop(.5,'#061529');
      g.addColorStop(1,'#020713');
      ctx.fillStyle=g;ctx.fillRect(0,0,width,height);

      var glow = ctx.createRadialGradient(width*.69,height*.33,0,width*.69,height*.33,width*.48);
      glow.addColorStop(0,'rgba(41,172,232,.16)');
      glow.addColorStop(.45,'rgba(39,111,190,.06)');
      glow.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=glow;ctx.fillRect(0,0,width,height);
    }

    function drawStars(time){
      for(var i=0;i<stars.length;i++){
        var s=stars[i];
        s.z -= .45;
        if(s.z < 120){ s.z=1200; s.x=rand(-width,width); s.y=rand(-height,height); }
        var p=project(s);
        if(p.x<-20||p.x>width+20||p.y<-20||p.y>height+20) continue;
        var tw=.55+.45*Math.sin(time*.001+s.p);
        ctx.beginPath();ctx.arc(p.x,p.y,Math.max(.4,s.r*p.scale*2.2),0,Math.PI*2);
        ctx.fillStyle='rgba(149,226,255,'+(0.12+tw*.5)+')';ctx.fill();
      }
    }

    function drawSkyline(time){
      var base = height*.84;
      ctx.save();
      ctx.translate(pointer.x*-14, pointer.y*-6);
      for(var i=0;i<towers.length;i++){
        var t=towers[i];
        var wobble=Math.sin(time*.0003+i)*1.6;
        var x=t.x+wobble;
        var y=base-t.h;
        var grad=ctx.createLinearGradient(x,y,x,base);
        grad.addColorStop(0,'rgba(20,58,93,'+(0.28+t.depth*.18)+')');
        grad.addColorStop(1,'rgba(4,16,31,.92)');
        ctx.fillStyle=grad;
        ctx.fillRect(x-t.w/2,y,t.w,t.h);
        ctx.strokeStyle='rgba(89,216,255,'+(0.05+t.depth*.08)+')';
        ctx.strokeRect(x-t.w/2+.5,y+.5,t.w-1,t.h-1);
        for(var r=0;r<t.lights;r++){
          var ly=y+12+r*(t.h/(t.lights+1));
          ctx.fillStyle=(r%3===0)?'rgba(244,197,91,.34)':'rgba(95,207,255,.22)';
          ctx.fillRect(x-t.w*.28,ly,2.3,1.2);
          if(t.w>28) ctx.fillRect(x+t.w*.16,ly+4,2.3,1.2);
        }
      }
      // horizon light
      var hg=ctx.createLinearGradient(0,base-2,width,base+2);
      hg.addColorStop(0,'rgba(88,221,255,0)');hg.addColorStop(.5,'rgba(88,221,255,.3)');hg.addColorStop(1,'rgba(243,197,91,0)');
      ctx.fillStyle=hg;ctx.fillRect(0,base-1,width,2);
      ctx.restore();
    }

    function drawConnections(time){
      var nodes=[
        {x:width*.58,y:height*.26},{x:width*.72,y:height*.22},{x:width*.82,y:height*.38},
        {x:width*.65,y:height*.49},{x:width*.88,y:height*.55},{x:width*.53,y:height*.58}
      ];
      ctx.save();
      ctx.translate(pointer.x*-18,pointer.y*-10);
      for(var i=0;i<nodes.length;i++){
        for(var j=i+1;j<nodes.length;j++){
          if((i+j)%2!==0) continue;
          var a=nodes[i],b=nodes[j];
          ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);
          ctx.strokeStyle='rgba(88,221,255,.055)';ctx.lineWidth=1;ctx.stroke();
        }
        var pulse=2.2+1.6*Math.sin(time*.002+i);
        ctx.beginPath();ctx.arc(nodes[i].x,nodes[i].y,pulse,0,Math.PI*2);
        ctx.fillStyle=i%3===0?'rgba(243,197,91,.62)':'rgba(88,221,255,.5)';ctx.fill();
      }
      ctx.restore();
    }

    function frame(time){
      pointer.x += (pointer.tx-pointer.x)*.045;
      pointer.y += (pointer.ty-pointer.y)*.045;
      drawBackground();drawStars(time);drawSkyline(time);drawConnections(time);
      raf=requestAnimationFrame(frame);
    }

    hero.addEventListener('pointermove',function(e){
      var r=hero.getBoundingClientRect();
      pointer.tx=(e.clientX-r.left)/r.width-.5;
      pointer.ty=(e.clientY-r.top)/r.height-.5;
    });
    hero.addEventListener('pointerleave',function(){pointer.tx=0;pointer.ty=0;});
    window.addEventListener('resize',resize,{passive:true});
    resize();
    raf=requestAnimationFrame(frame);

    document.addEventListener('visibilitychange',function(){
      if(document.hidden && raf){cancelAnimationFrame(raf);raf=0;}
      else if(!document.hidden && !raf){raf=requestAnimationFrame(frame);}
    });
  }

  /* ---------------- card perspective / mouse light ---------------- */
  function initTiltCards(){
    if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    var cards = document.querySelectorAll('.tilt-card');
    cards.forEach(function(card){
      card.addEventListener('pointermove',function(e){
        var r=card.getBoundingClientRect();
        var px=(e.clientX-r.left)/r.width;
        var py=(e.clientY-r.top)/r.height;
        var rx=(.5-py)*5.2;
        var ry=(px-.5)*7;
        card.style.setProperty('--mx',(px*100)+'%');
        card.style.setProperty('--my',(py*100)+'%');
        card.style.transform='perspective(900px) rotateX('+rx+'deg) rotateY('+ry+'deg) translateY(-4px) translateZ(10px)';
      });
      card.addEventListener('pointerleave',function(){
        card.style.transform='';
        card.style.removeProperty('--mx');
        card.style.removeProperty('--my');
      });
    });
  }

  /* ---------------- scroll/cursor cinematic FX ---------------- */
  function initScrollFx(){
    var header=document.querySelector('.site-header');
    var progress=document.querySelector('.scroll-progress span');
    var glow=document.querySelector('.cursor-glow');
    var visual=document.querySelector('.hero-visual');
    var copy=document.querySelector('.hero-copy');
    var ticking=false;

    function update(){
      var y=window.scrollY||0;
      if(header) header.classList.toggle('is-scrolled',y>28);
      if(progress){
        var max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
        progress.style.width=Math.min(100,(y/max)*100)+'%';
      }
      var gsapMode=document.documentElement.classList.contains('gsap-ready');
      if(!gsapMode && visual && y < window.innerHeight*1.1){
        visual.style.transform='translate3d(0,'+(y*.055)+'px,0) rotateX('+(Math.min(3,y*.002))+'deg)';
      }
      if(!gsapMode && copy && y < window.innerHeight){copy.style.transform='translate3d(0,'+(y*.025)+'px,0)';}
      ticking=false;
    }
    function onScroll(){ if(!ticking){requestAnimationFrame(update);ticking=true;} }
    window.addEventListener('scroll',onScroll,{passive:true});
    update();

    if(glow && window.matchMedia('(hover:hover) and (pointer:fine)').matches){
      window.addEventListener('pointermove',function(e){
        glow.animate({left:e.clientX+'px',top:e.clientY+'px'},{duration:650,fill:'forwards',easing:'ease-out'});
      },{passive:true});
    }
  }


  /* ---------------- lightweight GLSL shader overlay ---------------- */
  function initShaderFX(){
    var canvas=document.getElementById('av-shader-canvas');
    var hero=document.querySelector('.hero');
    var desktop=window.matchMedia('(min-width: 1100px) and (hover:hover) and (pointer:fine)').matches;
    if(!canvas || !hero || !desktop || window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      if(canvas) canvas.style.display='none';
      return;
    }

    var gl=canvas.getContext('webgl',{alpha:true,antialias:false,premultipliedAlpha:false,preserveDrawingBuffer:false});
    if(!gl){ canvas.style.display='none'; return; }

    var vertexSource='attribute vec2 a_position;void main(){gl_Position=vec4(a_position,0.0,1.0);}';
    var fragmentSource=[
      'precision mediump float;',
      'uniform vec2 u_resolution;',
      'uniform vec2 u_mouse;',
      'uniform float u_time;',
      'float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
      'float noise(vec2 p){vec2 i=floor(p);vec2 f=fract(p);f=f*f*(3.0-2.0*f);float a=hash(i);float b=hash(i+vec2(1.,0.));float c=hash(i+vec2(0.,1.));float d=hash(i+vec2(1.,1.));return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}',
      'float fbm(vec2 p){float v=0.;float a=.5;for(int i=0;i<3;i++){v+=a*noise(p);p=p*2.02+vec2(11.7,7.3);a*=.5;}return v;}',
      'void main(){vec2 uv=gl_FragCoord.xy/u_resolution.xy;vec2 p=uv-.5;p.x*=u_resolution.x/u_resolution.y;vec2 m=(u_mouse-.5)*vec2(1.1,.75);float t=u_time*.09;float n=fbm(p*2.7+vec2(t,-t*.5));float r=sin(length(p-m*.22)*15.0-u_time*.55+n*3.0);r=smoothstep(.78,1.0,r);vec3 cyan=vec3(.04,.58,1.0);vec3 ice=vec3(.26,.9,1.0);vec3 gold=vec3(1.0,.64,.18);vec3 col=mix(cyan,ice,n);col=mix(col,gold,r*.24);float radial=1.0-smoothstep(.15,1.02,length(p));float alpha=(.018+n*.032+r*.046)*radial;gl_FragColor=vec4(col,alpha);}'
    ].join('');

    function compile(type,source){
      var sh=gl.createShader(type);gl.shaderSource(sh,source);gl.compileShader(sh);
      if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS)){gl.deleteShader(sh);return null;}return sh;
    }
    var vs=compile(gl.VERTEX_SHADER,vertexSource), fs=compile(gl.FRAGMENT_SHADER,fragmentSource);
    if(!vs||!fs){canvas.style.display='none';return;}
    var program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS)){canvas.style.display='none';return;}
    gl.useProgram(program);
    var buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
    var pos=gl.getAttribLocation(program,'a_position');gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);
    var uResolution=gl.getUniformLocation(program,'u_resolution');
    var uMouse=gl.getUniformLocation(program,'u_mouse');
    var uTime=gl.getUniformLocation(program,'u_time');
    var mouse={x:.72,y:.34,tx:.72,ty:.34};
    var active=true, visible=true, raf=0, last=0;
    var dpr=Math.min(window.devicePixelRatio||1,1.1);

    function resize(){
      var r=hero.getBoundingClientRect();
      var w=Math.max(1,Math.round(r.width*dpr)),h=Math.max(1,Math.round(r.height*dpr));
      if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h);gl.uniform2f(uResolution,w,h);}
    }
    function render(ms){
      raf=0;
      if(!active||!visible) return;
      if(ms-last<33){raf=requestAnimationFrame(render);return;} // ~30 FPS
      last=ms;
      mouse.x+=(mouse.tx-mouse.x)*.07;mouse.y+=(mouse.ty-mouse.y)*.07;
      gl.uniform2f(uMouse,mouse.x,1-mouse.y);gl.uniform1f(uTime,ms*.001);
      gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.drawArrays(gl.TRIANGLES,0,6);
      raf=requestAnimationFrame(render);
    }
    function start(){if(!raf&&active&&visible)raf=requestAnimationFrame(render);}
    function stop(){if(raf){cancelAnimationFrame(raf);raf=0;}}

    hero.addEventListener('pointermove',function(e){var r=hero.getBoundingClientRect();mouse.tx=(e.clientX-r.left)/r.width;mouse.ty=(e.clientY-r.top)/r.height;},{passive:true});
    hero.addEventListener('pointerleave',function(){mouse.tx=.72;mouse.ty=.34;});
    window.addEventListener('resize',function(){resize();},{passive:true});
    document.addEventListener('visibilitychange',function(){active=!document.hidden;if(active)start();else stop();});
    if('IntersectionObserver' in window){
      new IntersectionObserver(function(entries){visible=entries[0]&&entries[0].isIntersecting;if(visible)start();else stop();},{rootMargin:'120px'}).observe(hero);
    }
    resize();start();
  }

  /* ---------------- lightweight GSAP ScrollTrigger story ---------------- */
  function initGSAPStory(){
    var gsap=window.gsap, ScrollTrigger=window.ScrollTrigger;
    if(!gsap||!ScrollTrigger||window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add('gsap-ready');

    var mm=gsap.matchMedia();
    mm.add('(min-width: 1100px)',function(){
      // Cinematic depth without pinning the page. This keeps normal scrolling responsive.
      gsap.to('.hero-copy',{
        y:-34,opacity:.86,ease:'none',
        scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.55}
      });
      gsap.to('.av-core',{
        y:-24,rotationY:8,scale:.94,ease:'none',
        scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.55}
      });
      gsap.to('.hero-panel',{
        y:-18,ease:'none',
        scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.55}
      });

      var processCards=gsap.utils.toArray('#process .process-card');
      if(processCards.length){
        gsap.from(processCards,{y:28,opacity:0,duration:.55,ease:'power2.out',stagger:.08,
          scrollTrigger:{trigger:'#process .process-grid',start:'top 82%',once:true}});
      }

      gsap.utils.toArray('.depth-section').forEach(function(section){
        var container=section.querySelector(':scope > .container');
        if(container){
          gsap.from(container,{y:30,opacity:.7,duration:.65,ease:'power2.out',
            scrollTrigger:{trigger:section,start:'top 88%',once:true}});
        }
      });

      var staged=['.service-card','.dashboard-case','.outcome-card','.product-showcase','.automation-card','.guidance-card','.knowledge-panels article'];
      staged.forEach(function(selector){
        ScrollTrigger.batch(selector,{
          start:'top 90%',once:true,
          onEnter:function(batch){gsap.fromTo(batch,{y:20,opacity:0},{y:0,opacity:1,duration:.48,ease:'power2.out',stagger:.055,overwrite:true});}
        });
      });
    });

    // Tablet/mobile deliberately use CSS + IntersectionObserver only: smoother, no overlap, no pinning.
    window.addEventListener('load',function(){ScrollTrigger.refresh();},{once:true});
  }

})();
