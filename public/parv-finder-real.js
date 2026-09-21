(function(){
  var s=document.currentScript;
  var HOOK=s&&s.dataset.webhook?s.dataset.webhook:'https://n8n.propwiseai.in/webhook/website%20chatbot';
  var botName='Parv Industries';
  if(document.getElementById('parv-finder-root')) return;

  var SID_KEY='parv_sid_desktop_v6_brand';
  var SESSION_ID=localStorage.getItem(SID_KEY);
  if(!SESSION_ID){ SESSION_ID='parv_desktop_'+Date.now(); localStorage.setItem(SID_KEY, SESSION_ID); }

  var css=document.createElement('style');
  css.textContent=`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Outfit:wght@400;500;600&display=swap');
    #parv-finder-root{position:fixed;inset:0;z-index:9999999;background:#FFFEFB;font-family:'Outfit',sans-serif;display:flex;overflow:hidden}
    #parv-finder-root *{box-sizing:border-box;font-family:'Outfit',sans-serif}
    .pf-sidebar{width:280px;background:#FFFEFB;border-right:1px solid rgba(0,0,0,.07);display:flex;flex-direction:column;flex-shrink:0;transition:all .35s cubic-bezier(.16,1,.3,1)}
    .pf-sidebar.collapsed{width:0;border-right:none;transform:translateX(-100%);opacity:0;overflow:hidden}
    .pf-side-top{padding:18px 16px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(0,0,0,.07);background:#FFFEFB}
    .pf-logo{font-family:'Fraunces',serif;font-weight:700;font-size:18px;color:#8B1E1E;letter-spacing:.02em}
    .pf-logo span{font-weight:400;font-size:12px;color:#6B7280;display:block;letter-spacing:.08em;margin-top:1px}
    .pf-toggle{width:32px;height:32px;border-radius:50%;border:1px solid rgba(0,0,0,.08);background:#F6F3EE;display:grid;place-items:center;cursor:pointer;color:#8B1E1E}
    .pf-new-btn{margin:16px;background:#8B1E1E;color:#FFFEFB;border:none;border-radius:100px;padding:12px 16px;font-weight:600;font-size:13px;cursor:pointer;letter-spacing:.02em;box-shadow:0 4px 14px rgba(139,30,30,.25);transition:.2s}
    .pf-new-btn:hover{background:#6E1717;transform:translateY(-1px)}
    .pf-recent-label{font-size:11px;font-weight:600;color:#9CA3AF;letter-spacing:.1em;padding:16px 16px 8px}
    .pf-recent-item{margin:4px 12px;padding:10px 12px;border-radius:12px;cursor:pointer;border:1px solid transparent;transition:.2s}
    .pf-recent-item.active{background:#F6F3EE;border-color:rgba(139,30,30,.12)}
    .pf-recent-item:hover{background:#FDFBF7}
    .pf-recent-title{font-size:13px;font-weight:600;color:#1F1F1F;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .pf-recent-sub{font-size:11px;color:#6B7280;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .pf-side-bottom{margin-top:auto;padding:12px 16px;border-top:1px solid rgba(0,0,0,.07);display:flex;align-items:center;gap:10px;background:#FFFEFB}
    .pf-avatar{width:32px;height:32px;border-radius:50%;background:#8B1E1E;color:#FFFEFB;display:grid;place-items:center;font-weight:600;font-size:12px;font-family:'Fraunces',serif}
    .pf-main{flex:1;display:flex;flex-direction:column;overflow:hidden;background:#FFFEFB;position:relative}
    .pf-main::before{content:'';position:absolute;inset:0;pointer-events:none;opacity:.4;background-image:linear-gradient(rgba(0,0,0,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.03) 1px,transparent 1px);background-size:28px 28px}
    .pf-topbar{height:64px;background:rgba(255,254,251,.9);backdrop-filter:blur(12px);border-bottom:1px solid rgba(0,0,0,.07);display:flex;align-items:center;gap:12px;padding:0 20px;flex-shrink:0;position:relative;z-index:2}
    .pf-topbar-logo{font-family:'Fraunces',serif;font-weight:700;font-size:20px;color:#8B1E1E;letter-spacing:.02em}
    .pf-topbar-sub{font-size:11px;color:#6B7280;letter-spacing:.04em;margin-top:-2px}
    .pf-hamburger{width:36px;height:36px;border-radius:10px;border:1px solid rgba(0,0,0,.08);background:#F6F3EE;display:grid;place-items:center;cursor:pointer;color:#1F1F1F}
    .pf-hamburger.hidden{display:none}
    .pf-center{flex:1;overflow:auto;display:flex;flex-direction:column;align-items:center;padding:24px 20px;position:relative;z-index:1}
    .pf-kicker{font-size:12px;font-weight:600;letter-spacing:.14em;color:#8B1E1E;text-transform:uppercase;margin-bottom:16px}
    .pf-heading{font-family:'Fraunces',serif;font-size:48px;font-weight:700;line-height:1.05;letter-spacing:-.02em;text-align:center;max-width:640px;color:#1F1F1F;margin-top:8px}
    .pf-heading em{font-style:italic;font-weight:600;color:#8B1E1E}
    .pf-sub{margin-top:16px;font-size:15px;color:#6B7280;text-align:center;max-width:520px;line-height:1.6}
    .pf-search-wrap{width:100%;max-width:680px;background:#fff;border:1px solid rgba(0,0,0,.08);border-radius:100px;padding:6px 6px 6px 20px;display:flex;align-items:center;gap:8px;box-shadow:0 8px 32px rgba(0,0,0,.06);transition:.25s;position:relative;z-index:1}
    .pf-search-wrap:focus-within{border-color:#8B1E1E;box-shadow:0 0 0 4px rgba(139,30,30,.1),0 8px 32px rgba(0,0,0,.06)}
    .pf-icon-btn{width:36px;height:36px;border-radius:50%;background:#F6F3EE;border:1px solid rgba(0,0,0,.06);display:grid;place-items:center;cursor:pointer;color:#6B7280;flex-shrink:0;transition:.2s}
    .pf-icon-btn:hover{background:#fff}
    .pf-input{flex:1;border:none;outline:none;font-size:14px;color:#1F1F1F;background:transparent}
    .pf-input::placeholder{color:#9CA3AF}
    .pf-send{background:#8B1E1E;width:44px;height:44px;border-radius:50%;border:none;color:#FFFEFB;display:grid;place-items:center;cursor:pointer;flex-shrink:0;box-shadow:0 4px 12px rgba(139,30,30,.25);transition:.2s}
    .pf-send:hover{background:#6E1717;transform:scale(1.04)}
    .pf-chips-grid{margin-top:28px;width:100%;max-width:680px;display:grid;grid-template-columns:1fr 1fr;gap:12px;position:relative;z-index:1}
    .pf-chip-card{border-radius:16px;padding:16px 18px;font-size:13px;font-weight:500;cursor:pointer;border:1px solid rgba(0,0,0,.06);text-align:left;line-height:1.4;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.04);transition:.25s}
    .pf-chip-card:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,.08);border-color:rgba(139,30,30,.15)}
    .pf-chip-pink{background:#FFFEFB}.pf-chip-blue{background:#FDFBF7}.pf-chip-yellow{background:#FFFEFB}.pf-chip-red{background:#F6F3EE}
    .pf-chat-area{width:100%;max-width:760px;margin-top:24px;display:flex;flex-direction:column;gap:16px;padding-bottom:24px;display:none;position:relative;z-index:1}
    .pf-msg{padding:12px 16px;border-radius:20px;font-size:14px;line-height:1.6;max-width:82%;white-space:pre-wrap;word-wrap:break-word}
    .pf-msg.user{background:#1F1F1F;color:#FFFEFB;align-self:flex-end;border-bottom-right-radius:6px;margin-left:auto;box-shadow:0 2px 8px rgba(0,0,0,.12)}
    .pf-msg.bot{background:#fff;border:1px solid rgba(0,0,0,.07);color:#1F1F1F;align-self:flex-start;border-bottom-left-radius:6px;box-shadow:0 2px 12px rgba(0,0,0,.06);margin-right:auto}
    .pf-typing{display:flex;gap:4px;padding:14px 18px;background:#fff;border:1px solid rgba(0,0,0,.07);border-radius:20px;border-bottom-left-radius:6px;width:fit-content;box-shadow:0 2px 8px rgba(0,0,0,.04)}
    .pf-dot{width:6px;height:6px;background:#8B1E1E;border-radius:50%;animation:pf-b 1.2s infinite}
    .pf-dot:nth-child(2){animation-delay:.15s}.pf-dot:nth-child(3){animation-delay:.3s}
    @keyframes pf-b{0%,80%,100%{transform:translateY(0);opacity:.5}40%{transform:translateY(-5px);opacity:1}}
    .pf-bottom-bar{padding:18px 24px;background:rgba(255,254,251,.92);backdrop-filter:blur(14px);border-top:1px solid rgba(0,0,0,.07);display:flex;justify-content:center;flex-shrink:0;position:relative;z-index:2}
    .pf-wa{position:fixed;right:20px;bottom:90px;width:56px;height:56px;border-radius:50%;background:#25d366;color:#fff;border:1px solid rgba(255,255,255,.2);display:grid;place-items:center;box-shadow:0 8px 24px rgba(37,211,102,.35);cursor:pointer;font-weight:700;z-index:5}
    .pf-cta-row{margin-top:24px;display:flex;gap:12px;flex-wrap:wrap;justify-content:center;position:relative;z-index:1}
    .pf-cta-primary{background:#8B1E1E;color:#FFFEFB;border:1px solid #8B1E1E;padding:12px 22px;border-radius:100px;font-size:13px;font-weight:600;letter-spacing:.02em;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:.2s}
    .pf-cta-primary:hover{background:#6E1717;transform:translateY(-1px)}
    .pf-cta-secondary{background:#fff;color:#1F1F1F;border:1px solid rgba(0,0,0,.12);padding:12px 22px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:.2s}
    .pf-cta-secondary:hover{background:#F6F3EE}
    @media(max-width:900px){.pf-sidebar{position:absolute;z-index:20;height:100%;box-shadow:8px 0 32px rgba(0,0,0,.12)}.pf-sidebar.collapsed{width:280px;transform:translateX(-100%);opacity:1}.pf-heading{font-size:34px}}
  `;
  document.head.appendChild(css);

  var root=document.createElement('div'); root.id='parv-finder-root';
  root.innerHTML=`
    <div class="pf-sidebar" id="pfSidebar">
      <div class="pf-side-top"><div class="pf-logo">PARV<span>INDUSTRIES</span></div><button class="pf-toggle" id="pfCloseSidebar">‹</button></div>
      <button class="pf-new-btn" id="pfNewBtn">+ New Search</button>
      <div class="pf-recent-label">RECENT SEARCHES</div>
      <div id="pfRecentList" style="flex:1;overflow:auto">
        <div class="pf-recent-item active" data-q="Spices List"><div class="pf-recent-title">Spices Bulk Search</div><div class="pf-recent-sub">25kg packs, 1000kg MOQ</div></div>
        <div class="pf-recent-item" data-q="Coconut Water"><div class="pf-recent-title">Coconut Water Export</div><div class="pf-recent-sub">200ml x 48 pieces inquiry</div></div>
        <div class="pf-recent-item" data-q="Noodles"><div class="pf-recent-title">Noodles Distributor</div><div class="pf-recent-sub">45g x 96, ₹500 carton</div></div>
      </div>
      <div class="pf-side-bottom"><div class="pf-avatar">P</div><div><div style="font-size:13px;font-weight:600">User</div><div style="font-size:11px;color:#6B7280">Free</div></div></div>
    </div>
    <div class="pf-main">
      <div class="pf-topbar">
        <button class="pf-hamburger hidden" id="pfOpenSidebar">☰</button>
        <div style="display:flex;flex-direction:column"><div class="pf-topbar-logo">PARV INDUSTRIES</div><div class="pf-topbar-sub">A subsidiary of Chakshu Food Pvt. Ltd.</div></div>
        <div style="flex:1"></div>
        <button style="background:#8B1E1E;color:#FFFEFB;border:none;border-radius:100px;padding:10px 18px;font-size:12px;font-weight:600;letter-spacing:.02em;display:flex;align-items:center;gap:6px;cursor:pointer" onclick="window.open('https://www.parvindustries.in','_blank')">REQUEST A QUOTE ↗</button>
        <button style="width:36px;height:36px;border-radius:50%;background:#F6F3EE;border:1px solid rgba(0,0,0,.08);display:grid;place-items:center;cursor:pointer" id="pfCloseRoot">✕</button>
      </div>
      <div class="pf-center" id="pfCenter">
        <div id="pfHero" style="width:100%;display:flex;flex-direction:column;align-items:center">
          <div class="pf-kicker">Food Manufacturing for Modern Markets</div>
          <div class="pf-heading">Good food<br>begins with<br><em>good intent.</em></div>
          <div class="pf-sub">Parv Industries makes and supplies spices, coconut water, noodles, and bulk ingredients for the businesses that keep India moving.</div>
          <div class="pf-cta-row">
            <button class="pf-cta-primary" onclick="document.getElementById('pfInput').focus()">EXPLORE PRODUCTS ↗</button>
            <button class="pf-cta-secondary" data-q="Bulk Quote">REQUEST BULK QUOTE ↗</button>
          </div>
          <div style="height:28px"></div>
          <div class="pf-chips-grid" id="pfChipsGrid">
            <button class="pf-chip-card pf-chip-pink" data-q="Spices List">🌶 Spices List — 25kg Pack, 1000kg MOQ</button>
            <button class="pf-chip-card pf-chip-blue" data-q="Coconut Water">🥥 Pure Coconut Water 200ml x 48</button>
            <button class="pf-chip-card pf-chip-yellow" data-q="Noodles">🍜 Eurofresh Noodles 45g x 96 - ₹500</button>
            <button class="pf-chip-card pf-chip-red" data-q="Bulk Quote">📦 Bulk Quote for Export Order</button>
          </div>
        </div>
        <div class="pf-chat-area" id="pfChatArea"></div>
      </div>
      <div class="pf-bottom-bar">
        <div class="pf-search-wrap">
          <button class="pf-icon-btn">📎</button>
          <button class="pf-icon-btn">⚙</button>
          <input class="pf-input" id="pfInput" placeholder="Ask about spices, bulk orders..." autocomplete="off"/>
          <button class="pf-icon-btn">🎤</button>
          <button class="pf-send" id="pfSendBtn">➤</button>
        </div>
      </div>
      <button class="pf-wa" onclick="window.open('https://wa.me/919899634294','_blank')">W</button>
    </div>
  `;
  document.body.appendChild(root);

  var sidebar=document.getElementById('pfSidebar');
  var openBtn=document.getElementById('pfOpenSidebar');
  var closeBtn=document.getElementById('pfCloseSidebar');
  function setSidebar(open){ if(open){ sidebar.classList.remove('collapsed'); openBtn.classList.add('hidden'); localStorage.setItem('parv_sidebar_v6','open'); } else { sidebar.classList.add('collapsed'); openBtn.classList.remove('hidden'); localStorage.setItem('parv_sidebar_v6','closed'); } }
  closeBtn.onclick=function(){ setSidebar(false); };
  openBtn.onclick=function(){ setSidebar(true); };
  if(localStorage.getItem('parv_sidebar_v6')==='closed') setSidebar(false);

  var input=document.getElementById('pfInput');
  var sendBtn=document.getElementById('pfSendBtn');
  var chatArea=document.getElementById('pfChatArea');
  var hero=document.getElementById('pfHero');
  var recentList=document.getElementById('pfRecentList');
  var center=document.getElementById('pfCenter');

  function newSearch(){
    hero.style.display='flex'; chatArea.style.display='none'; chatArea.innerHTML=''; input.value=''; input.focus();
    document.querySelectorAll('.pf-recent-item').forEach(function(i){i.classList.remove('active')});
    SESSION_ID='parv_desktop_'+Date.now(); localStorage.setItem(SID_KEY, SESSION_ID);
  }
  document.getElementById('pfNewBtn').onclick=newSearch;
  document.getElementById('pfCloseRoot').onclick=function(){ root.remove(); css.remove(); };
  recentList.onclick=function(e){ var item=e.target.closest('.pf-recent-item'); if(!item) return; document.querySelectorAll('.pf-recent-item').forEach(function(i){i.classList.remove('active')}); item.classList.add('active'); doSearch(item.dataset.q); };
  document.getElementById('pfChipsGrid').onclick=function(e){ var b=e.target.closest('button'); if(!b) return; doSearch(b.dataset.q); };
  document.querySelector('.pf-cta-secondary').onclick=function(){ doSearch('Bulk Quote'); };

  function doSearch(text){
    if(!text.trim()) return;
    hero.style.display='none';
    chatArea.style.display='flex';
    var userDiv=document.createElement('div'); userDiv.className='pf-msg user'; userDiv.textContent=text; chatArea.appendChild(userDiv);
    input.value='';
    var typing=document.createElement('div'); typing.className='pf-typing'; typing.innerHTML='<div class="pf-dot"></div><div class="pf-dot"></div><div class="pf-dot"></div>'; chatArea.appendChild(typing);
    center.scrollTop=center.scrollHeight;

    var payload = { chatInput: text, message: text, text: text, sessionId: SESSION_ID, botName: botName };
    fetch(HOOK, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) })
    .then(function(r){ return r.text(); }).then(function(reply){
      try{
        var d=JSON.parse(reply);
        if(Array.isArray(d) && d[0]){ reply = d[0].output || d[0].text || d[0].message || d[0].response || reply; }
        else { reply = d.output || d.text || d.message || d.response || d.reply || reply; }
      }catch(e){}
      if(!reply || reply.trim()==='' || reply==='{}' || reply==='[]'){ reply='Thanks for reaching out! Our team will get back to you shortly.'; }
      typing.remove();
      var bot=document.createElement('div'); bot.className='pf-msg bot'; bot.innerHTML=reply.replace(/\n/g,'<br>'); chatArea.appendChild(bot);
      var newItem=document.createElement('div'); newItem.className='pf-recent-item'; newItem.dataset.q=text; newItem.innerHTML='<div class="pf-recent-title">'+text.slice(0,24)+'</div><div class="pf-recent-sub">'+reply.slice(0,38).replace(/<[^>]*>/g,'')+'...</div>'; recentList.prepend(newItem);
      center.scrollTop=center.scrollHeight; input.focus();
    }).catch(function(err){
      typing.remove();
      var errDiv=document.createElement('div'); errDiv.className='pf-msg bot'; errDiv.textContent='Cannot reach server: '+err.message; chatArea.appendChild(errDiv);
    });
  }

  sendBtn.onclick=function(){ doSearch(input.value); };
  input.onkeydown=function(e){ if(e.key==='Enter'){ doSearch(input.value); } };
  input.focus();
})();
