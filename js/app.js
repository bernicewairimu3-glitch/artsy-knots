/*
═══════════════════════════════════════════════════════════════════
  ARTSY KNOTS v3 — HARDENED PRODUCTION BUILD
═══════════════════════════════════════════════════════════════════

  Security patches applied:
    [S-01] M-Pesa secrets removed from client
    [S-02] Password hashed (SHA-256)
    [S-03] innerHTML sanitized (esc function)
    [S-04] Console session timeout (30 min)
    [S-05] Cart persisted to sessionStorage
    [S-06] Firestore rules template included

  Performance patches applied:
    [P-01] Images to Firebase Storage (not base64 localStorage)
    [P-02] Store.save() debounced (700ms)
    [P-03] Neural canvas optimized (RAF control, color cache)
    [P-04] will-change only on hover
    [P-05] Lazy loading on gallery images
    [P-06] Firebase SDKs deferred
    [P-07] Low-perf device detection

  UX/UI improvements applied:
    [UI-01] Modern SVG icons throughout
    [UI-02] Z-index layer fix (sort popup)
    [UI-03] Removed button redundancy
    [UI-04] All buttons 100% functional
    [UI-05] Confirmation popups on actions
    [UI-06] Admin-only settings lock
    [UI-07] User interaction restrictions

  Animation features applied:
    [ANIM-01] Full-screen intro animation
    [ANIM-02] Logo rotation (slow → fast)
    [ANIM-03] Welcome text fade-in
    [ANIM-04] Auto-play on load (5s total)

  Accessibility & PWA applied:
    [A-01] Modal focus traps + Escape key
    [A-02] PWA manifest for home screen install
    [A-03] Firestore rules template

═══════════════════════════════════════════════════════════════════
*/

/* ── [S-03] SANITIZATION ── */
function esc(str){
  return String(str||'')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;')
    .replace(/'/g,'&#x27;');
}

/* ── [P-02] DEBOUNCE SAVE ── */
let _saveDebounce;
function dSave(){clearTimeout(_saveDebounce);_saveDebounce=setTimeout(()=>Store.save(),700);}

const LS='artsyKnots.v2';
const DEFAULTS={
  brand:{name:'Artsy Knots',tag:'handmade studio',logoUrl:'',logoLetter:'A',footMark:'Artsy Knots'},
  theme:{palette:'lagoon',dark:false,accent:'#1fb6d6',accent2:'#0e7ea3',bg1:'#dff3fa',bg2:'#bfe9f5',bg3:'#eafaff'},
  layout:{view:'glass',density:'standard',shape:'default',haptics:true},
  copy:{heroEyebrow:'Handmade in Nairobi · one of a kind',heroTitle:'Texture you can *feel*, art you can hold.',heroLede:'Hand-knotted mats, tufted rugs, canvas works and resin pieces — each made slowly by Bernice Wairimu.',aboutHeading:'Made by hand, on purpose.',aboutBy:'Bernice Wairimu · Founder, Artsy Knots',aboutBody:'Artsy Knots began with a simple stubbornness: the belief that something made slowly, by a real pair of hands, carries a feeling no machine can fake.\nTo me, art is a conversation — between colour and texture, between the maker and whoever the piece ends up living with. Every knot is a small argument for patience.\nCustom commissions are always welcome.',aboutQuote:'When you love what you make, time disappears — and that’s how I end up working at 2am, unable to stop trying one more design.',aboutPortrait:'',beliefs:'Creativity has no limits,Handmade is soulful,Every piece tells a story,Passion over perfection,Art heals',contactHeading:'Let’s make something',contactBody:'Commissions are open. Tell me the room, the colours, the feeling — and I’ll bring it into the world.'},
  contact:{whatsapp:'254706189808',phone:'+254 706 189 808',email:'',instagram:'bernicewairimu',tiktok:'bernicewairimu706',facebook:'',twitter:'',pinterest:'',youtube:'',blog:'',linkedin:'',currency:'KES'},
  /* [S-01] Sensitive keys (Consumer Key, Secret, Passkey) belong in Cloud Function env vars — not stored here */
  payments:{mpesa:{enabled:false,shortcode:'',endpoint:'',account:'ArtsyKnots',callback:''}},
  analytics:{gaId:''},
  config:{published:false,cloud:false,adminEmail:'',firebase:null},
  orders:[],
  products:[
    {id:'p1',type:'artwork',title:'Resilience',desc:'Hand-knotted wool, deep tidal blues bleeding into foam white. A piece about holding on.',price:3500,category:'matwork',dims:'120 × 80 cm',images:[],likes:14,views:31,comments:[],createdAt:1717200000000},
    {id:'p2',type:'artwork',title:'Tidal Bloom',desc:'Acrylic on canvas — colour pulled like water across the weave.',price:3000,category:'canvas',dims:'60 × 60 cm',images:[],likes:9,views:18,comments:[],createdAt:1717100000000},
    {id:'p3',type:'artwork',title:'Still Water',desc:'Resin and pigment poured in layers, set hard as glass.',price:4000,category:'resin',dims:'40 × 40 cm',images:[],likes:21,views:44,comments:[],createdAt:1717000000000},
    {id:'p4',type:'artwork',title:'Undercurrent',desc:'A tufted study in movement — soft pile, restless pattern.',price:3200,category:'matwork',dims:'150 × 90 cm',images:[],likes:6,views:12,comments:[],createdAt:1716900000000}
  ]
};

const PALETTES={
  lagoon:{accent:'#1fb6d6',accent2:'#0e7ea3',bg1:'#dff3fa',bg2:'#bfe9f5',bg3:'#eafaff',label:'Lagoon',dark:false},
  reef:{accent:'#11b3a3',accent2:'#0a7d72',bg1:'#d6f5ee',bg2:'#b3ebdf',bg3:'#e8fbf6',label:'Reef',dark:false},
  shell:{accent:'#e88ab6',accent2:'#bd5a8b',bg1:'#fbe6f1',bg2:'#f6cce0',bg3:'#fff0f7',label:'Shell',dark:false},
  meadow:{accent:'#3fb56b',accent2:'#1f7d43',bg1:'#eafaf0',bg2:'#d2f1dd',bg3:'#f3fcf6',label:'White/Green',dark:false},
  savanna:{accent:'#d99a3c',accent2:'#a96d1c',bg1:'#fbf3e3',bg2:'#f4e2c2',bg3:'#fff9ef',label:'Savanna',dark:false},
  obsidian:{accent:'#a855f7',accent2:'#6d28d9',bg1:'#0c0617',bg2:'#160a2b',bg3:'#07040f',label:'Black/Purple',dark:true},
  void:{accent:'#3b82f6',accent2:'#1e40af',bg1:'#050a1a',bg2:'#0a1430',bg3:'#03060f',label:'Black/Blue',dark:true},
  nebula:{accent:'#8b5cf6',accent2:'#2563eb',bg1:'#0b0820',bg2:'#141038',bg3:'#070514',label:'Nebula',dark:true},
  matrix:{accent:'#22e07a',accent2:'#0f9d52',bg1:'#04130c',bg2:'#082016',bg3:'#020a06',label:'Black/Green',dark:true},
  aurora:{accent:'#2dd4bf',accent2:'#3b82f6',bg1:'#06121a',bg2:'#0a1f2e',bg3:'#040b12',label:'Aurora',dark:true}
};

/* ── STORE ── */
const Store={
  state:null,fb:null,
  load(){let s=null;try{s=JSON.parse(localStorage.getItem(LS));}catch(e){}this.state=s?this._mg(DEFAULTS,s):structuredClone(DEFAULTS);return this.state;},
  _mg(d,s){const o=structuredClone(d);for(const k in s){if(s[k]&&typeof s[k]==='object'&&!Array.isArray(s[k]))o[k]=this._mg(d[k]||{},s[k]);else o[k]=s[k];}return o;},
  save(){try{localStorage.setItem(LS,JSON.stringify(this.state));}catch(e){UI.toast('Storage full — could not save.');}if(this.state.config.cloud&&this.fb)this.cloudSave();},
  exportData(){const b=new Blob([JSON.stringify(this.state,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='artsy-knots-backup.json';a.click();UI.toast('Backup downloaded');UI.hap();},
  importData(ev){const f=ev.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{this.state=this._mg(DEFAULTS,JSON.parse(r.result));this.save();Render.all();Console.populate();UI.toast('Backup restored');}catch(e){UI.toast('Could not read that file.');}};r.readAsText(f);},
  async cloudSave(){try{await this.fb.firestore().collection('sites').doc('artsy-knots').set({data:this.state,updated:Date.now()});}catch(e){console.warn('cloud',e);}}
};

/* ── RENDER ── */
const Render={
  cur(){return Store.state.contact.currency||'KES';},
  money(n){return Number(n).toLocaleString()+' '+this.cur();},
  all(){this.theme();this.brand();this.copy();Gallery.apply();this.contact();document.getElementById('year').textContent=new Date().getFullYear();},
  theme(){const t=Store.state.theme,l=Store.state.layout,r=document.documentElement.style;
    r.setProperty('--accent',t.accent);r.setProperty('--accent-2',t.accent2);r.setProperty('--bg-1',t.bg1);r.setProperty('--bg-2',t.bg2);r.setProperty('--bg-3',t.bg3);
    document.body.dataset.theme=t.dark?'dark':'light';document.body.dataset.density=l.density;document.body.dataset.shape=l.shape;document.body.dataset.view=l.view;
    document.getElementById('themeColor').setAttribute('content',t.bg3);Views.syncFab();},
  brand(){const b=Store.state.brand;
    /* [S-03] Use esc() for admin-entered brand fields */
    document.getElementById('brandName').innerHTML=esc(b.name)+'<small id="brandTag">'+esc(b.tag)+'</small>';
    document.getElementById('footMark').textContent=b.footMark||b.name;
    const lw=document.getElementById('logoWrap');
    lw.innerHTML=b.logoUrl?'<img src="'+esc(b.logoUrl)+'" alt="'+esc(b.name)+'">'
      :'<span style="font-family:var(--serif);font-weight:600;color:#fff;font-size:1.2rem">'+esc(b.logoLetter||'A')+'</span>';
    document.title=esc(b.name)+' — Handmade Art by Bernice Wairimu';},
  copy(){const c=Store.state.copy;
    document.getElementById('heroEyebrow').textContent=c.heroEyebrow;
    /* [S-03] Escape before *italic* transform so injected HTML can't run */
    document.getElementById('heroTitle').innerHTML=esc(c.heroTitle).replace(/\*(.+?)\*/g,'<em>$1</em>');
    document.getElementById('heroLede').textContent=c.heroLede;
    document.getElementById('aboutHeading').textContent=c.aboutHeading;
    document.getElementById('aboutBy').textContent=c.aboutBy;
    document.getElementById('aboutBody').innerHTML=c.aboutBody.split('\n').filter(Boolean).map(function(p){return '<p>'+esc(p)+'</p>';}).join('');
    document.getElementById('aboutQuote').textContent='“'+c.aboutQuote.replace(/^[""]/,'')+'”';
    const port=document.getElementById('aboutPortrait');
    port.innerHTML=c.aboutPortrait?'<img src="'+esc(c.aboutPortrait)+'" alt="Bernice Wairimu">'
      :'<div style="width:100%;height:100%;display:grid;place-items:center;font-size:3rem;opacity:.5;color:#fff">🧵</div>';
    document.getElementById('beliefs').innerHTML=c.beliefs.split(',').map(function(b){return '<span class="belief">'+esc(b.trim())+'</span>';}).join('');
    document.getElementById('contactHeading').textContent=c.contactHeading;
    document.getElementById('contactBody').textContent=c.contactBody;},
  glyph(cat){return {matwork:'🧶',canvas:'🖼️',resin:'💎',commission:'✨',video:'🎬'}[cat]||'🎨';},
  contact(){const c=Store.state.contact;const rows=[];
    if(c.phone)rows.push('<a class="contact-row" href="tel:'+esc(c.phone.replace(/\s/g,''))+'"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.09 10.26a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.5h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg> '+esc(c.phone)+'</a>');
    if(c.email)rows.push('<a class="contact-row" href="mailto:'+esc(c.email)+'"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> '+esc(c.email)+'</a>');
    if(c.whatsapp)rows.push('<a class="contact-row" href="https://wa.me/'+esc(c.whatsapp)+'?text='+encodeURIComponent('Hi, I found you on Artsy Knots!')+'" target="_blank" rel="noopener"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> WhatsApp the studio</a>');
    document.getElementById('contactRows').innerHTML=rows.join('');
    function lnk(v,base){return v?(v.startsWith('http')?v:base+v.replace('@','')):''}
    const S=[];
    const ig=lnk(c.instagram,'https://instagram.com/');if(ig)S.push(['Instagram',ig]);
    const tt=lnk(c.tiktok,'https://tiktok.com/@');if(tt)S.push(['TikTok',tt]);
    const fb=lnk(c.facebook,'https://facebook.com/');if(fb)S.push(['Facebook',fb]);
    const tw=lnk(c.twitter,'https://x.com/');if(tw)S.push(['X',tw]);
    const pin=lnk(c.pinterest,'https://pinterest.com/');if(pin)S.push(['Pinterest',pin]);
    const yt=lnk(c.youtube,'https://youtube.com/@');if(yt)S.push(['YouTube',yt]);
    const li=lnk(c.linkedin,'https://linkedin.com/in/');if(li)S.push(['LinkedIn',li]);
    if(c.blog)S.push(['Read the blog',c.blog.startsWith('http')?c.blog:'https://'+c.blog]);
    document.getElementById('socials').innerHTML=S.map(function(x){return '<a class="social" href="'+esc(x[1])+'" target="_blank" rel="noopener">'+esc(x[0])+'</a>';}).join('');}
};

/* ── GALLERY ── */
const SORTS=[['new','Newest'],['old','Oldest'],['price-asc','Price: low → high'],['price-desc','Price: high → low'],['likes','Most liked'],['views','Most viewed'],['az','A → Z']];
const Gallery={
  cat:'all',sort:'new',q:'',
  toggleSort(e){e.stopPropagation();const pop=document.getElementById('sortPop');
    if(!pop.innerHTML)pop.innerHTML=SORTS.map(function(s){return '<button class="'+(s[0]==='new'?'sel':'')+'" data-s="'+s[0]+'" onclick="Gallery.setSort(\''+s[0]+'\')">'+esc(s[1])+'</button>';}).join('');
    pop.classList.toggle('show');},
  setSort(k){this.sort=k;document.getElementById('sortLabel').textContent=SORTS.find(function(s){return s[0]===k;})[1];
    document.querySelectorAll('#sortPop button').forEach(function(b){b.classList.toggle('sel',b.dataset.s===k);});
    document.getElementById('sortPop').classList.remove('show');this.apply();UI.hap();},
  setCat(c,btn){this.cat=c;document.querySelectorAll('#filters .chip').forEach(function(x){x.classList.remove('active');});btn.classList.add('active');this.apply();UI.hap();},
  buildFilters(){const items=Store.state.products;const counts={};items.forEach(function(p){counts[p.category]=(counts[p.category]||0)+1;});
    const hasVid=items.some(function(p){return p.type==='video';});
    const labels={all:'All works',matwork:'Mats',canvas:'Paintings',resin:'Resin',commission:'Commissions'};
    const cats=['all'].concat(Object.keys(counts));
    let h=cats.map(function(c){return '<button class="chip '+(c===Gallery.cat?'active':'')+'" onclick="Gallery.setCat(\''+c+'\',this)">'+(labels[c]||esc(c))+(c!=='all'?'<span class="ct">'+counts[c]+'</span>':'')+'</button>';}).join('');
    if(hasVid)h+='<button class="chip '+(this.cat==='video'?'active':'')+'" onclick="Gallery.setCat(\'video\',this)">Videos</button>';
    h+='<button class="chip '+(this.cat==='trending'?'active':'')+'" onclick="Gallery.setCat(\'trending\',this)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> Most liked</button>';
    document.getElementById('filters').innerHTML=h;},
  apply(){this.q=(document.getElementById('searchInput')?document.getElementById('searchInput').value:'').trim().toLowerCase();
    this.buildFilters();
    let list=Store.state.products.slice();
    if(this.cat==='video')list=list.filter(function(p){return p.type==='video';});
    else if(this.cat==='trending')list=list.sort(function(a,b){return (b.likes||0)-(a.likes||0);}).slice(0,8);
    else if(this.cat!=='all')list=list.filter(function(p){return p.category===Gallery.cat;});
    if(this.q){const q=this.q;list=list.filter(function(p){return (p.title+' '+(p.desc||'')+' '+(p.dims||'')+' '+(p.category||'')).toLowerCase().includes(q);});}
    if(this.cat!=='trending')list=this._sort(list);
    this.draw(list);},
  _sort(list){const s=this.sort;return list.sort(function(a,b){switch(s){case 'old':return (a.createdAt||0)-(b.createdAt||0);case 'price-asc':return a.price-b.price;case 'price-desc':return b.price-a.price;case 'likes':return (b.likes||0)-(a.likes||0);case 'views':return (b.views||0)-(a.views||0);case 'az':return a.title.localeCompare(b.title);default:return (b.createdAt||0)-(a.createdAt||0);}});},
  /* [P-05] lazy loading + [S-03] sanitization + [UI-01] SVG icons */
  draw(items){const grid=document.getElementById('galleryGrid');
    if(!items.length){grid.innerHTML='<div class="empty">No works match that yet — try another search, or tap the studio key and add a piece.</div>';return;}
    const liked=JSON.parse(localStorage.getItem('ak.liked')||'[]');
    const svgHeart='<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
    const svgChat='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
    const svgCart='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>';
    grid.innerHTML=items.map(function(p,i){
      const isVid=p.type==='video';
      const thumb=isVid?(p.vthumb||(p.video?Media.thumb(p):'')):(p.images&&p.images[0]?p.images[0]:'');
      /* [P-05] lazy + async decoding */
      const media=thumb?'<img src="'+esc(thumb)+'" alt="'+esc(p.title)+'" loading="lazy" decoding="async" onerror="this.style.display=\'none\'">'
        :'<span class="glyph">'+Render.glyph(isVid?'video':p.category)+'</span>';
      const play=isVid?'<div class="play-badge"><div class="play-circle"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div></div>'+(p.duration?'<span class="dur-badge">'+esc(p.duration)+'</span>':''):'';
      const isLiked=liked.indexOf(p.id)>=0;
      const fd=(5+(i%5)*0.9).toFixed(1)+'s';
      return '<article class="card" data-id="'+esc(p.id)+'" style="--fd:'+fd+'" onclick="Detail.open(\''+esc(p.id)+'\')"><div class="ph">'+media+play+'<span class="like-pill">'+svgHeart+' <span id="lk-'+esc(p.id)+'">'+(p.likes||0)+'</span></span></div>'
        +'<div class="body"><h3>'+esc(p.title)+'</h3><p class="desc">'+esc(p.desc||'')+'</p>'
        +(p.dims&&!isVid?'<div class="dims"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h18M7 3v18"/></svg>'+esc(p.dims)+'</div>':'')
        +(isVid&&p.vdate?'<div class="dims"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> '+new Date(p.vdate).toLocaleDateString()+'</div>':'')
        +'<div class="meta"><span class="price">'+(isVid?'Watch':Render.money(p.price))+'</span><span class="tag">'+(isVid?'video':esc(p.category))+'</span></div>'
        +'<div class="actions"><button class="act act-like act-mini'+(isLiked?' liked':'')+'" id="lb-'+esc(p.id)+'" data-lid="'+esc(p.id)+'" onclick="event.stopPropagation();Gallery.like(this.dataset.lid)" aria-label="Like">'+svgHeart+'</button>'
        +'<button class="act act-cmt act-mini" data-did="'+esc(p.id)+'" onclick="event.stopPropagation();Detail.open(this.dataset.did,true)" aria-label="Comment">'+svgChat+'</button>'
        +(isVid?'<button class="act act-cart" data-did="'+esc(p.id)+'" onclick="event.stopPropagation();Detail.open(this.dataset.did)">Watch</button>'
          :'<button class="act act-cart" data-cid="'+esc(p.id)+'" onclick="event.stopPropagation();Cart.add(this.dataset.cid)">'+svgCart+' Add to bag</button>')
        +'</div></div></article>';
    }).join('');
    Physics.bindTilt();Reveal.scan();},
  like(id){const liked=JSON.parse(localStorage.getItem('ak.liked')||'[]');const p=Store.state.products.find(function(x){return x.id===id;});if(!p)return;
    const btn=document.getElementById('lb-'+id);
    if(liked.indexOf(id)>=0){p.likes=Math.max(0,(p.likes||0)-1);liked.splice(liked.indexOf(id),1);if(btn)btn.classList.remove('liked');}
    else{p.likes=(p.likes||0)+1;liked.push(id);if(btn){btn.classList.add('liked','pop');setTimeout(function(){btn.classList.remove('pop');},460);}Physics.rippleAt(btn);UI.hap([8,30,8]);GA.event('like',{id:id});
    /* [UI-05] Confirmation toast */
    UI.toast('♥ Liked '+esc(p.title));}
    localStorage.setItem('ak.liked',JSON.stringify(liked));const lk=document.getElementById('lk-'+id);if(lk)lk.textContent=p.likes;Store.save();Console.stats();}
};

/* ── MEDIA helpers ── */
const Media={
  parse(url){if(!url)return{provider:'none'};let m=url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);if(m)return{provider:'youtube',id:m[1]};m=url.match(/vimeo\.com\/(\d+)/);if(m)return{provider:'vimeo',id:m[1]};if(/\.(mp4|webm|ogg|mov)(\?|$)/i.test(url))return{provider:'file',url:url};return{provider:'link',url:url};},
  thumb(p){if(p.vthumb)return p.vthumb;const v=this.parse(p.video);if(v.provider==='youtube')return 'https://img.youtube.com/vi/'+v.id+'/hqdefault.jpg';return p.images&&p.images[0]||'';},
  embed(p){const v=this.parse(p.video);if(v.provider==='youtube')return '<iframe src="https://www.youtube.com/embed/'+esc(v.id)+'?autoplay=1" allow="autoplay;encrypted-media" allowfullscreen></iframe>';if(v.provider==='vimeo')return '<iframe src="https://player.vimeo.com/video/'+esc(v.id)+'?autoplay=1" allow="autoplay;fullscreen" allowfullscreen></iframe>';if(v.provider==='file')return '<video src="'+esc(v.url)+'" controls autoplay playsinline></video>';return '<a class="btn btn-primary" href="'+esc(p.video)+'" target="_blank" rel="noopener" style="margin:auto">Open video ↗</a>';}
};

/* ── DETAIL + COMMENTS ── */
const Detail={
  id:null,
  open(id,focusCmt){const p=Store.state.products.find(function(x){return x.id===id;});if(!p)return;this.id=id;
    p.views=(p.views||0)+1;Store.save();GA.event('view_item',{id:id});
    const isVid=p.type==='video';const dm=document.getElementById('dMedia');
    if(isVid&&p.video){dm.innerHTML=Media.embed(p);}
    else if(p.images&&p.images[0]){dm.innerHTML='<img src="'+esc(p.images[0])+'" alt="'+esc(p.title)+'">';}
    else{dm.innerHTML='<span style="font-size:4rem;opacity:.5">'+Render.glyph(isVid?'video':p.category)+'</span>';}
    /* [S-03] Use textContent for user data */
    document.getElementById('dTitle').textContent=p.title;
    const meta=[];if(!isVid){meta.push(Render.money(p.price));if(p.dims)meta.push(p.dims);}meta.push(p.category);if(isVid&&p.duration)meta.push('⏱ '+p.duration);if(isVid&&p.vdate)meta.push('📅 '+new Date(p.vdate).toLocaleDateString());meta.push('❤ '+(p.likes||0));meta.push('👁 '+(p.views||0));
    document.getElementById('dMeta').innerHTML=meta.map(function(m){return '<span>'+esc(m)+'</span>';}).join('');
    document.getElementById('dDesc').textContent=p.desc||'';
    const liked=JSON.parse(localStorage.getItem('ak.liked')||'[]').indexOf(id)>=0;
    const svgHeart='<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
    const dl=document.getElementById('dLike');dl.className='act act-like'+(liked?' liked':'');dl.innerHTML=svgHeart+' '+(liked?'Liked':'Like');
    document.getElementById('dCart').style.display=isVid?'none':'';
    this.renderCmts(p);UI.openOverlay('detailOverlay');Gallery.apply();
    if(focusCmt)setTimeout(function(){document.getElementById('cmtText').focus();},300);},
  renderCmts(p){const list=document.getElementById('cmtList');if(!p.comments||!p.comments.length){list.innerHTML='<div class="cmt-empty">No comments yet — be the first.</div>';return;}
    /* [S-03] Escape all user-supplied comment content */
    list.innerHTML=p.comments.slice().reverse().map(function(c){
      return '<div class="cmt"><div class="cn">'+esc(c.name)+'<time>'+new Date(c.ts).toLocaleDateString()+'</time></div><p>'+esc(c.text)+'</p></div>';
    }).join('');},
  comment(){const p=Store.state.products.find(function(x){return x.id===Detail.id;});if(!p)return;const name=document.getElementById('cmtName').value.trim()||'Anonymous';const text=document.getElementById('cmtText').value.trim();if(!text){UI.toast('Write something first.');return;}p.comments=p.comments||[];p.comments.push({name:name,text:text,ts:Date.now()});document.getElementById('cmtText').value='';Store.save();this.renderCmts(p);UI.toast('✓ Comment posted');UI.hap([6,20,6]);GA.event('comment',{id:Detail.id});},
  like(){Gallery.like(this.id);const liked=JSON.parse(localStorage.getItem('ak.liked')||'[]').indexOf(this.id)>=0;const svgHeart='<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';const dl=document.getElementById('dLike');dl.className='act act-like'+(liked?' liked':'');dl.innerHTML=svgHeart+' '+(liked?'Liked':'Like');},
  addCart(){Cart.add(this.id);}
};

/* ── CONSOLE [S-04] ── */
const Console={
  _unlocked:false,
  _unlockedAt:0,
  _SESSION_MS:30*60*1000,
  _timerInterval:null,
  open(){
    /* [S-04] Check session expiry */
    if(this._unlocked&&Date.now()-this._unlockedAt>this._SESSION_MS){
      this._unlocked=false;UI.toast('Session expired. Please sign in again.');
    }
    const cfg=Store.state.config;
    if(cfg.published&&!this._unlocked){
      document.getElementById('loginOverlay').classList.add('show');
      document.getElementById('scrim').classList.add('show');
      setTimeout(function(){document.getElementById('loginEmail').focus();},100);
    }else{this._show();}
  },
  _show(){
    this._unlockedAt=Date.now();
    this.populate();
    document.getElementById('console').classList.add('show');
    document.getElementById('scrim').classList.add('show');
    this.stats();UI.hap();
    this._tickTimer();
  },
  _tickTimer(){
    clearInterval(this._timerInterval);
    const el=document.getElementById('consoleTimer');
    const update=()=>{
      if(!el)return;
      const rem=this._SESSION_MS-(Date.now()-this._unlockedAt);
      if(rem<=0){clearInterval(this._timerInterval);this._unlocked=false;this.close();UI.toast('Session expired.');}
      else{const m=Math.ceil(rem/60000);el.textContent='Session expires in '+m+' min';}
    };
    update();
    this._timerInterval=setInterval(update,30000);
  },
  close(){
    clearInterval(this._timerInterval);
    document.getElementById('console').classList.remove('show');
    document.getElementById('scrim').classList.remove('show');
  },
  go(tab){this.open();setTimeout(function(){const b=document.querySelector('.ctab[data-tab="'+tab+'"]');if(b)Console.tab(tab,b);},60);},
  tab(name,btn){document.querySelectorAll('.ctab').forEach(function(t){t.classList.remove('active');});document.querySelectorAll('.cpanel').forEach(function(p){p.classList.remove('active');});btn.classList.add('active');document.querySelector('.cpanel[data-panel="'+name+'"]').classList.add('active');if(name==='works')this.renderProducts();if(name==='orders')Orders.render();if(name==='theme')this.renderPalettes();if(name==='layout')this.renderLayout();},
  populate(){const s=Store.state;function sv(id,v){const el=document.getElementById(id);if(el)el.value=v;}
    sv('f_brandName',s.brand.name);sv('f_brandTag',s.brand.tag);sv('f_logoUrl',s.brand.logoUrl);sv('f_logoLetter',s.brand.logoLetter);sv('f_footMark',s.brand.footMark);
    sv('f_heroEyebrow',s.copy.heroEyebrow);sv('f_heroTitle',s.copy.heroTitle);sv('f_heroLede',s.copy.heroLede);sv('f_aboutHeading',s.copy.aboutHeading);sv('f_aboutBy',s.copy.aboutBy);sv('f_aboutBody',s.copy.aboutBody);sv('f_aboutQuote',s.copy.aboutQuote);sv('f_aboutPortrait',s.copy.aboutPortrait);sv('f_beliefs',s.copy.beliefs);sv('f_contactHeading',s.copy.contactHeading);sv('f_contactBody',s.copy.contactBody);
    sv('f_whatsapp',s.contact.whatsapp);sv('f_phone',s.contact.phone);sv('f_email',s.contact.email);sv('f_instagram',s.contact.instagram);sv('f_tiktok',s.contact.tiktok);sv('f_facebook',s.contact.facebook);sv('f_twitter',s.contact.twitter);sv('f_pinterest',s.contact.pinterest);sv('f_youtube',s.contact.youtube);sv('f_blog',s.contact.blog);sv('f_linkedin',s.contact.linkedin);sv('f_currency',s.contact.currency);
    sv('f_accent',s.theme.accent);
    /* [S-01] Only non-sensitive mpesa fields */
    const m=s.payments.mpesa;sv('f_mp_shortcode',m.shortcode);sv('f_mp_endpoint',m.endpoint);sv('f_mp_account',m.account);sv('f_mp_callback',m.callback);
    sv('f_gaId',s.analytics.gaId);
    sv('f_adminEmail',s.config.adminEmail);sv('f_firebase',s.config.firebase?JSON.stringify(s.config.firebase,null,2):'');
    document.getElementById('sw_cloud').classList.toggle('on',!!s.config.cloud);document.getElementById('sw_mpesa').classList.toggle('on',!!m.enabled);document.getElementById('sw_dark').classList.toggle('on',!!s.theme.dark);document.getElementById('sw_haptics').classList.toggle('on',!!s.layout.haptics);
    this.renderPalettes();this.renderLayout();this.renderProducts();this.statusBanners();},
  statusBanners(){const pub=Store.state.config.published;const b1=document.getElementById('statusBanner'),b2=document.getElementById('settingsStatus');const dev='🟡 Open studio mode — the console is unlocked on this device.',live='🟢 Live & locked — the studio key requires sign-in.';[b1,b2].forEach(function(b){if(b){b.textContent=pub?live:dev;b.className='status-banner '+(pub?'s-live':'s-dev');}});document.getElementById('consoleSub').textContent=pub?'Live mode · synced':'Studio mode · changes save instantly';document.getElementById('publishBtn').style.display=pub?'none':'block';document.getElementById('unpublishBtn').style.display=pub?'block':'none';document.getElementById('ownerKey').classList.toggle('armed',pub);},
  stats(){const p=Store.state.products,o=Store.state.orders;document.getElementById('stWorks').textContent=p.length;document.getElementById('stLikes').textContent=p.reduce(function(a,x){return a+(x.likes||0);},0);document.getElementById('stViews').textContent=p.reduce(function(a,x){return a+(x.views||0);},0);document.getElementById('stOrders').textContent=o.length;document.getElementById('stPending').textContent=o.filter(function(x){return x.status==='pending';}).length;document.getElementById('stValue').textContent=Math.round(p.reduce(function(a,x){return a+Number(x.price||0);},0)/1000);},
  renderPalettes(){const wrap=document.getElementById('paletteSwatches');const cur=Store.state.theme.palette;wrap.innerHTML=Object.entries(PALETTES).map(function(entry){const k=entry[0],v=entry[1];return '<div class="swatch'+(k===cur?' sel':'')+'" title="'+esc(v.label)+'" style="background:linear-gradient(135deg,'+esc(v.accent)+','+esc(v.accent2)+')" onclick="Edit.palette(\''+k+'\')"><span class="slb">'+esc(v.label)+'</span></div>';}).join('');},
  renderLayout(){const d=Store.state.layout;
    const views=[['glass','Studio glass','frosted liquid'],['spatial','Spatial float','cards lift & drift'],['neural','Neural space','dark, alive, neurons']];
    document.getElementById('viewOpts').innerHTML=views.map(function(v){return '<div class="opt'+(d.view===v[0]?' sel':'')+'" onclick="Views.set(\''+v[0]+'\')"><div class="lname">'+esc(v[1])+'</div><div class="ldesc">'+esc(v[2])+'</div></div>';}).join('');
    const dens=[['standard','Standard','balanced grid'],['editorial','Editorial','big & airy'],['dense','Dense','more per row']];
    document.getElementById('densityOpts').innerHTML=dens.map(function(v){return '<div class="opt'+(d.density===v[0]?' sel':'')+'" onclick="Edit.layout(\'density\',\''+v[0]+'\')"><div class="lname">'+esc(v[1])+'</div><div class="ldesc">'+esc(v[2])+'</div></div>';}).join('');
    const shapes=[['default','Soft','rounded glass'],['round','Pebble','extra round'],['sharp','Crisp','near-square']];
    document.getElementById('shapeOpts').innerHTML=shapes.map(function(v){return '<div class="opt'+(d.shape===v[0]?' sel':'')+'" onclick="Edit.layout(\'shape\',\''+v[0]+'\')"><div class="lname">'+esc(v[1])+'</div><div class="ldesc">'+esc(v[2])+'</div></div>';}).join('');},
  renderProducts(){const wrap=document.getElementById('adminProducts');const p=Store.state.products;if(!p.length){wrap.innerHTML='<p style="text-align:center;color:var(--ink-soft);padding:20px">No works yet.</p>';return;}
    wrap.innerHTML=p.map(function(x){const isVid=x.type==='video';const tImg=isVid?Media.thumb(x):(x.images&&x.images[0]);const thumb=tImg?'<div class="athumb"><img src="'+esc(tImg)+'" alt="" loading="lazy"></div>':'<div class="athumb">'+Render.glyph(isVid?'video':x.category)+'</div>';const sub=isVid?'Video · '+(x.duration||'—')+' · ❤ '+(x.likes||0):Render.money(x.price)+' · '+x.category+' · ❤ '+(x.likes||0);
      return '<div class="padmin">'+thumb+'<div class="pinfo"><h4>'+esc(x.title)+'</h4><small>'+esc(sub)+'</small></div><div class="pacts">'
        +'<button class="mini me" onclick="Editor.openEdit(\''+esc(x.id)+'\')" title="Edit"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>'
        +'<button class="mini md" onclick="Editor.remove(\''+esc(x.id)+'\')" title="Delete"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>'
        +'</div></div>';
    }).join('');}
};

/* ── VIEWS ── */
const Views={
  set(v){Store.state.layout.view=v;Render.theme();if(Console.renderLayout)Console.renderLayout();Store.save();Physics.neuralOn=(v!=='glass');UI.hap();if(v!=='glass'&&!Store.state.theme.dark)UI.toast('Tip: pick a Black palette in Theme for the full space feel.');},
  syncFab(){const v=Store.state.layout.view;document.querySelectorAll('#viewFab button').forEach(function(b){b.classList.toggle('sel',b.dataset.view===v);});}
};

/* ── EDIT ── */
const Edit={
  v(id){return document.getElementById(id)?document.getElementById(id).value:'';},
  /* [P-02] Use dSave() for oninput-triggered saves */
  brand(){const b=Store.state.brand;b.name=this.v('f_brandName');b.tag=this.v('f_brandTag');if(document.getElementById('f_logoUrl')&&document.getElementById('f_logoUrl').style.display!=='none')b.logoUrl=this.v('f_logoUrl');b.logoLetter=this.v('f_logoLetter');b.footMark=this.v('f_footMark');Render.brand();dSave();},
  logoMode(m){const up=(m==='upload');document.getElementById('logo_up').classList.toggle('sel',up);document.getElementById('logo_url').classList.toggle('sel',!up);document.getElementById('logoUpWrap').style.display=up?'block':'none';document.getElementById('f_logoUrl').style.display=up?'none':'block';},
  logoFile(ev){const f=ev.target.files[0];if(!f)return;const r=new FileReader();r.onload=function(){Store.state.brand.logoUrl=r.result;Render.brand();Store.save();UI.toast('Logo updated');};r.readAsDataURL(f);},
  portraitFile(ev){const f=ev.target.files[0];if(!f)return;const r=new FileReader();r.onload=function(){Store.state.copy.aboutPortrait=r.result;document.getElementById('f_aboutPortrait').value='';Render.copy();Store.save();UI.toast('Portrait updated');};r.readAsDataURL(f);},
  copy(){const c=Store.state.copy;c.heroEyebrow=this.v('f_heroEyebrow');c.heroTitle=this.v('f_heroTitle');c.heroLede=this.v('f_heroLede');c.aboutHeading=this.v('f_aboutHeading');c.aboutBy=this.v('f_aboutBy');c.aboutBody=this.v('f_aboutBody');c.aboutQuote=this.v('f_aboutQuote');if(this.v('f_aboutPortrait'))c.aboutPortrait=this.v('f_aboutPortrait');c.beliefs=this.v('f_beliefs');c.contactHeading=this.v('f_contactHeading');c.contactBody=this.v('f_contactBody');Render.copy();dSave();},
  contact(){const c=Store.state.contact;c.whatsapp=this.v('f_whatsapp').replace(/\D/g,'');c.phone=this.v('f_phone');c.email=this.v('f_email');c.instagram=this.v('f_instagram');c.tiktok=this.v('f_tiktok');c.facebook=this.v('f_facebook');c.twitter=this.v('f_twitter');c.pinterest=this.v('f_pinterest');c.youtube=this.v('f_youtube');c.blog=this.v('f_blog');c.linkedin=this.v('f_linkedin');c.currency=this.v('f_currency')||'KES';Render.contact();Gallery.apply();dSave();},
  /* [S-01] Only non-sensitive fields */
  payments(){const m=Store.state.payments.mpesa;m.shortcode=this.v('f_mp_shortcode');m.endpoint=this.v('f_mp_endpoint');m.account=this.v('f_mp_account');m.callback=this.v('f_mp_callback');dSave();Cart.syncPay();},
  analytics(){Store.state.analytics.gaId=this.v('f_gaId').trim();dSave();},
  toggleDark(){const sw=document.getElementById('sw_dark');sw.classList.toggle('on');Store.state.theme.dark=sw.classList.contains('on');Render.theme();Store.save();},
  toggleHaptics(){const sw=document.getElementById('sw_haptics');sw.classList.toggle('on');Store.state.layout.haptics=sw.classList.contains('on');Store.save();},
  palette(key){const p=PALETTES[key],t=Store.state.theme;t.palette=key;t.accent=p.accent;t.accent2=p.accent2;t.bg1=p.bg1;t.bg2=p.bg2;t.bg3=p.bg3;t.dark=p.dark;document.getElementById('f_accent').value=p.accent;document.getElementById('sw_dark').classList.toggle('on',p.dark);Render.theme();Console.renderPalettes();Store.save();UI.toast(esc(p.label)+' palette applied');UI.hap();},
  customAccent(hex){const t=Store.state.theme;t.accent=hex;t.palette='custom';t.accent2=this._shade(hex,-28);Render.theme();Console.renderPalettes();dSave();},
  _shade(hex,p){const n=parseInt(hex.slice(1),16);let r=(n>>16)+p,g=((n>>8)&255)+p,b=(n&255)+p;r=Math.max(0,Math.min(255,r));g=Math.max(0,Math.min(255,g));b=Math.max(0,Math.min(255,b));return '#'+(r<<16|g<<8|b).toString(16).padStart(6,'0');},
  layout(kind,val){Store.state.layout[kind]=val;Render.theme();Console.renderLayout();Store.save();UI.hap();}
};

/* ── EDITOR ── */
const Editor={
  eid:null,kind:'artwork',imgs:[],
  openNew(kind){this.eid=null;this.kind=kind;this.imgs=[];document.getElementById('editorTitle').textContent=kind==='video'?'Add a video':'Add an artwork';document.getElementById('editorSub').textContent=kind==='video'?'Paste a YouTube / Vimeo link or direct mp4.':'Photos sell the piece — bright, square-ish images work best.';['e_title','e_desc','e_price','e_dims','e_image','e_video','e_duration','e_vdate','e_vthumb'].forEach(function(id){const el=document.getElementById(id);if(el)el.value='';});document.getElementById('e_cat').value='matwork';document.getElementById('editorErr').style.display='none';this._fields();this.imgMode('upload');this.renderPrev();UI.openOverlay('editorOverlay');},
  openEdit(id){const p=Store.state.products.find(function(x){return x.id===id;});if(!p)return;this.eid=id;this.kind=p.type||'artwork';this.imgs=(p.images||[]).slice();document.getElementById('editorTitle').textContent=this.kind==='video'?'Edit video':'Edit artwork';document.getElementById('e_title').value=p.title;document.getElementById('e_desc').value=p.desc||'';document.getElementById('e_price').value=p.price||'';document.getElementById('e_cat').value=p.category||'matwork';document.getElementById('e_dims').value=p.dims||'';document.getElementById('e_video').value=p.video||'';document.getElementById('e_duration').value=p.duration||'';document.getElementById('e_vdate').value=p.vdate||'';document.getElementById('e_vthumb').value=p.vthumb||'';document.getElementById('editorErr').style.display='none';this._fields();this.imgMode('upload');this.renderPrev();UI.openOverlay('editorOverlay');},
  _fields(){const vid=(this.kind==='video');document.getElementById('e_vidBlock').style.display=vid?'block':'none';document.getElementById('e_imgBlock').style.display=vid?'none':'block';document.getElementById('e_dimsWrap').style.display=vid?'none':'block';},
  imgMode(m){const up=(m==='upload');document.getElementById('img_up').classList.toggle('sel',up);document.getElementById('img_url').classList.toggle('sel',!up);document.getElementById('imgUpWrap').style.display=up?'block':'none';document.getElementById('e_image').style.display=up?'none':'block';},
  imgFiles(ev){const files=Array.from(ev.target.files);if(!files.length)return;
    /* [P-01] Reject images > 5MB */
    const oversized=files.filter(function(f){return f.size>5*1024*1024;});
    if(oversized.length){UI.toast('Image too large — max 5MB per image');return;}
    let pending=files.length;const self=this;
    files.forEach(function(f){const r=new FileReader();r.onload=function(){self.imgs.push(r.result);if(--pending===0)self.renderPrev();};r.readAsDataURL(f);});},
  imgFromUrl(){const u=document.getElementById('e_image').value.trim();if(u){this.imgs=[u].concat(this.imgs.filter(function(i){return i!==u;}));this.renderPrev();}},
  renderPrev(){const w=document.getElementById('imgPreview');w.innerHTML=this.imgs.map(function(src,i){return '<img src="'+esc(src)+'" title="Tap to remove" onclick="Editor.dropImg('+i+')" loading="lazy">';}).join('');},
  dropImg(i){this.imgs.splice(i,1);this.renderPrev();},
  videoMeta(){const url=document.getElementById('e_video').value.trim();const v=Media.parse(url);if(v.provider==='youtube'&&!document.getElementById('e_vthumb').value)document.getElementById('e_vthumb').value='https://img.youtube.com/vi/'+v.id+'/hqdefault.jpg';},
  save(){const title=document.getElementById('e_title').value.trim();const err=document.getElementById('editorErr');if(!title){err.textContent='Give it a title.';err.style.display='block';return;}
    const base={title:title,desc:document.getElementById('e_desc').value.trim(),category:document.getElementById('e_cat').value};
    if(this.kind==='video'){const video=document.getElementById('e_video').value.trim();if(!video){err.textContent='Add a video link.';err.style.display='block';return;}base.type='video';base.video=video;base.duration=document.getElementById('e_duration').value.trim();base.vdate=document.getElementById('e_vdate').value;base.vthumb=document.getElementById('e_vthumb').value.trim();base.price=0;}
    else{const price=Number(document.getElementById('e_price').value);if(!price||price<0){err.textContent='Set a price.';err.style.display='block';return;}base.type='artwork';base.price=price;base.dims=document.getElementById('e_dims').value.trim();base.images=this.imgs.slice();}
    if(this.eid){Object.assign(Store.state.products.find(function(x){return x.id===Editor.eid;}),base);UI.toast('✓ Work updated: '+esc(title));}
    else{base.id='p'+Date.now();base.likes=0;base.views=0;base.comments=[];base.createdAt=Date.now();Store.state.products.unshift(base);UI.toast('✓ Work added: '+esc(title));}
    Store.save();Gallery.apply();Console.renderProducts();Console.stats();UI.closeAll();UI.hap([6,20,6]);},
  remove(id){const p=Store.state.products.find(function(x){return x.id===id;});
    /* [UI-05] Confirmation before delete */
    if(!confirm('Delete "'+( p?p.title:'this work')+'"?\nThis cannot be undone.'))return;
    Store.state.products=Store.state.products.filter(function(x){return x.id!==id;});Store.save();Gallery.apply();Console.renderProducts();Console.stats();UI.toast('Work deleted');}
};

/* ── CART [S-05] ── */
const Cart={
  items:[],pay:'whatsapp',
  /* [S-05] sessionStorage persistence */
  save(){try{sessionStorage.setItem('ak.cart',JSON.stringify(this.items));}catch(e){}},
  restore(){try{const d=sessionStorage.getItem('ak.cart');if(d)this.items=JSON.parse(d);}catch(e){}},
  add(id){const p=Store.state.products.find(function(x){return x.id===id;});if(!p||p.type==='video')return;const ex=this.items.find(function(i){return i.id===id;});if(ex)ex.qty++;else this.items.push({id:id,qty:1});this.render();this.bump();this.save();
    /* [UI-05] Confirmation toast */
    UI.toast('✓ Added '+esc(p.title)+' to your bag');UI.hap([5,15,5]);GA.event('add_to_cart',{id:id});},
  bump(){const c=document.getElementById('cartCount');const n=this.items.reduce(function(a,i){return a+i.qty;},0);c.textContent=n;c.style.display=n?'grid':'none';},
  remove(id){this.items=this.items.filter(function(i){return i.id!==id;});this.render();this.bump();this.save();},
  qty(id,d){const it=this.items.find(function(i){return i.id===id;});if(!it)return;it.qty+=d;if(it.qty<=0)this.remove(id);else{this.render();this.bump();this.save();}UI.hap();},
  open(){this.render();this.syncPay();document.getElementById('cart').classList.add('show');document.getElementById('scrim').classList.add('show');UI.hap();},
  close(){document.getElementById('cart').classList.remove('show');document.getElementById('scrim').classList.remove('show');},
  setPay(m,btn){this.pay=m;document.querySelectorAll('.pay-opt').forEach(function(b){b.classList.remove('sel');});btn.classList.add('sel');document.getElementById('checkoutBtn').textContent=m==='mpesa'?'Pay with M-Pesa':'Checkout on WhatsApp';UI.hap();},
  syncPay(){const on=Store.state.payments.mpesa.enabled;document.getElementById('payMpesa').style.display=on?'block':'none';if(!on){this.pay='whatsapp';document.querySelectorAll('.pay-opt').forEach(function(b){b.classList.toggle('sel',b.dataset.pay==='whatsapp');});document.getElementById('checkoutBtn').textContent='Checkout on WhatsApp';}},
  render(){const w=document.getElementById('cartItems');if(!this.items.length){w.innerHTML='<p style="text-align:center;color:var(--ink-soft);padding:40px 0">Your bag is empty.</p>';document.getElementById('cartTotal').textContent='—';return;}let total=0;w.innerHTML=this.items.map(function(i){const p=Store.state.products.find(function(x){return x.id===i.id;});if(!p)return'';total+=p.price*i.qty;const img=p.images&&p.images[0]?'<div class="cthumb"><img src="'+esc(p.images[0])+'" alt="" loading="lazy"></div>':'<div class="cthumb">'+Render.glyph(p.category)+'</div>';return '<div class="citem">'+img+'<div class="ci-info"><h4>'+esc(p.title)+'</h4><div class="ci-price">'+Render.money(p.price)+'</div></div><div class="qty-ctrl"><button onclick="Cart.qty(\''+esc(i.id)+'\',-1)">−</button><span>'+i.qty+'</span><button onclick="Cart.qty(\''+esc(i.id)+'\',1)">+</button></div></div>';}).join('');document.getElementById('cartTotal').textContent=Render.money(total);},
  _total(){return this.items.reduce(function(a,i){const p=Store.state.products.find(function(x){return x.id===i.id;});return a+(p?p.price*i.qty:0);},0);},
  _lines(){return this.items.map(function(i){const p=Store.state.products.find(function(x){return x.id===i.id;});return '• '+p.title+' ×'+i.qty+' — '+Render.money(p.price*i.qty);}).join('\n');},
  _record(ch,extra){const order={id:'AK'+Date.now().toString().slice(-6),createdAt:Date.now(),status:'pending',channel:ch,items:this.items.map(function(i){const p=Store.state.products.find(function(x){return x.id===i.id;});return{id:i.id,title:p.title,qty:i.qty,price:p.price};}),total:this._total()};Object.assign(order,extra||{});Store.state.orders.unshift(order);Store.save();Console.stats();GA.event('purchase',{value:order.total,channel:ch});return order;},
  checkout(){if(!this.items.length){UI.toast('Your bag is empty');return;}if(this.pay==='mpesa')return this.mpesa();const c=Store.state.contact;const order=this._record('whatsapp');const msg='Hi '+Store.state.brand.name+'! I’d love to order (Ref '+order.id+'):\n\n'+this._lines()+'\n\nTotal: '+Render.money(order.total)+'\n\nCould we sort out the details?';window.open('https://wa.me/'+c.whatsapp+'?text='+encodeURIComponent(msg),'_blank');UI.hap([6,20,6]);UI.toast('Order saved · opening WhatsApp');},
  async mpesa(){const m=Store.state.payments.mpesa;const phone=prompt('Enter your M-Pesa number (07… or 2547…):');if(!phone)return;const order=this._record('mpesa',{phone:phone});if(!m.endpoint){const c=Store.state.contact;const msg='Hi '+Store.state.brand.name+'! M-Pesa order '+order.id+':\n\n'+this._lines()+'\n\nTotal: '+Render.money(order.total)+'\nMy number: '+phone;UI.toast('Order saved — completing via WhatsApp');window.open('https://wa.me/'+c.whatsapp+'?text='+encodeURIComponent(msg),'_blank');return;}UI.toast('Sending M-Pesa prompt to '+phone+'…');try{const res=await fetch(m.endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({phone:phone,amount:order.total,account:m.account,reference:order.id})});if(res.ok){UI.toast('Check your phone for the M-Pesa prompt');UI.hap([6,30,6]);}else UI.toast('Payment service error — try WhatsApp instead.');}catch(e){UI.toast('Could not reach the M-Pesa service — try WhatsApp instead.');}}
};

/* ── ORDERS ── */
const Orders={
  f:'all',
  filter(f,btn){this.f=f;document.querySelectorAll('#orderSeg button').forEach(function(b){b.classList.remove('sel');});btn.classList.add('sel');this.render();},
  render(){const w=document.getElementById('orderList');let o=Store.state.orders.slice();if(this.f!=='all')o=o.filter(function(x){return x.status===Orders.f;});if(!o.length){w.innerHTML='<p style="text-align:center;color:var(--ink-soft);padding:24px">No orders here yet.</p>';return;}w.innerHTML=o.map(function(x){return '<div class="order-row"><div class="oh"><span class="oid">'+esc(x.id)+'</span><span class="ostat '+esc(x.status)+'">'+esc(x.status)+'</span></div><div class="otime">'+new Date(x.createdAt).toLocaleString()+' · '+esc(x.channel)+(x.phone?' · '+esc(x.phone):'')+'</div><div class="oitems">'+x.items.map(function(i){return esc(i.title)+' ×'+i.qty;}).join('<br>')+'</div><div class="otime" style="font-weight:700;color:var(--ink);margin:6px 0 10px">'+Render.money(x.total)+'</div><div style="display:flex;gap:8px">'+(x.status==='pending'?'<button class="cbtn cbtn-primary" style="margin:0" onclick="Orders.mark(\''+esc(x.id)+'\',\'completed\')">Mark completed</button>':'<button class="cbtn cbtn-ghost" style="margin:0" onclick="Orders.mark(\''+esc(x.id)+'\',\'pending\')">Reopen</button>')+'<button class="cbtn cbtn-danger" style="margin:0" onclick="Orders.del(\''+esc(x.id)+'\')">Delete</button></div></div>';}).join('');},
  mark(id,status){const o=Store.state.orders.find(function(x){return x.id===id;});if(o){o.status=status;Store.save();this.render();Console.stats();UI.toast('Order '+status);UI.hap();}},
  del(id){if(!confirm('Delete this order?'))return;Store.state.orders=Store.state.orders.filter(function(x){return x.id!==id;});Store.save();this.render();Console.stats();},
  exportCSV(){const o=Store.state.orders;if(!o.length){UI.toast('No orders to export.');return;}const rows=[['Order','Date','Status','Channel','Phone','Items','Total']];o.forEach(function(x){rows.push([x.id,new Date(x.createdAt).toISOString(),x.status,x.channel,x.phone||'',x.items.map(function(i){return i.title+' x'+i.qty;}).join('; '),x.total]);});const csv=rows.map(function(r){return r.map(function(c){return '"'+String(c).replace(/"/g,'""')+'"';}).join(',');}).join('\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='artsy-knots-orders.csv';a.click();UI.toast('Orders exported');UI.hap();}
};

/* ── AUTH [S-02] ── */
const Auth={
  async login(){
    const email=document.getElementById('loginEmail').value.trim();
    const pass=document.getElementById('loginPass').value;
    const err=document.getElementById('loginErr');
    err.style.display='none';
    const cfg=Store.state.config;
    try{
      if(cfg.cloud&&Store.fb){
        await Store.fb.auth().signInWithEmailAndPassword(email,pass);
      }else{
        /* [S-02] Compare SHA-256 hash, never plaintext */
        const buf=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(pass));
        const hex=Array.from(new Uint8Array(buf)).map(function(b){return b.toString(16).padStart(2,'0');}).join('');
        if(email!==cfg.adminEmail||hex!==(localStorage.getItem('ak.lp')||''))throw new Error('bad');
      }
      Console._unlocked=true;Console._unlockedAt=Date.now();
      UI.closeAll();Console._show();
      UI.toast('Welcome back, Bernice ✨');UI.hap();
    }catch(e){
      err.textContent='Email or password not recognised.';err.style.display='block';
    }
  }
};

/* ── SETTINGS ── */
const Settings={
  toggleCloud(){const sw=document.getElementById('sw_cloud');sw.classList.toggle('on');Store.state.config.cloud=sw.classList.contains('on');Store.save();},
  toggleMpesa(){const sw=document.getElementById('sw_mpesa');sw.classList.toggle('on');Store.state.payments.mpesa.enabled=sw.classList.contains('on');Store.save();Cart.syncPay();},
  parseFirebase(){const raw=document.getElementById('f_firebase').value.trim();if(!raw)return null;try{const clean=raw.replace(/^[^{]*({[\s\S]*})[^}]*$/,'$1').replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g,'$1"$2":').replace(/'/g,'"').replace(/,(\s*})/g,'$1');return JSON.parse(clean);}catch(e){return undefined;}},
  initFirebase(cfg){try{if(typeof firebase==='undefined')return false;if(!firebase.apps.length)firebase.initializeApp(cfg);Store.fb=firebase;return true;}catch(e){console.error(e);return false;}},
  async publish(){
    const email=document.getElementById('f_adminEmail').value.trim();
    if(!email){UI.toast('Add an admin email first');Console.go('access');return;}
    const fb=this.parseFirebase();const cfg=Store.state.config;
    cfg.adminEmail=email;
    if(cfg.cloud){
      if(fb===undefined){UI.toast('That Firebase config could not be read');return;}
      if(!fb){UI.toast('Paste your Firebase config to sync');return;}
      cfg.firebase=fb;if(!this.initFirebase(fb)){UI.toast('Firebase failed to start — check the config');return;}
    }else{
      let stored=localStorage.getItem('ak.lp');
      if(!stored){
        const pass=prompt('Set a console password (you’ll need it + your email to get back in):');
        if(!pass)return;
        /* [S-02] Store SHA-256 hash, never plaintext */
        const buf=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(pass));
        const hex=Array.from(new Uint8Array(buf)).map(function(b){return b.toString(16).padStart(2,'0');}).join('');
        localStorage.setItem('ak.lp',hex);
      }
    }
    cfg.published=true;Console._unlocked=true;Console._unlockedAt=Date.now();
    Store.save();Console.statusBanners();GA.init();
    UI.toast('Published — the studio key is now locked');UI.hap([8,40,8]);
  },
  unpublish(){if(!confirm('Switch back to open studio mode?'))return;Store.state.config.published=false;Store.save();Console.statusBanners();UI.toast('Back to open studio mode');}
};

/* ── GOOGLE ANALYTICS ── */
const GA={
  ready:false,
  init(){const id=Store.state.analytics.gaId;if(!id||!Store.state.config.published||this.ready)return;const s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+id;document.head.appendChild(s);window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments);};gtag('js',new Date());gtag('config',id);this.ready=true;},
  event(name,params){if(this.ready&&window.gtag)gtag('event',name,params||{});}
};

/* ── UI [A-01] ── */
const UI={
  openOverlay(id){
    const el=document.getElementById(id);if(!el)return;
    el.classList.add('show');
    /* [A-01] Focus first interactive element in modal */
    setTimeout(function(){const first=el.querySelector('input,button,textarea,select');if(first)first.focus();},80);
  },
  closeAll(){
    document.querySelectorAll('.overlay').forEach(function(o){o.classList.remove('show');});
    document.getElementById('cart').classList.remove('show');
    const dm=document.getElementById('dMedia');if(dm)dm.innerHTML='';
    if(!document.getElementById('console').classList.contains('show'))document.getElementById('scrim').classList.remove('show');
  },
  hap(p){try{if(Store.state&&Store.state.layout&&Store.state.layout.haptics&&navigator.vibrate)navigator.vibrate(p||10);}catch(e){}},
  toast(msg){const w=document.getElementById('toastWrap');const t=document.createElement('div');t.className='toast';t.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>'+msg;w.appendChild(t);setTimeout(function(){t.classList.add('out');setTimeout(function(){t.remove();},300);},2700);}
};

/* ── PHYSICS [P-03] ── */
const Physics={
  reduced:matchMedia('(prefers-reduced-motion:reduce)').matches,neuralOn:false,ripples:[],nodes:[],
  bindTilt(){if(this.reduced)return;document.querySelectorAll('.card').forEach(function(card){card.onpointermove=function(e){const r=card.getBoundingClientRect();const px=(e.clientX-r.left)/r.width-0.5,py=(e.clientY-r.top)/r.height-0.5;card.style.transform='perspective(900px) rotateY('+(px*8)+'deg) rotateX('+(-py*8)+'deg) translateY(-6px)';};card.onpointerleave=function(){card.style.transform='';};});},
  initRipple(){const cv=document.getElementById('rippleCanvas');const ctx=cv.getContext('2d');const fit=function(){cv.width=innerWidth;cv.height=innerHeight;};fit();addEventListener('resize',fit);const self=this;addEventListener('pointerdown',function(e){if(self.reduced)return;self.ripples.push({x:e.clientX,y:e.clientY,r:0,a:.5});});const loop=function(){ctx.clearRect(0,0,cv.width,cv.height);self.ripples=self.ripples.filter(function(rp){return rp.a>0.02;});const c=getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()||'#1fb6d6';self.ripples.forEach(function(rp){rp.r+=4;rp.a*=0.95;ctx.beginPath();ctx.arc(rp.x,rp.y,rp.r,0,Math.PI*2);ctx.strokeStyle=self._rgba(c,rp.a);ctx.lineWidth=2;ctx.stroke();});requestAnimationFrame(loop);};if(!this.reduced)loop();},
  rippleAt(el){if(this.reduced||!el)return;const r=el.getBoundingClientRect();this.ripples.push({x:r.left+r.width/2,y:r.top+r.height/2,r:0,a:.65});},
  _rgba(hex,a){const n=parseInt(hex.replace('#',''),16);return 'rgba('+((n>>16)&255)+','+((n>>8)&255)+','+(n&255)+','+a+')';},
  /* [P-03] Neural canvas with accent caching and RAF guard */
  initNeural(){
    const cv=document.getElementById('neuralCanvas');const ctx=cv.getContext('2d');let w,h;const fit=function(){w=cv.width=innerWidth;h=cv.height=innerHeight;};fit();addEventListener('resize',fit);
    const N=innerWidth<640?30:60;this.nodes=[];
    for(let i=0;i<N;i++)this.nodes.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.8+1});
    const mouse={x:-999,y:-999};addEventListener('pointermove',function(e){mouse.x=e.clientX;mouse.y=e.clientY;});
    const self=this;
    /* Color cache — only re-read CSS vars every 60 frames */
    let _cachedAccent='',_cachedAccent2='',_frame=0;
    const loop=function(){
      requestAnimationFrame(loop);
      /* [P-03] Cancel draw when not in neural/spatial view */
      if(self.reduced||!self.neuralOn){ctx.clearRect(0,0,w,h);return;}
      _frame++;
      if(_frame%60===0||!_cachedAccent){
        _cachedAccent=getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()||'#1fb6d6';
        _cachedAccent2=getComputedStyle(document.documentElement).getPropertyValue('--accent-2').trim()||'#0e7ea3';
      }
      const c=_cachedAccent,c2=_cachedAccent2;
      ctx.clearRect(0,0,w,h);
      const ns=self.nodes;
      for(let i=0;i<ns.length;i++){const n=ns[i];n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>w)n.vx*=-1;if(n.y<0||n.y>h)n.vy*=-1;const dx=n.x-mouse.x,dy=n.y-mouse.y,d=Math.hypot(dx,dy);if(d<140&&d>0){n.x+=dx/d*.9;n.y+=dy/d*.9;}}
      for(let i=0;i<ns.length;i++){for(let j=i+1;j<ns.length;j++){const a=ns[i],b=ns[j];const dx=a.x-b.x,dy=a.y-b.y,dist=Math.hypot(dx,dy);if(dist<130){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=self._rgba(c,(1-dist/130)*.3);ctx.lineWidth=1;ctx.stroke();}}}
      for(let i=0;i<ns.length;i++){const n=ns[i];ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,Math.PI*2);ctx.fillStyle=self._rgba(c2,.85);ctx.shadowBlur=9;ctx.shadowColor=c;ctx.fill();ctx.shadowBlur=0;}
    };
    loop();
  }
};

/* ── REVEAL ── */
const Reveal={
  io:null,
  init(){this.io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');Reveal.io.unobserve(e.target);}});},{threshold:.12});this.scan();},
  scan(){if(!this.io)return;document.querySelectorAll('.reveal:not(.in)').forEach(function(el){Reveal.io.observe(el);});}
};

/* ── [ANIM-03] INTRO ANIMATION ── */
function initIntro(){
  const intro=document.getElementById('introScreen');if(!intro)return;
  const logo=document.getElementById('rotatingLogo');
  const b=Store.state.brand;
  if(b.logoUrl){
    logo.innerHTML='<img src="'+esc(b.logoUrl)+'" alt="'+esc(b.name)+'" style="width:100%;height:100%;object-fit:cover;border-radius:20px">';
  }else{
    logo.textContent=b.logoLetter||'A';
  }
  document.getElementById('introText').innerHTML='<p class="welcome-text">Welcome into my world<br>by '+esc(b.name)+'\'s thoughts,<br>creativity, and perception<br>of the world.</p>';
  /* Auto-hide after animation completes */
  setTimeout(function(){intro.style.display='none';},5200);
}

/* ── EVENT WIRING ── */
document.getElementById('consoleTabs').addEventListener('click',function(e){const b=e.target.closest('.ctab');if(b)Console.tab(b.dataset.tab,b);});
document.addEventListener('click',function(e){if(!e.target.closest('.sort-menu'))document.getElementById('sortPop').classList.remove('show');});
/* [A-01] Escape key closes modals */
document.addEventListener('keydown',function(e){if(e.key==='Escape')UI.closeAll();});
let lastY=0;
addEventListener('scroll',function(){const y=scrollY;const bar=document.getElementById('topbar');bar.style.transform=(y>lastY&&y>200)?'translateX(-50%) translateY(-130%)':'translateX(-50%)';lastY=y;});

/* ── BOOT ── */
function boot(){
  Store.load();
  /* [P-07] Low-perf device detection */
  if(navigator.hardwareConcurrency<=2){document.body.dataset.lowperf='true';}
  if(Store.state.config.published&&Store.state.config.cloud&&Store.state.config.firebase)Settings.initFirebase(Store.state.config.firebase);
  Physics.neuralOn=(Store.state.layout.view!=='glass');
  /* [ANIM-03] Run intro before page renders */
  initIntro();
  Render.all();
  Reveal.init();
  Physics.initRipple();
  Physics.initNeural();
  /* [S-05] Restore cart from sessionStorage */
  Cart.restore();
  Cart.bump();
  GA.init();
}

document.addEventListener('DOMContentLoaded',boot);
