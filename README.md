<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>Hudson Oaks — Handmade Art, Made by Hand</title>
<meta name="description" content="Hudson Oaks — handmade tufted rugs, canvas art, and resin creations. Custom commissions welcome.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
/* ============================================================
   HUDSON OAKS — Liquid Glass System
   ============================================================ */
*{margin:0;padding:0;box-sizing:border-box}
:root{
  /* ---- WATER PALETTE ---- */
  --abyss:#031b2e;
  --deep:#0a2f4d;
  --ocean:#0e4d6b;
  --tide:#1488a6;
  --aqua:#34c6e0;
  --seafoam:#8fe3e8;
  --foam:#eaf7fb;
  --mist:#f4fbfd;
  --ink:#06243a;
  --ink-soft:#3d5d72;
  --white:#ffffff;

  /* ---- THEMEABLE (overwritten by control panel) ---- */
  --accent:#1fb6d6;
  --accent-2:#0e7ea3;
  --bg-1:#dff3fa;
  --bg-2:#bfe9f5;
  --bg-3:#eafaff;
  --text:#06243a;
  --radius:26px;

  /* ---- GLASS ---- */
  --glass-fill:rgba(255,255,255,0.22);
  --glass-fill-strong:rgba(255,255,255,0.42);
  --glass-stroke:rgba(255,255,255,0.55);
  --glass-stroke-soft:rgba(255,255,255,0.30);
  --glass-shadow:0 18px 50px -12px rgba(8,55,80,0.45);
  --glass-inner:inset 0 1px 0 rgba(255,255,255,0.65), inset 0 -1px 1px rgba(10,60,90,0.12);
  --blur:22px;

  --serif:'Fraunces',Georgia,serif;
  --sans:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
}

html{scroll-behavior:smooth;font-size:16px;-webkit-text-size-adjust:100%}
body{
  font-family:var(--sans);
  color:var(--text);
  line-height:1.6;
  overflow-x:hidden;
  position:relative;
  min-height:100vh;
  background:var(--bg-3);
}

/* ---- LIVING WATER BACKDROP (spatial / ambient) ---- */
#waterField{position:fixed;inset:0;z-index:-3;background:
  radial-gradient(120% 120% at 15% 10%, var(--bg-3) 0%, var(--bg-1) 40%, var(--bg-2) 100%);
}
#caustics{position:fixed;inset:-20%;z-index:-2;pointer-events:none;opacity:.55;
  background:
    radial-gradient(40% 30% at 30% 25%, rgba(255,255,255,.55), transparent 60%),
    radial-gradient(35% 25% at 70% 35%, rgba(143,227,232,.5), transparent 60%),
    radial-gradient(45% 35% at 55% 75%, rgba(52,198,224,.35), transparent 65%),
    radial-gradient(30% 25% at 20% 80%, rgba(255,255,255,.4), transparent 60%);
  filter:blur(30px);
  animation:drift 24s ease-in-out infinite alternate;
}
@keyframes drift{
  0%{transform:translate3d(-2%, -1%,0) scale(1.05) rotate(0deg)}
  50%{transform:translate3d(3%, 2%,0) scale(1.12) rotate(2deg)}
  100%{transform:translate3d(-1%, 3%,0) scale(1.08) rotate(-2deg)}
}
#rippleCanvas{position:fixed;inset:0;z-index:-1;pointer-events:none;opacity:.4}

a{color:inherit;text-decoration:none}
img{display:block;max-width:100%;height:auto}
button{font-family:inherit;cursor:pointer;border:none;background:none;color:inherit}

/* ============================================================
   REUSABLE GLASS
   ============================================================ */
.glass{
  background:var(--glass-fill);
  backdrop-filter:blur(var(--blur)) saturate(180%);
  -webkit-backdrop-filter:blur(var(--blur)) saturate(180%);
  border:1px solid var(--glass-stroke-soft);
  box-shadow:var(--glass-shadow),var(--glass-inner);
  border-radius:var(--radius);
  position:relative;
  overflow:hidden;
}
/* specular top-edge highlight = liquid glass signature */
.glass::before{
  content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;
  background:linear-gradient(160deg,rgba(255,255,255,.55) 0%,rgba(255,255,255,.05) 18%,transparent 40%);
  mix-blend-mode:screen;
}
.glass-strong{background:var(--glass-fill-strong)}

/* ============================================================
   FLOATING HEADER (glass pill dock)
   ============================================================ */
.topbar{
  position:fixed;top:18px;left:50%;transform:translateX(-50%);
  z-index:200;width:min(1120px,94vw);
  display:flex;align-items:center;justify-content:space-between;
  padding:10px 12px 10px 20px;border-radius:999px;
  background:var(--glass-fill);
  backdrop-filter:blur(var(--blur)) saturate(180%);
  -webkit-backdrop-filter:blur(var(--blur)) saturate(180%);
  border:1px solid var(--glass-stroke-soft);
  box-shadow:var(--glass-shadow),var(--glass-inner);
  transition:transform .5s cubic-bezier(.22,1,.36,1),box-shadow .4s;
}
.topbar::before{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;
  background:linear-gradient(160deg,rgba(255,255,255,.5),transparent 45%);mix-blend-mode:screen}
.brand{display:flex;align-items:center;gap:11px;font-weight:600;position:relative;z-index:1}
.brand .logo-wrap{width:38px;height:38px;border-radius:13px;display:grid;place-items:center;
  background:linear-gradient(135deg,var(--accent),var(--accent-2));
  box-shadow:0 6px 16px -4px var(--accent),inset 0 1px 0 rgba(255,255,255,.6);flex-shrink:0;overflow:hidden}
.brand .logo-wrap img{width:100%;height:100%;object-fit:cover}
.brand .name{font-family:var(--serif);font-size:1.18rem;letter-spacing:.3px;line-height:1;color:var(--ink)}
.brand .name small{display:block;font-family:var(--sans);font-size:.6rem;letter-spacing:.32em;
  text-transform:uppercase;color:var(--ink-soft);font-weight:600;margin-top:3px}
.nav{display:flex;align-items:center;gap:6px;position:relative;z-index:1}
.nav a{font-size:.9rem;font-weight:500;color:var(--ink);padding:9px 15px;border-radius:999px;transition:.25s;white-space:nowrap}
.nav a:hover{background:rgba(255,255,255,.5)}
.icon-btn{width:42px;height:42px;border-radius:999px;display:grid;place-items:center;transition:.25s;
  background:rgba(255,255,255,.4);border:1px solid var(--glass-stroke-soft)}
.icon-btn:hover{background:#fff;transform:translateY(-1px)}
.icon-btn .count{position:absolute;top:-3px;right:-3px;background:var(--accent);color:#fff;font-size:.62rem;
  font-weight:700;min-width:18px;height:18px;border-radius:9px;display:grid;place-items:center;padding:0 4px;
  box-shadow:0 2px 6px rgba(0,0,0,.2)}
.nav-toggle{display:none}

/* ============================================================
   HERO
   ============================================================ */
.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;
  text-align:center;padding:140px 6vw 90px;position:relative}
.hero .eyebrow{display:inline-flex;align-items:center;gap:8px;padding:8px 16px;border-radius:999px;
  font-size:.74rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--ocean);
  background:var(--glass-fill-strong);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
  border:1px solid var(--glass-stroke);box-shadow:var(--glass-inner);margin-bottom:30px}
.hero .eyebrow .dot{width:7px;height:7px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 4px rgba(31,182,214,.25)}
.hero h1{font-family:var(--serif);font-weight:500;font-size:clamp(2.8rem,8vw,6rem);line-height:1.02;
  letter-spacing:-.02em;color:var(--ink);max-width:14ch;margin-bottom:24px}
.hero h1 em{font-style:italic;color:var(--tide)}
.hero p.lede{font-size:clamp(1.05rem,2vw,1.32rem);max-width:46ch;color:var(--ink-soft);margin-bottom:40px}
.hero-cta{display:flex;gap:14px;flex-wrap:wrap;justify-content:center}
.btn{display:inline-flex;align-items:center;gap:9px;padding:15px 30px;border-radius:999px;
  font-weight:600;font-size:.98rem;transition:transform .3s cubic-bezier(.22,1,.36,1),box-shadow .3s;cursor:pointer}
.btn-primary{background:linear-gradient(135deg,var(--accent),var(--accent-2));color:#fff;
  box-shadow:0 12px 30px -8px var(--accent),inset 0 1px 0 rgba(255,255,255,.5)}
.btn-primary:hover{transform:translateY(-3px);box-shadow:0 18px 40px -8px var(--accent),inset 0 1px 0 rgba(255,255,255,.5)}
.btn-glass{background:var(--glass-fill-strong);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
  border:1px solid var(--glass-stroke);color:var(--ink);box-shadow:var(--glass-inner)}
.btn-glass:hover{transform:translateY(-3px);background:#fff}
.scroll-hint{position:absolute;bottom:30px;left:50%;transform:translateX(-50%);color:var(--ink-soft);
  font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;display:flex;flex-direction:column;
  align-items:center;gap:8px;animation:bob 2.4s ease-in-out infinite}
@keyframes bob{0%,100%{transform:translate(-50%,0)}50%{transform:translate(-50%,8px)}}

/* section scaffolding */
.section{max-width:1180px;margin:0 auto;padding:90px 6vw;position:relative}
.section-head{text-align:center;margin-bottom:56px}
.section-head .kicker{font-size:.76rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;
  color:var(--accent);margin-bottom:14px}
.section-head h2{font-family:var(--serif);font-weight:500;font-size:clamp(2rem,5vw,3.2rem);
  line-height:1.05;letter-spacing:-.01em;color:var(--ink)}
.section-head p{max-width:52ch;margin:18px auto 0;color:var(--ink-soft);font-size:1.05rem}

/* reveal on scroll */
.reveal{opacity:0;transform:translateY(28px);transition:opacity .8s cubic-bezier(.22,1,.36,1),transform .8s cubic-bezier(.22,1,.36,1)}
.reveal.in{opacity:1;transform:none}

@media (prefers-reduced-motion:reduce){
  *{animation:none!important;transition-duration:.01ms!important}
  .reveal{opacity:1;transform:none}
}

/* ============================================================
   GALLERY
   ============================================================ */
.filters{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:46px}
.chip{padding:11px 22px;border-radius:999px;font-weight:600;font-size:.9rem;color:var(--ink-soft);
  background:var(--glass-fill);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
  border:1px solid var(--glass-stroke-soft);transition:.3s;cursor:pointer}
.chip:hover{color:var(--ink);background:rgba(255,255,255,.6)}
.chip.active{background:linear-gradient(135deg,var(--accent),var(--accent-2));color:#fff;border-color:transparent;
  box-shadow:0 8px 20px -6px var(--accent)}

.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:26px}
.card{border-radius:var(--radius);overflow:hidden;cursor:pointer;position:relative;
  background:var(--glass-fill);backdrop-filter:blur(var(--blur)) saturate(180%);
  -webkit-backdrop-filter:blur(var(--blur)) saturate(180%);
  border:1px solid var(--glass-stroke-soft);box-shadow:var(--glass-shadow),var(--glass-inner);
  transform-style:preserve-3d;transition:box-shadow .4s,transform .15s ease-out;will-change:transform}
.card::before{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:3;
  background:linear-gradient(160deg,rgba(255,255,255,.45),transparent 40%);mix-blend-mode:screen}
.card:hover{box-shadow:0 30px 60px -18px rgba(8,55,80,.55),var(--glass-inner)}
.card .ph{height:230px;position:relative;overflow:hidden;
  background:linear-gradient(135deg,var(--seafoam),var(--foam));display:grid;place-items:center;transform:translateZ(20px)}
.card .ph img{width:100%;height:100%;object-fit:cover}
.card .ph .glyph{font-size:3rem;opacity:.5}
.like-pill{position:absolute;top:12px;right:12px;z-index:4;display:inline-flex;align-items:center;gap:5px;
  padding:6px 11px;border-radius:999px;font-size:.78rem;font-weight:700;color:var(--ink);
  background:var(--glass-fill-strong);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
  border:1px solid var(--glass-stroke)}
.card .body{padding:22px;transform:translateZ(35px)}
.card .body h3{font-family:var(--serif);font-weight:500;font-size:1.28rem;color:var(--ink);margin-bottom:7px;line-height:1.15}
.card .body .desc{font-size:.92rem;color:var(--ink-soft);margin-bottom:14px;display:-webkit-box;
  -webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.card .meta{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.card .price{font-family:var(--serif);font-weight:600;font-size:1.32rem;color:var(--tide)}
.tag{font-size:.66rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--accent-2);
  background:rgba(31,182,214,.14);padding:5px 11px;border-radius:999px}
.card .actions{display:flex;gap:9px}
.act{flex:1;padding:11px;border-radius:13px;font-weight:600;font-size:.88rem;display:inline-flex;
  align-items:center;justify-content:center;gap:6px;transition:.25s;cursor:pointer}
.act-like{background:rgba(255,255,255,.55);color:var(--ink);border:1px solid var(--glass-stroke-soft)}
.act-like:hover{background:#fff}.act-like.liked{background:#ffe3f1;color:#d6489a;border-color:transparent}
.act-cart{background:linear-gradient(135deg,var(--accent),var(--accent-2));color:#fff;
  box-shadow:0 8px 18px -6px var(--accent)}
.act-cart:hover{transform:translateY(-2px)}
.empty{grid-column:1/-1;text-align:center;padding:70px 20px;color:var(--ink-soft)}

/* ABOUT / PHILOSOPHY */
.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:54px;align-items:center}
.about-portrait{aspect-ratio:4/5;border-radius:var(--radius);overflow:hidden;position:relative;
  box-shadow:var(--glass-shadow);background:linear-gradient(135deg,var(--seafoam),var(--foam))}
.about-portrait img{width:100%;height:100%;object-fit:cover}
.about-copy .kicker{color:var(--accent);font-size:.76rem;font-weight:700;letter-spacing:.22em;
  text-transform:uppercase;margin-bottom:14px}
.about-copy h2{font-family:var(--serif);font-weight:500;font-size:clamp(1.8rem,4vw,2.7rem);
  line-height:1.1;color:var(--ink);margin-bottom:20px}
.about-copy p{color:var(--ink-soft);margin-bottom:16px;font-size:1.04rem}
.quote{margin-top:26px;padding:22px 26px;border-radius:18px;font-style:italic;color:var(--ocean);
  background:var(--glass-fill);border-left:3px solid var(--accent);
  backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
.beliefs{display:flex;flex-wrap:wrap;gap:9px;margin-top:24px}
.belief{font-size:.86rem;font-weight:500;padding:9px 15px;border-radius:999px;color:var(--ocean);
  background:rgba(255,255,255,.5);border:1px solid var(--glass-stroke-soft)}

/* CONTACT */
.contact-card{text-align:center;padding:60px 40px}
.contact-card h2{font-family:var(--serif);font-weight:500;font-size:clamp(1.8rem,4vw,2.8rem);color:var(--ink);margin-bottom:16px}
.contact-card p{color:var(--ink-soft);max-width:46ch;margin:0 auto 30px;font-size:1.05rem}
.contact-rows{display:flex;flex-direction:column;gap:12px;max-width:380px;margin:0 auto 30px}
.contact-row{display:flex;align-items:center;justify-content:center;gap:10px;padding:14px;border-radius:14px;
  background:rgba(255,255,255,.45);border:1px solid var(--glass-stroke-soft);font-weight:500;color:var(--ink)}
.socials{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.social{padding:13px 24px;border-radius:999px;font-weight:600;color:var(--ink);
  background:var(--glass-fill-strong);border:1px solid var(--glass-stroke);transition:.3s}
.social:hover{background:#fff;transform:translateY(-2px)}

footer{text-align:center;padding:50px 6vw 40px;color:var(--ink-soft);font-size:.9rem}
footer .fmark{font-family:var(--serif);font-size:1.3rem;color:var(--ink);margin-bottom:8px}

/* ============================================================
   CONTROL LAUNCHER (floating dock)
   ============================================================ */
.launcher{position:fixed;bottom:24px;right:24px;z-index:300;display:flex;flex-direction:column;gap:12px;align-items:flex-end}
.launch-btn{width:60px;height:60px;border-radius:20px;display:grid;place-items:center;
  background:linear-gradient(135deg,var(--accent),var(--accent-2));color:#fff;
  box-shadow:0 14px 34px -8px var(--accent),inset 0 1px 0 rgba(255,255,255,.5);
  transition:transform .35s cubic-bezier(.22,1,.36,1)}
.launch-btn:hover{transform:translateY(-3px) scale(1.04)}
.launch-btn:active{transform:scale(.95)}

/* ============================================================
   CONTROL CONSOLE (glass slide-in)
   ============================================================ */
.console{position:fixed;top:0;right:0;height:100%;width:min(560px,100vw);z-index:1000;
  transform:translateX(105%);transition:transform .55s cubic-bezier(.22,1,.36,1);
  display:flex;flex-direction:column;
  background:linear-gradient(160deg,rgba(255,255,255,.34),rgba(214,240,250,.3));
  backdrop-filter:blur(34px) saturate(180%);-webkit-backdrop-filter:blur(34px) saturate(180%);
  border-left:1px solid var(--glass-stroke);box-shadow:-30px 0 80px -20px rgba(8,55,80,.5)}
.console.show{transform:translateX(0)}
.console-head{padding:22px 24px;display:flex;align-items:center;justify-content:between;gap:12px;
  border-bottom:1px solid var(--glass-stroke-soft);justify-content:space-between}
.console-head .ttl{display:flex;align-items:center;gap:11px}
.console-head .ttl .ic{width:40px;height:40px;border-radius:13px;display:grid;place-items:center;
  background:linear-gradient(135deg,var(--accent),var(--accent-2));color:#fff}
.console-head h3{font-family:var(--serif);font-weight:600;font-size:1.25rem;color:var(--ink);line-height:1}
.console-head .sub{font-size:.72rem;color:var(--ink-soft);letter-spacing:.04em}
.x-btn{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;font-size:1.4rem;
  background:rgba(255,255,255,.5);color:var(--ink-soft);transition:.25s}
.x-btn:hover{background:#fff;color:var(--ink)}
.console-tabs{display:flex;gap:6px;padding:14px 18px;overflow-x:auto;border-bottom:1px solid var(--glass-stroke-soft);scrollbar-width:none}
.console-tabs::-webkit-scrollbar{display:none}
.ctab{padding:9px 14px;border-radius:12px;font-size:.84rem;font-weight:600;color:var(--ink-soft);
  white-space:nowrap;transition:.25s;display:inline-flex;align-items:center;gap:6px}
.ctab:hover{background:rgba(255,255,255,.5);color:var(--ink)}
.ctab.active{background:linear-gradient(135deg,var(--accent),var(--accent-2));color:#fff}
.console-body{flex:1;overflow-y:auto;padding:24px}
.cpanel{display:none;animation:fadeUp .4s ease}.cpanel.active{display:block}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}

.field{margin-bottom:18px}
.field label{display:block;font-size:.82rem;font-weight:600;color:var(--ink);margin-bottom:7px}
.field .hint{font-size:.74rem;color:var(--ink-soft);margin-top:5px;line-height:1.4}
.input,.textarea,.select{width:100%;padding:12px 14px;border-radius:13px;font-family:inherit;font-size:.92rem;
  color:var(--ink);background:rgba(255,255,255,.6);border:1px solid var(--glass-stroke-soft);transition:.25s}
.input:focus,.textarea:focus,.select:focus{outline:none;border-color:var(--accent);background:#fff;
  box-shadow:0 0 0 4px rgba(31,182,214,.18)}
.textarea{resize:vertical;min-height:92px;font-family:'Inter',monospace}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.cbtn{width:100%;padding:13px;border-radius:14px;font-weight:600;font-size:.94rem;transition:.3s;margin-top:6px}
.cbtn-primary{background:linear-gradient(135deg,var(--accent),var(--accent-2));color:#fff;box-shadow:0 10px 24px -8px var(--accent)}
.cbtn-primary:hover{transform:translateY(-2px)}
.cbtn-ghost{background:rgba(255,255,255,.55);color:var(--ink);border:1px solid var(--glass-stroke-soft)}
.cbtn-danger{background:#ffe5e5;color:#c0392b;border:1px solid #ffcaca}
.cbtn-danger:hover{background:#ffd5d5}

.swatches{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:10px}
.swatch{aspect-ratio:1;border-radius:14px;cursor:pointer;border:3px solid transparent;transition:.25s;position:relative;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.6),0 4px 10px rgba(0,0,0,.1)}
.swatch:hover{transform:scale(1.06)}
.swatch.sel{border-color:var(--ink);box-shadow:0 0 0 3px rgba(255,255,255,.7),0 6px 14px rgba(0,0,0,.18)}
.layout-opts{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.layout-opt{padding:16px;border-radius:16px;cursor:pointer;text-align:center;transition:.25s;
  background:rgba(255,255,255,.5);border:2px solid var(--glass-stroke-soft)}
.layout-opt:hover{background:#fff}
.layout-opt.sel{border-color:var(--accent);background:#fff;box-shadow:0 0 0 3px rgba(31,182,214,.15)}
.layout-opt .lname{font-weight:600;font-size:.92rem;margin-top:8px}
.layout-opt .ldesc{font-size:.74rem;color:var(--ink-soft);margin-top:3px}

/* admin product rows */
.padmin{display:flex;gap:14px;align-items:center;padding:14px;border-radius:16px;margin-bottom:12px;
  background:rgba(255,255,255,.5);border:1px solid var(--glass-stroke-soft)}
.padmin img{width:60px;height:60px;border-radius:12px;object-fit:cover;flex-shrink:0;background:var(--foam)}
.padmin .pinfo{flex:1;min-width:0}
.padmin .pinfo h4{font-size:.96rem;font-weight:600;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.padmin .pinfo span{font-size:.8rem;color:var(--ink-soft)}
.padmin .pacts{display:flex;gap:6px}
.mini{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;transition:.25s}
.mini-edit{background:rgba(31,182,214,.15);color:var(--accent-2)}.mini-edit:hover{background:var(--accent);color:#fff}
.mini-del{background:#ffe5e5;color:#c0392b}.mini-del:hover{background:#c0392b;color:#fff}

.stat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:22px}
.stat{padding:18px;border-radius:16px;text-align:center;
  background:linear-gradient(135deg,rgba(143,227,232,.4),rgba(255,255,255,.4));border:1px solid var(--glass-stroke-soft)}
.stat .num{font-family:var(--serif);font-size:1.9rem;font-weight:600;color:var(--tide)}
.stat .lbl{font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-soft);margin-top:4px}

.status-banner{padding:13px 16px;border-radius:14px;font-size:.86rem;font-weight:500;margin-bottom:18px;
  display:flex;align-items:center;gap:9px}
.status-dev{background:rgba(255,196,0,.16);color:#9a6b00;border:1px solid rgba(255,196,0,.3)}
.status-live{background:rgba(31,182,214,.14);color:var(--accent-2);border:1px solid rgba(31,182,214,.3)}

.toggle-row{display:flex;align-items:center;justify-content:space-between;padding:14px;border-radius:14px;
  background:rgba(255,255,255,.5);border:1px solid var(--glass-stroke-soft);margin-bottom:14px}
.toggle-row .tlabel{font-weight:600;font-size:.9rem;color:var(--ink)}
.toggle-row .tlabel small{display:block;font-weight:400;font-size:.76rem;color:var(--ink-soft);margin-top:2px}
.switch{width:48px;height:28px;border-radius:999px;background:rgba(8,55,80,.2);position:relative;transition:.3s;flex-shrink:0;cursor:pointer}
.switch::after{content:'';position:absolute;top:3px;left:3px;width:22px;height:22px;border-radius:50%;
  background:#fff;transition:.3s;box-shadow:0 2px 5px rgba(0,0,0,.2)}
.switch.on{background:var(--accent)}.switch.on::after{transform:translateX(20px)}

/* ============================================================
   CART DRAWER
   ============================================================ */
.cart{position:fixed;top:0;right:0;height:100%;width:min(440px,100vw);z-index:900;
  transform:translateX(105%);transition:transform .5s cubic-bezier(.22,1,.36,1);display:flex;flex-direction:column;
  background:linear-gradient(160deg,rgba(255,255,255,.36),rgba(214,240,250,.3));
  backdrop-filter:blur(34px) saturate(180%);-webkit-backdrop-filter:blur(34px) saturate(180%);
  border-left:1px solid var(--glass-stroke);box-shadow:-30px 0 80px -20px rgba(8,55,80,.5)}
.cart.show{transform:translateX(0)}
.cart-head{padding:22px 24px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--glass-stroke-soft)}
.cart-head h3{font-family:var(--serif);font-weight:600;font-size:1.3rem;color:var(--ink)}
.cart-items{flex:1;overflow-y:auto;padding:18px 24px}
.citem{display:flex;gap:12px;align-items:center;padding:12px 0;border-bottom:1px solid var(--glass-stroke-soft)}
.citem img{width:56px;height:56px;border-radius:12px;object-fit:cover;background:var(--foam)}
.citem .ci-info{flex:1;min-width:0}
.citem .ci-info h4{font-size:.92rem;font-weight:600;color:var(--ink)}
.citem .ci-info .ci-price{font-size:.86rem;color:var(--tide);font-weight:600}
.qty{display:flex;align-items:center;gap:8px}
.qty button{width:26px;height:26px;border-radius:8px;display:grid;place-items:center;
  background:rgba(255,255,255,.6);border:1px solid var(--glass-stroke-soft);font-weight:700}
.cart-foot{padding:20px 24px;border-top:1px solid var(--glass-stroke-soft)}
.cart-total{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;font-size:1.05rem}
.cart-total strong{font-family:var(--serif);font-size:1.5rem;color:var(--tide)}

/* MODAL (login + product editor) */
.overlay{position:fixed;inset:0;z-index:1100;display:none;align-items:center;justify-content:center;padding:20px;
  background:rgba(3,27,46,.4);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
.overlay.show{display:flex;animation:fadeIn .3s}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.modal{width:100%;max-width:440px;max-height:90vh;overflow-y:auto;padding:30px;border-radius:28px;
  background:linear-gradient(160deg,rgba(255,255,255,.7),rgba(234,247,251,.65));
  backdrop-filter:blur(30px) saturate(180%);-webkit-backdrop-filter:blur(30px) saturate(180%);
  border:1px solid var(--glass-stroke);box-shadow:0 30px 80px -20px rgba(8,55,80,.6);animation:popIn .4s cubic-bezier(.22,1,.36,1)}
@keyframes popIn{from{opacity:0;transform:scale(.94) translateY(20px)}to{opacity:1;transform:none}}
.modal h3{font-family:var(--serif);font-weight:600;font-size:1.5rem;color:var(--ink);margin-bottom:6px}
.modal .msub{color:var(--ink-soft);font-size:.9rem;margin-bottom:22px}
.modal-err{background:#ffe5e5;color:#c0392b;padding:11px 14px;border-radius:12px;font-size:.86rem;margin-bottom:14px;display:none}

/* TOAST */
.toast-wrap{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:2000;display:flex;flex-direction:column;gap:10px;align-items:center}
.toast{padding:13px 22px;border-radius:999px;font-weight:600;font-size:.9rem;color:var(--ink);
  background:var(--glass-fill-strong);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);
  border:1px solid var(--glass-stroke);box-shadow:var(--glass-shadow);
  animation:toastIn .4s cubic-bezier(.22,1,.36,1);display:flex;align-items:center;gap:9px}
@keyframes toastIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
.toast.out{animation:toastOut .3s forwards}
@keyframes toastOut{to{opacity:0;transform:translateY(20px)}}

.scrim{position:fixed;inset:0;z-index:850;background:rgba(3,27,46,.25);backdrop-filter:blur(2px);
  opacity:0;visibility:hidden;transition:.4s}
.scrim.show{opacity:1;visibility:visible}

/* ---- LAYOUT VARIANTS (switchable from console) ---- */
body[data-layout="editorial"] .grid{grid-template-columns:repeat(auto-fill,minmax(420px,1fr))}
body[data-layout="editorial"] .card .ph{height:300px}
body[data-layout="dense"] .grid{grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:16px}
body[data-layout="dense"] .card .ph{height:170px}
body[data-layout="dense"] .card .body{padding:16px}
body[data-shape="sharp"]{--radius:6px}
body[data-shape="round"]{--radius:34px}

/* RESPONSIVE */
@media(max-width:860px){
  .about-grid{grid-template-columns:1fr;gap:34px}
  .nav .nav-link{display:none}
  .nav-toggle{display:grid}
}
@media(max-width:560px){
  .topbar{top:10px;padding:8px 8px 8px 14px}
  .brand .name{font-size:1.02rem}
  .row2{grid-template-columns:1fr}
  .stat-row{grid-template-columns:1fr 1fr}
  .swatches{grid-template-columns:repeat(4,1fr)}
  .section{padding:64px 5vw}
  .launcher{bottom:16px;right:16px}
}
</style>
</head>
<body data-layout="standard" data-shape="default">

<div id="waterField"></div>
<div id="caustics"></div>
<canvas id="rippleCanvas"></canvas>

<!-- ============ HEADER ============ -->
<header class="topbar" id="topbar">
  <a href="#top" class="brand">
    <span class="logo-wrap" id="logoWrap"></span>
    <span class="name" id="brandName">Hudson Oaks<small id="brandTag">handmade studio</small></span>
  </a>
  <nav class="nav">
    <a href="#gallery" class="nav-link">Works</a>
    <a href="#about" class="nav-link">Studio</a>
    <a href="#contact" class="nav-link">Contact</a>
    <button class="icon-btn" id="cartBtn" aria-label="Cart" onclick="Cart.open()" style="position:relative">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
      <span class="count" id="cartCount" style="display:none">0</span>
    </button>
  </nav>
</header>

<!-- ============ HERO ============ -->
<section class="hero" id="top">
  <span class="eyebrow"><span class="dot"></span><span id="heroEyebrow">Handmade in studio · one of a kind</span></span>
  <h1 id="heroTitle">Texture you can <em>feel</em>, art you can hold.</h1>
  <p class="lede" id="heroLede">Tufted rugs, canvas works, and resin pieces — each made slowly by hand, each carrying a little of the maker.</p>
  <div class="hero-cta">
    <a href="#gallery" class="btn btn-primary">Explore the collection
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
    </a>
    <a href="#about" class="btn btn-glass">Meet the maker</a>
  </div>
  <div class="scroll-hint">scroll<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg></div>
</section>

<!-- ============ GALLERY ============ -->
<section class="section" id="gallery">
  <div class="section-head reveal">
    <div class="kicker">The Collection</div>
    <h2 id="galleryTitle">Pieces looking for a wall</h2>
    <p id="gallerySub">Like what speaks to you, add it to your bag, and we'll finish the conversation on WhatsApp.</p>
  </div>
  <div class="filters reveal" id="filters"></div>
  <div class="grid reveal" id="galleryGrid"></div>
</section>

<!-- ============ ABOUT ============ -->
<section class="section" id="about">
  <div class="about-grid">
    <div class="about-portrait reveal" id="aboutPortrait"></div>
    <div class="about-copy reveal">
      <div class="kicker">The Studio</div>
      <h2 id="aboutHeading">Made by hand, on purpose.</h2>
      <div id="aboutBody"></div>
      <div class="quote" id="aboutQuote">"When you love what you make, time disappears — and that's how I end up working at 2am, unable to stop trying one more design."</div>
      <div class="beliefs" id="beliefs"></div>
    </div>
  </div>
</section>

<!-- ============ CONTACT ============ -->
<section class="section" id="contact">
  <div class="glass contact-card reveal">
    <h2 id="contactHeading">Let's make something</h2>
    <p id="contactBody">Commissions are open. Tell me the room, the colours, the feeling — and I'll bring it into the world.</p>
    <div class="contact-rows" id="contactRows"></div>
    <div class="socials" id="socials"></div>
  </div>
</section>

<footer>
  <div class="fmark" id="footMark">Hudson Oaks</div>
  <div id="footLine">Handmade with intention. © <span id="year"></span></div>
</footer>

<!-- ============ CONTROL LAUNCHER ============ -->
<div class="launcher">
  <button class="launch-btn" onclick="Console.open()" aria-label="Open control console" title="Control console">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
  </button>
</div>

<div class="scrim" id="scrim" onclick="UI.closeAll()"></div>

<!-- ============ CONTROL CONSOLE ============ -->
<aside class="console" id="console">
  <div class="console-head">
    <div class="ttl">
      <span class="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg></span>
      <div><h3>Control Console</h3><div class="sub" id="consoleSub">Studio mode · changes save instantly</div></div>
    </div>
    <button class="x-btn" onclick="Console.close()">&times;</button>
  </div>

  <div class="console-tabs" id="consoleTabs">
    <button class="ctab active" data-tab="overview">Overview</button>
    <button class="ctab" data-tab="branding">Branding</button>
    <button class="ctab" data-tab="theme">Theme</button>
    <button class="ctab" data-tab="layout">Layout</button>
    <button class="ctab" data-tab="products">Works</button>
    <button class="ctab" data-tab="story">Studio &amp; Story</button>
    <button class="ctab" data-tab="social">Contact</button>
    <button class="ctab" data-tab="settings">Settings</button>
  </div>

  <div class="console-body">

    <!-- OVERVIEW -->
    <div class="cpanel active" data-panel="overview">
      <div class="status-banner status-dev" id="statusBanner"></div>
      <div class="stat-row">
        <div class="stat"><div class="num" id="statWorks">0</div><div class="lbl">Works</div></div>
        <div class="stat"><div class="num" id="statLikes">0</div><div class="lbl">Likes</div></div>
        <div class="stat"><div class="num" id="statValue">0</div><div class="lbl">Catalogue (K)</div></div>
      </div>
      <p style="font-size:.9rem;color:var(--ink-soft);margin-bottom:16px;line-height:1.6">Everything you change here saves to this device immediately. When you're ready for the world to see it — and to lock the console behind a login — add your keys in <b>Settings</b> and publish.</p>
      <button class="cbtn cbtn-ghost" onclick="Console.go('products')">Manage works</button>
      <button class="cbtn cbtn-ghost" onclick="Console.go('theme')">Change the look</button>
      <button class="cbtn cbtn-ghost" onclick="Store.exportData()">Download a backup</button>
      <label class="cbtn cbtn-ghost" style="display:block;text-align:center;cursor:pointer;margin-top:6px">Restore from backup
        <input type="file" accept="application/json" style="display:none" onchange="Store.importData(event)">
      </label>
    </div>

    <!-- BRANDING -->
    <div class="cpanel" data-panel="branding">
      <div class="field"><label>Studio name</label><input class="input" id="f_brandName" oninput="Edit.brand()"></div>
      <div class="field"><label>Tagline (under the name)</label><input class="input" id="f_brandTag" oninput="Edit.brand()"></div>
      <div class="field"><label>Logo image URL <span class="hint">Paste a square image link. Leave blank to use the lettermark.</span></label>
        <input class="input" id="f_logoUrl" oninput="Edit.brand()" placeholder="https://…/logo.png"></div>
      <div class="field"><label>Lettermark (used if no logo image)</label><input class="input" id="f_logoLetter" maxlength="2" oninput="Edit.brand()" placeholder="H"></div>
      <div class="field"><label>Footer signature</label><input class="input" id="f_footMark" oninput="Edit.brand()"></div>
    </div>

    <!-- THEME -->
    <div class="cpanel" data-panel="theme">
      <div class="field"><label>Water palette</label>
        <div class="swatches" id="paletteSwatches"></div>
        <div class="hint">Tap a current to recolour the whole site. Everything stays liquid-glass — only the water changes.</div>
      </div>
      <div class="field"><label>Custom accent colour</label>
        <input type="color" class="input" id="f_accent" style="height:48px;padding:5px" oninput="Edit.customAccent(this.value)"></div>
    </div>

    <!-- LAYOUT -->
    <div class="cpanel" data-panel="layout">
      <div class="field"><label>Gallery density</label>
        <div class="layout-opts" id="layoutOpts"></div></div>
      <div class="field"><label>Corner style</label>
        <div class="layout-opts" id="shapeOpts"></div></div>
    </div>

    <!-- PRODUCTS -->
    <div class="cpanel" data-panel="products">
      <button class="cbtn cbtn-primary" onclick="Editor.openNew()">+ Add a work</button>
      <div id="adminProducts" style="margin-top:18px"></div>
    </div>

    <!-- STORY -->
    <div class="cpanel" data-panel="story">
      <div class="field"><label>Hero eyebrow</label><input class="input" id="f_heroEyebrow" oninput="Edit.copy()"></div>
      <div class="field"><label>Hero headline <span class="hint">Wrap a word in *stars* to italicise it.</span></label><input class="input" id="f_heroTitle" oninput="Edit.copy()"></div>
      <div class="field"><label>Hero subtitle</label><textarea class="textarea" id="f_heroLede" oninput="Edit.copy()"></textarea></div>
      <div class="field"><label>Studio heading</label><input class="input" id="f_aboutHeading" oninput="Edit.copy()"></div>
      <div class="field"><label>Studio story <span class="hint">One paragraph per line.</span></label><textarea class="textarea" id="f_aboutBody" style="min-height:130px" oninput="Edit.copy()"></textarea></div>
      <div class="field"><label>Pull quote</label><textarea class="textarea" id="f_aboutQuote" oninput="Edit.copy()"></textarea></div>
      <div class="field"><label>Studio portrait URL</label><input class="input" id="f_aboutPortrait" oninput="Edit.copy()"></div>
      <div class="field"><label>Beliefs <span class="hint">Comma-separated.</span></label><input class="input" id="f_beliefs" oninput="Edit.copy()"></div>
      <div class="field"><label>Contact heading</label><input class="input" id="f_contactHeading" oninput="Edit.copy()"></div>
      <div class="field"><label>Contact blurb</label><textarea class="textarea" id="f_contactBody" oninput="Edit.copy()"></textarea></div>
    </div>

    <!-- SOCIAL / CONTACT -->
    <div class="cpanel" data-panel="social">
      <div class="field"><label>WhatsApp number <span class="hint">Digits only, with country code. e.g. 254706189808</span></label><input class="input" id="f_whatsapp" oninput="Edit.contact()"></div>
      <div class="field"><label>Phone (shown on site)</label><input class="input" id="f_phone" oninput="Edit.contact()"></div>
      <div class="field"><label>Email</label><input class="input" id="f_email" oninput="Edit.contact()"></div>
      <div class="field"><label>Instagram <span class="hint">handle or full URL</span></label><input class="input" id="f_instagram" oninput="Edit.contact()"></div>
      <div class="field"><label>TikTok</label><input class="input" id="f_tiktok" oninput="Edit.contact()"></div>
      <div class="field"><label>Currency code</label><input class="input" id="f_currency" oninput="Edit.contact()" placeholder="KES"></div>
    </div>

    <!-- SETTINGS -->
    <div class="cpanel" data-panel="settings">
      <div class="status-banner status-dev" id="settingsStatus"></div>
      <p style="font-size:.88rem;color:var(--ink-soft);margin-bottom:18px;line-height:1.6">Right now the console is <b>open</b> — anyone who taps the gear gets in. Paste your Firebase keys below and publish to switch the site live and require this email + password to enter the console.</p>

      <div class="field"><label>Admin email</label><input class="input" id="f_adminEmail" placeholder="you@email.com"></div>
      <div class="field"><label>Firebase config <span class="hint">Paste the whole <code>firebaseConfig = {…}</code> object from your Firebase console.</span></label>
        <textarea class="textarea" id="f_firebase" style="min-height:160px" placeholder='{
  "apiKey": "…",
  "authDomain": "…",
  "projectId": "…",
  "storageBucket": "…",
  "messagingSenderId": "…",
  "appId": "…"
}'></textarea></div>

      <div class="toggle-row">
        <div class="tlabel">Sync to the cloud<small>Store works &amp; orders in Firebase, not just this device</small></div>
        <div class="switch" id="sw_cloud" onclick="Settings.toggleCloud()"></div>
      </div>

      <button class="cbtn cbtn-primary" id="publishBtn" onclick="Settings.publish()">Publish &amp; lock the console</button>
      <button class="cbtn cbtn-danger" id="unpublishBtn" onclick="Settings.unpublish()" style="display:none">Unpublish (back to open studio mode)</button>
      <p class="hint" style="margin-top:12px">No keys yet? The whole site already works and saves on this device. Publishing is only needed to go multi-device and live.</p>
    </div>

  </div>
</aside>

<!-- ============ CART ============ -->
<aside class="cart" id="cart">
  <div class="cart-head"><h3>Your bag</h3><button class="x-btn" onclick="Cart.close()">&times;</button></div>
  <div class="cart-items" id="cartItems"></div>
  <div class="cart-foot">
    <div class="cart-total"><span>Total</span><strong id="cartTotal">—</strong></div>
    <button class="cbtn cbtn-primary" onclick="Cart.checkout()">Checkout on WhatsApp
    </button>
    <p class="hint" style="text-align:center;margin-top:10px">You'll confirm details &amp; payment directly with the studio.</p>
  </div>
</aside>

<!-- ============ LOGIN MODAL ============ -->
<div class="overlay" id="loginOverlay">
  <div class="modal">
    <h3>Studio access</h3>
    <p class="msub">This console is locked. Sign in to manage Hudson Oaks.</p>
    <div class="modal-err" id="loginErr"></div>
    <div class="field"><label>Email</label><input class="input" id="loginEmail" type="email"></div>
    <div class="field"><label>Password</label><input class="input" id="loginPass" type="password"></div>
    <button class="cbtn cbtn-primary" onclick="Auth.login()">Enter console</button>
    <button class="cbtn cbtn-ghost" onclick="UI.closeAll()">Cancel</button>
  </div>
</div>

<!-- ============ PRODUCT EDITOR MODAL ============ -->
<div class="overlay" id="editorOverlay">
  <div class="modal">
    <h3 id="editorTitle">Add a work</h3>
    <p class="msub">Photos sell the piece — use a bright, square-ish image.</p>
    <div class="modal-err" id="editorErr"></div>
    <div class="field"><label>Title</label><input class="input" id="e_title" placeholder="e.g. Tidal Bloom"></div>
    <div class="field"><label>Description</label><textarea class="textarea" id="e_desc" placeholder="A few words on materials, size, feeling…"></textarea></div>
    <div class="row2">
      <div class="field"><label>Price</label><input class="input" id="e_price" type="number" min="0" placeholder="3000"></div>
      <div class="field"><label>Category</label>
        <select class="select" id="e_cat">
          <option value="matwork">Tufted / Matwork</option>
          <option value="canvas">Canvas Art</option>
          <option value="resin">Resin</option>
          <option value="commission">Commission</option>
        </select></div>
    </div>
    <div class="field"><label>Image URL</label><input class="input" id="e_image" placeholder="https://…/piece.jpg"></div>
    <button class="cbtn cbtn-primary" onclick="Editor.save()">Save work</button>
    <button class="cbtn cbtn-ghost" onclick="UI.closeAll()">Cancel</button>
  </div>
</div>

<div class="toast-wrap" id="toastWrap"></div>

<!-- Firebase (loaded; only initialised when you publish with config) -->
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore-compat.js"></script>

<script>
/* ============================================================
   HUDSON OAKS — application engine
   Technologies in play: CSS backdrop-filter glass, CSS custom-
   property theming, 3D transforms (spatial tilt), Canvas2D
   ripples, IntersectionObserver reveals, localStorage persistence,
   JSON import/export, Web Share, conditional Firebase Auth +
   Firestore sync, requestAnimationFrame motion, prefers-reduced-
   motion, responsive grid, SVG iconography, WhatsApp deep-linking.
   ============================================================ */

const LS_KEY = 'hudsonOaks.v1';

/* ---------- DEFAULT STATE ---------- */
const DEFAULTS = {
  brand:{ name:'Hudson Oaks', tag:'handmade studio', logoUrl:'', logoLetter:'H', footMark:'Hudson Oaks' },
  theme:{ palette:'lagoon', accent:'#1fb6d6', accent2:'#0e7ea3', bg1:'#dff3fa', bg2:'#bfe9f5', bg3:'#eafaff' },
  layout:{ density:'standard', shape:'default' },
  copy:{
    heroEyebrow:'Handmade in studio · one of a kind',
    heroTitle:'Texture you can *feel*, art you can hold.',
    heroLede:'Tufted rugs, canvas works, and resin pieces — each made slowly by hand, each carrying a little of the maker.',
    aboutHeading:'Made by hand, on purpose.',
    aboutBody:'Hudson Oaks began with a simple stubbornness: the belief that something made slowly, by a real pair of hands, carries a feeling no machine can fake.\nEvery piece is a small argument for patience — for texture, for imperfection, for the marks that prove a human was here.\nCustom commissions are always welcome.',
    aboutQuote:'"When you love what you make, time disappears — and that\'s how I end up working at 2am, unable to stop trying one more design."',
    aboutPortrait:'',
    beliefs:'Creativity has no limits, Handmade is soulful, Every piece tells a story, Passion over perfection, Art heals',
    contactHeading:'Let\'s make something',
    contactBody:'Commissions are open. Tell me the room, the colours, the feeling — and I\'ll bring it into the world.'
  },
  contact:{ whatsapp:'254706189808', phone:'+254 706 189 808', email:'', instagram:'bernicewairimu', tiktok:'bernicewairimu706', currency:'KES' },
  config:{ published:false, cloud:false, adminEmail:'', firebase:null },
  products:[
    { id:'p1', title:'Resilience', desc:'Hand-tufted wool, deep tidal blues bleeding into foam white. A piece about holding on.', price:3500, category:'matwork', image:'', likes:14 },
    { id:'p2', title:'Tidal Bloom', desc:'Acrylic on canvas — colour pulled like water across the weave.', price:3000, category:'canvas', image:'', likes:9 },
    { id:'p3', title:'Still Water', desc:'Resin and pigment poured in layers, set hard as glass.', price:4000, category:'resin', image:'', likes:21 },
    { id:'p4', title:'Undercurrent', desc:'A tufted study in movement — soft pile, restless pattern.', price:3200, category:'matwork', image:'', likes:6 }
  ]
};

/* palette presets — all "water", different moods */
const PALETTES = {
  lagoon:{ accent:'#1fb6d6', accent2:'#0e7ea3', bg1:'#dff3fa', bg2:'#bfe9f5', bg3:'#eafaff', label:'Lagoon' },
  deepsea:{ accent:'#2d7ef7', accent2:'#1b3f8f', bg1:'#dbe6fb', bg2:'#b9cdf5', bg3:'#eaf1ff', label:'Deep Sea' },
  reef:{ accent:'#11b3a3', accent2:'#0a7d72', bg1:'#d6f5ee', bg2:'#b3ebdf', bg3:'#e8fbf6', label:'Reef' },
  tide:{ accent:'#3ec6e0', accent2:'#1488a6', bg1:'#d9f1f8', bg2:'#bce8f3', bg3:'#e9f9fd', label:'Tide' },
  glacier:{ accent:'#5aa9d6', accent2:'#356f96', bg1:'#e3eef5', bg2:'#cadeeb', bg3:'#f0f6fb', label:'Glacier' },
  twilight:{ accent:'#6d7bf0', accent2:'#3d2f9c', bg1:'#e6e3fb', bg2:'#d0caf5', bg3:'#f2f0ff', label:'Twilight' },
  abyss:{ accent:'#19c2c2', accent2:'#0c6e7a', bg1:'#d2f0f2', bg2:'#aee2e6', bg3:'#e6fafb', label:'Abyss' },
  shell:{ accent:'#e88ab6', accent2:'#bd5a8b', bg1:'#fbe6f1', bg2:'#f6cce0', bg3:'#fff0f7', label:'Shell' },
  mineral:{ accent:'#4b9d8f', accent2:'#2c6b60', bg1:'#e0efe9', bg2:'#c6e2d8', bg3:'#eef8f4', label:'Mineral' },
  ink:{ accent:'#2aa6c9', accent2:'#0a3f5c', bg1:'#dde9ef', bg2:'#bdd4df', bg3:'#ecf4f8', label:'Ink' }
};

/* ============================================================ STORE */
const Store = {
  state:null,
  fb:null,            // firebase app handle
  load(){
    let saved=null;
    try{ saved=JSON.parse(localStorage.getItem(LS_KEY)); }catch(e){}
    this.state = saved ? this._merge(DEFAULTS, saved) : structuredClone(DEFAULTS);
    return this.state;
  },
  _merge(def, src){ const out=structuredClone(def);
    for(const k in src){ if(src[k]&&typeof src[k]==='object'&&!Array.isArray(src[k])) out[k]=this._merge(def[k]||{},src[k]); else out[k]=src[k]; }
    return out; },
  save(){ try{ localStorage.setItem(LS_KEY, JSON.stringify(this.state)); }catch(e){ UI.toast('Could not save — storage full?'); }
    if(this.state.config.cloud && this.fb) this.cloudSave(); },
  exportData(){ const blob=new Blob([JSON.stringify(this.state,null,2)],{type:'application/json'});
    const a=document.createElement('a'); a.href=URL.createObjectURL(blob);
    a.download='hudson-oaks-backup.json'; a.click(); UI.toast('Backup downloaded'); },
  importData(ev){ const file=ev.target.files[0]; if(!file) return;
    const r=new FileReader(); r.onload=()=>{ try{ this.state=this._merge(DEFAULTS,JSON.parse(r.result)); this.save();
      Render.all(); Console.populate(); UI.toast('Backup restored'); }catch(e){ UI.toast('That file could not be read'); } };
    r.readAsText(file); },
  async cloudSave(){ try{ await this.fb.firestore().collection('sites').doc('hudson-oaks')
      .set({ data:this.state, updated:Date.now() }); }catch(e){ console.warn('cloud save',e);} }
};

/* ============================================================ RENDER */
const Render = {
  cur(){ return Store.state.contact.currency || 'KES'; },
  money(n){ return Number(n).toLocaleString()+' '+this.cur(); },
  all(){ this.theme(); this.brand(); this.copy(); this.gallery(); this.contact(); document.getElementById('year').textContent=new Date().getFullYear(); },
  theme(){ const t=Store.state.theme; const r=document.documentElement.style;
    r.setProperty('--accent',t.accent); r.setProperty('--accent-2',t.accent2);
    r.setProperty('--bg-1',t.bg1); r.setProperty('--bg-2',t.bg2); r.setProperty('--bg-3',t.bg3);
    document.body.dataset.layout=Store.state.layout.density; document.body.dataset.shape=Store.state.layout.shape; },
  brand(){ const b=Store.state.brand;
    document.getElementById('brandName').innerHTML=`${b.name}<small id="brandTag">${b.tag}</small>`;
    document.getElementById('footMark').textContent=b.footMark||b.name;
    const lw=document.getElementById('logoWrap');
    lw.innerHTML = b.logoUrl ? `<img src="${b.logoUrl}" alt="${b.name}">`
      : `<span style="font-family:var(--serif);font-weight:600;color:#fff;font-size:1.2rem">${(b.logoLetter||'H')}</span>`;
    document.title = b.name+' — Handmade Art'; },
  copy(){ const c=Store.state.copy;
    document.getElementById('heroEyebrow').textContent=c.heroEyebrow;
    document.getElementById('heroTitle').innerHTML=c.heroTitle.replace(/\*(.+?)\*/g,'<em>$1</em>');
    document.getElementById('heroLede').textContent=c.heroLede;
    document.getElementById('aboutHeading').textContent=c.aboutHeading;
    document.getElementById('aboutBody').innerHTML=c.aboutBody.split('\n').filter(Boolean).map(p=>`<p>${p}</p>`).join('');
    document.getElementById('aboutQuote').textContent=c.aboutQuote;
    const port=document.getElementById('aboutPortrait');
    port.innerHTML = c.aboutPortrait ? `<img src="${c.aboutPortrait}" alt="Studio portrait">`
      : `<div style="width:100%;height:100%;display:grid;place-items:center;font-size:3rem;opacity:.4">🪡</div>`;
    document.getElementById('beliefs').innerHTML=c.beliefs.split(',').map(b=>`<span class="belief">${b.trim()}</span>`).join('');
    document.getElementById('contactHeading').textContent=c.contactHeading;
    document.getElementById('contactBody').textContent=c.contactBody; },
  glyphFor(cat){ return {matwork:'🧶',canvas:'🖼️',resin:'💎',commission:'✨'}[cat]||'🎨'; },
  gallery(){
    const grid=document.getElementById('galleryGrid'); const items=Store.state.products;
    // filters
    const cats=['all',...new Set(items.map(p=>p.category))];
    const labels={all:'All works',matwork:'Tufted',canvas:'Canvas',resin:'Resin',commission:'Commissions'};
    document.getElementById('filters').innerHTML=cats.map((c,i)=>
      `<button class="chip ${i===0?'active':''}" data-cat="${c}" onclick="Render.filter('${c}',this)">${labels[c]||c}</button>`).join('');
    if(!items.length){ grid.innerHTML=`<div class="empty">No works yet — open the console and add your first piece.</div>`; return; }
    grid.innerHTML=items.map(p=>{
      const liked = (JSON.parse(localStorage.getItem('ho.liked')||'[]')).includes(p.id);
      const img = p.image ? `<img src="${p.image}" alt="${p.title}" onerror="this.style.display='none'">`
        : `<span class="glyph">${this.glyphFor(p.category)}</span>`;
      return `<article class="card" data-cat="${p.category}" data-id="${p.id}">
        <div class="ph">${img}<span class="like-pill">❤ <span id="lk-${p.id}">${p.likes||0}</span></span></div>
        <div class="body">
          <h3>${p.title}</h3>
          <p class="desc">${p.desc||''}</p>
          <div class="meta"><span class="price">${this.money(p.price)}</span><span class="tag">${p.category}</span></div>
          <div class="actions">
            <button class="act act-like ${liked?'liked':''}" id="likebtn-${p.id}" onclick="event.stopPropagation();Render.like('${p.id}')">❤ ${liked?'Liked':'Like'}</button>
            <button class="act act-cart" onclick="event.stopPropagation();Cart.add('${p.id}')">Add to bag</button>
          </div>
        </div></article>`;
    }).join('');
    Physics.bindTilt();
    Reveal.scan();
  },
  filter(cat,btn){ document.querySelectorAll('#filters .chip').forEach(c=>c.classList.remove('active')); btn.classList.add('active');
    document.querySelectorAll('.card').forEach(c=>{ c.style.display = (cat==='all'||c.dataset.cat===cat)?'':'none'; }); },
  like(id){ const liked=JSON.parse(localStorage.getItem('ho.liked')||'[]');
    const p=Store.state.products.find(x=>x.id===id); if(!p) return;
    const btn=document.getElementById('likebtn-'+id);
    if(liked.includes(id)){ p.likes=Math.max(0,(p.likes||0)-1); liked.splice(liked.indexOf(id),1); btn.classList.remove('liked'); btn.innerHTML='❤ Like'; }
    else { p.likes=(p.likes||0)+1; liked.push(id); btn.classList.add('liked'); btn.innerHTML='❤ Liked'; Physics.rippleAt(btn); }
    localStorage.setItem('ho.liked',JSON.stringify(liked));
    document.getElementById('lk-'+id).textContent=p.likes; Store.save(); Console.stats(); },
  contact(){ const c=Store.state.contact;
    const rows=[];
    if(c.phone) rows.push(`<a class="contact-row" href="tel:${c.phone.replace(/\s/g,'')}">📞 ${c.phone}</a>`);
    if(c.email) rows.push(`<a class="contact-row" href="mailto:${c.email}">✉ ${c.email}</a>`);
    if(c.whatsapp) rows.push(`<a class="contact-row" href="https://wa.me/${c.whatsapp}" target="_blank" rel="noopener">💬 WhatsApp the studio</a>`);
    document.getElementById('contactRows').innerHTML=rows.join('');
    const igUrl=c.instagram?(c.instagram.startsWith('http')?c.instagram:'https://instagram.com/'+c.instagram.replace('@','')):'';
    const ttUrl=c.tiktok?(c.tiktok.startsWith('http')?c.tiktok:'https://tiktok.com/@'+c.tiktok.replace('@','')):'';
    const s=[];
    if(igUrl) s.push(`<a class="social" href="${igUrl}" target="_blank" rel="noopener">Instagram</a>`);
    if(ttUrl) s.push(`<a class="social" href="${ttUrl}" target="_blank" rel="noopener">TikTok</a>`);
    document.getElementById('socials').innerHTML=s.join(''); }
};

/* ============================================================ CONSOLE */
const Console = {
  open(){
    const cfg=Store.state.config;
    if(cfg.published){ // locked
      if(this._unlocked){ this._show(); }
      else { document.getElementById('loginOverlay').classList.add('show'); document.getElementById('scrim').classList.add('show'); }
    } else { this._show(); }
  },
  _show(){ this.populate(); document.getElementById('console').classList.add('show');
    document.getElementById('scrim').classList.add('show'); this.stats(); },
  close(){ document.getElementById('console').classList.remove('show'); document.getElementById('scrim').classList.remove('show'); },
  go(tab){ this.open(); setTimeout(()=>{ const b=document.querySelector(`.ctab[data-tab="${tab}"]`); if(b) this.tab(tab,b); },50); },
  tab(name,btn){ document.querySelectorAll('.ctab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.cpanel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active'); document.querySelector(`.cpanel[data-panel="${name}"]`).classList.add('active');
    if(name==='products') this.renderProducts();
    if(name==='theme') this.renderPalettes();
    if(name==='layout') this.renderLayout(); },
  populate(){ const s=Store.state;
    const set=(id,v)=>{ const el=document.getElementById(id); if(el) el.value=v; };
    set('f_brandName',s.brand.name); set('f_brandTag',s.brand.tag); set('f_logoUrl',s.brand.logoUrl);
    set('f_logoLetter',s.brand.logoLetter); set('f_footMark',s.brand.footMark);
    set('f_heroEyebrow',s.copy.heroEyebrow); set('f_heroTitle',s.copy.heroTitle); set('f_heroLede',s.copy.heroLede);
    set('f_aboutHeading',s.copy.aboutHeading); set('f_aboutBody',s.copy.aboutBody); set('f_aboutQuote',s.copy.aboutQuote);
    set('f_aboutPortrait',s.copy.aboutPortrait); set('f_beliefs',s.copy.beliefs);
    set('f_contactHeading',s.copy.contactHeading); set('f_contactBody',s.copy.contactBody);
    set('f_whatsapp',s.contact.whatsapp); set('f_phone',s.contact.phone); set('f_email',s.contact.email);
    set('f_instagram',s.contact.instagram); set('f_tiktok',s.contact.tiktok); set('f_currency',s.contact.currency);
    set('f_accent',s.theme.accent);
    set('f_adminEmail',s.config.adminEmail); set('f_firebase',s.config.firebase?JSON.stringify(s.config.firebase,null,2):'');
    document.getElementById('sw_cloud').classList.toggle('on',!!s.config.cloud);
    this.renderPalettes(); this.renderLayout(); this.renderProducts(); this.statusBanners(); },
  statusBanners(){ const pub=Store.state.config.published;
    const b1=document.getElementById('statusBanner'), b2=document.getElementById('settingsStatus');
    const dev='🟡 Open studio mode — the console is unlocked on this device.';
    const live='🟢 Live & locked — visitors see the site; the console requires sign-in.';
    [b1,b2].forEach(b=>{ b.textContent=pub?live:dev; b.className='status-banner '+(pub?'status-live':'status-dev'); });
    document.getElementById('consoleSub').textContent = pub?'Live mode · synced':'Studio mode · changes save instantly';
    document.getElementById('publishBtn').style.display=pub?'none':'block';
    document.getElementById('unpublishBtn').style.display=pub?'block':'none'; },
  stats(){ const p=Store.state.products;
    document.getElementById('statWorks').textContent=p.length;
    document.getElementById('statLikes').textContent=p.reduce((a,x)=>a+(x.likes||0),0);
    document.getElementById('statValue').textContent=Math.round(p.reduce((a,x)=>a+Number(x.price||0),0)/1000); },
  renderPalettes(){ const wrap=document.getElementById('paletteSwatches'); const cur=Store.state.theme.palette;
    wrap.innerHTML=Object.entries(PALETTES).map(([k,v])=>
      `<div class="swatch ${k===cur?'sel':''}" title="${v.label}" style="background:linear-gradient(135deg,${v.accent},${v.accent2})" onclick="Edit.palette('${k}')"></div>`).join(''); },
  renderLayout(){ const d=Store.state.layout;
    const dens=[['standard','Standard','balanced grid'],['editorial','Editorial','big & airy'],['dense','Dense','more per row']];
    document.getElementById('layoutOpts').innerHTML=dens.map(([k,n,desc])=>
      `<div class="layout-opt ${d.density===k?'sel':''}" onclick="Edit.layout('density','${k}')"><div class="lname">${n}</div><div class="ldesc">${desc}</div></div>`).join('');
    const shapes=[['default','Soft','rounded glass'],['round','Pebble','extra round'],['sharp','Crisp','near-square']];
    document.getElementById('shapeOpts').innerHTML=shapes.map(([k,n,desc])=>
      `<div class="layout-opt ${d.shape===k?'sel':''}" onclick="Edit.layout('shape','${k}')"><div class="lname">${n}</div><div class="ldesc">${desc}</div></div>`).join(''); },
  renderProducts(){ const wrap=document.getElementById('adminProducts'); const p=Store.state.products;
    if(!p.length){ wrap.innerHTML='<p style="text-align:center;color:var(--ink-soft);padding:20px">No works yet.</p>'; return; }
    wrap.innerHTML=p.map(x=>{
      const img=x.image?`<img src="${x.image}" alt="">`:`<div style="width:60px;height:60px;border-radius:12px;display:grid;place-items:center;background:var(--foam);font-size:1.4rem">${Render.glyphFor(x.category)}</div>`;
      return `<div class="padmin">${img}
        <div class="pinfo"><h4>${x.title}</h4><span>${Render.money(x.price)} · ${x.category} · ❤ ${x.likes||0}</span></div>
        <div class="pacts">
          <button class="mini mini-edit" onclick="Editor.openEdit('${x.id}')">✎</button>
          <button class="mini mini-del" onclick="Editor.remove('${x.id}')">🗑</button>
        </div></div>`;
    }).join(''); }
};

/* ============================================================ LIVE EDIT */
const Edit = {
  v(id){ return document.getElementById(id).value; },
  brand(){ const b=Store.state.brand;
    b.name=this.v('f_brandName'); b.tag=this.v('f_brandTag'); b.logoUrl=this.v('f_logoUrl');
    b.logoLetter=this.v('f_logoLetter'); b.footMark=this.v('f_footMark');
    Render.brand(); Store.save(); },
  copy(){ const c=Store.state.copy;
    c.heroEyebrow=this.v('f_heroEyebrow'); c.heroTitle=this.v('f_heroTitle'); c.heroLede=this.v('f_heroLede');
    c.aboutHeading=this.v('f_aboutHeading'); c.aboutBody=this.v('f_aboutBody'); c.aboutQuote=this.v('f_aboutQuote');
    c.aboutPortrait=this.v('f_aboutPortrait'); c.beliefs=this.v('f_beliefs');
    c.contactHeading=this.v('f_contactHeading'); c.contactBody=this.v('f_contactBody');
    Render.copy(); Store.save(); },
  contact(){ const c=Store.state.contact;
    c.whatsapp=this.v('f_whatsapp').replace(/\D/g,''); c.phone=this.v('f_phone'); c.email=this.v('f_email');
    c.instagram=this.v('f_instagram'); c.tiktok=this.v('f_tiktok'); c.currency=this.v('f_currency')||'KES';
    Render.contact(); Render.gallery(); Store.save(); },
  palette(key){ const p=PALETTES[key]; const t=Store.state.theme;
    t.palette=key; t.accent=p.accent; t.accent2=p.accent2; t.bg1=p.bg1; t.bg2=p.bg2; t.bg3=p.bg3;
    document.getElementById('f_accent').value=p.accent;
    Render.theme(); Console.renderPalettes(); Store.save(); UI.toast(p.label+' palette applied'); },
  customAccent(hex){ const t=Store.state.theme; t.accent=hex; t.palette='custom';
    // derive a darker shade
    t.accent2=this._shade(hex,-28); Render.theme(); Console.renderPalettes(); Store.save(); },
  _shade(hex,p){ const n=parseInt(hex.slice(1),16); let r=(n>>16)+p,g=((n>>8)&255)+p,b=(n&255)+p;
    r=Math.max(0,Math.min(255,r));g=Math.max(0,Math.min(255,g));b=Math.max(0,Math.min(255,b));
    return '#'+(r<<16|g<<8|b).toString(16).padStart(6,'0'); },
  layout(kind,val){ Store.state.layout[kind]=val; Render.theme(); Console.renderLayout(); Store.save(); }
};

/* ============================================================ PRODUCT EDITOR */
const Editor = {
  editingId:null,
  openNew(){ this.editingId=null; document.getElementById('editorTitle').textContent='Add a work';
    ['e_title','e_desc','e_price','e_image'].forEach(i=>document.getElementById(i).value='');
    document.getElementById('e_cat').value='matwork'; document.getElementById('editorErr').style.display='none';
    UI.openOverlay('editorOverlay'); },
  openEdit(id){ const p=Store.state.products.find(x=>x.id===id); if(!p) return; this.editingId=id;
    document.getElementById('editorTitle').textContent='Edit work';
    document.getElementById('e_title').value=p.title; document.getElementById('e_desc').value=p.desc||'';
    document.getElementById('e_price').value=p.price; document.getElementById('e_cat').value=p.category;
    document.getElementById('e_image').value=p.image||''; document.getElementById('editorErr').style.display='none';
    UI.openOverlay('editorOverlay'); },
  save(){ const title=document.getElementById('e_title').value.trim();
    const price=Number(document.getElementById('e_price').value);
    const err=document.getElementById('editorErr');
    if(!title){ err.textContent='Give the piece a title.'; err.style.display='block'; return; }
    if(!price||price<0){ err.textContent='Set a price (a number).'; err.style.display='block'; return; }
    const data={ title, desc:document.getElementById('e_desc').value.trim(), price,
      category:document.getElementById('e_cat').value, image:document.getElementById('e_image').value.trim() };
    if(this.editingId){ Object.assign(Store.state.products.find(x=>x.id===this.editingId),data); UI.toast('Work updated'); }
    else { data.id='p'+Date.now(); data.likes=0; Store.state.products.push(data); UI.toast('Work added'); }
    Store.save(); Render.gallery(); Console.renderProducts(); Console.stats(); UI.closeAll(); },
  remove(id){ const p=Store.state.products.find(x=>x.id===id);
    if(!confirm(`Delete "${p?p.title:'this work'}"? This can't be undone.`)) return;
    Store.state.products=Store.state.products.filter(x=>x.id!==id);
    Store.save(); Render.gallery(); Console.renderProducts(); Console.stats(); UI.toast('Work deleted'); }
};

/* ============================================================ CART */
const Cart = {
  items:[],
  add(id){ const p=Store.state.products.find(x=>x.id===id); if(!p) return;
    const ex=this.items.find(i=>i.id===id); if(ex) ex.qty++; else this.items.push({id,qty:1});
    this.render(); UI.toast(p.title+' added to bag'); this.bump(); },
  bump(){ const c=document.getElementById('cartCount'); const n=this.items.reduce((a,i)=>a+i.qty,0);
    c.textContent=n; c.style.display=n?'grid':'none'; },
  remove(id){ this.items=this.items.filter(i=>i.id!==id); this.render(); this.bump(); },
  qty(id,d){ const it=this.items.find(i=>i.id===id); if(!it) return; it.qty+=d;
    if(it.qty<=0) this.remove(id); else { this.render(); this.bump(); } },
  open(){ this.render(); document.getElementById('cart').classList.add('show'); document.getElementById('scrim').classList.add('show'); },
  close(){ document.getElementById('cart').classList.remove('show'); document.getElementById('scrim').classList.remove('show'); },
  render(){ const wrap=document.getElementById('cartItems');
    if(!this.items.length){ wrap.innerHTML='<p style="text-align:center;color:var(--ink-soft);padding:40px 0">Your bag is empty.</p>';
      document.getElementById('cartTotal').textContent='—'; return; }
    let total=0;
    wrap.innerHTML=this.items.map(i=>{ const p=Store.state.products.find(x=>x.id===i.id); if(!p) return '';
      total+=p.price*i.qty;
      const img=p.image?`<img src="${p.image}" alt="">`:`<div style="width:56px;height:56px;border-radius:12px;display:grid;place-items:center;background:var(--foam)">${Render.glyphFor(p.category)}</div>`;
      return `<div class="citem">${img}
        <div class="ci-info"><h4>${p.title}</h4><div class="ci-price">${Render.money(p.price)}</div></div>
        <div class="qty"><button onclick="Cart.qty('${i.id}',-1)">−</button><span>${i.qty}</span><button onclick="Cart.qty('${i.id}',1)">+</button></div>
      </div>`; }).join('');
    document.getElementById('cartTotal').textContent=Render.money(total); },
  checkout(){ if(!this.items.length){ UI.toast('Your bag is empty'); return; }
    const c=Store.state.contact; let total=0;
    const lines=this.items.map(i=>{ const p=Store.state.products.find(x=>x.id===i.id); total+=p.price*i.qty;
      return `• ${p.title} ×${i.qty} — ${Render.money(p.price*i.qty)}`; }).join('\n');
    const msg=`Hi ${Store.state.brand.name}! I'd love to order:\n\n${lines}\n\nTotal: ${Render.money(total)}\n\nCould we sort out the details?`;
    window.open(`https://wa.me/${c.whatsapp}?text=${encodeURIComponent(msg)}`,'_blank'); }
};

/* ============================================================ AUTH + SETTINGS */
const Auth = {
  async login(){ const email=document.getElementById('loginEmail').value.trim();
    const pass=document.getElementById('loginPass').value; const err=document.getElementById('loginErr');
    err.style.display='none';
    const cfg=Store.state.config;
    try{
      if(cfg.cloud && Store.fb){
        await Store.fb.auth().signInWithEmailAndPassword(email,pass);
      } else {
        // local gate
        if(email!==cfg.adminEmail || pass!==(localStorage.getItem('ho.localpass')||'')) throw new Error('bad');
      }
      Console._unlocked=true; UI.closeAll(); Console._show(); UI.toast('Welcome back');
    }catch(e){ err.textContent='Email or password not recognised.'; err.style.display='block'; }
  }
};

const Settings = {
  toggleCloud(){ const sw=document.getElementById('sw_cloud'); sw.classList.toggle('on');
    Store.state.config.cloud=sw.classList.contains('on'); Store.save(); },
  parseFirebase(){ const raw=document.getElementById('f_firebase').value.trim(); if(!raw) return null;
    try{ // tolerate JS-object style
      const clean=raw.replace(/^[^{]*({[\s\S]*})[^}]*$/,'$1')
        .replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g,'$1"$2":').replace(/'/g,'"').replace(/,(\s*})/g,'$1');
      return JSON.parse(clean);
    }catch(e){ return undefined; } },
  initFirebase(cfg){ try{ if(!firebase.apps.length) firebase.initializeApp(cfg); Store.fb=firebase; return true; }
    catch(e){ console.error(e); return false; } },
  publish(){ const email=document.getElementById('f_adminEmail').value.trim();
    if(!email){ UI.toast('Add an admin email first'); Console.go('settings'); return; }
    const fb=this.parseFirebase();
    const cfg=Store.state.config; cfg.adminEmail=email;
    if(cfg.cloud){
      if(fb===undefined){ UI.toast('That Firebase config could not be read'); return; }
      if(!fb){ UI.toast('Paste your Firebase config to sync to the cloud'); return; }
      cfg.firebase=fb; if(!this.initFirebase(fb)){ UI.toast('Firebase failed to start — check the config'); return; }
    } else {
      // local password gate
      let pass=localStorage.getItem('ho.localpass');
      if(!pass){ pass=prompt('Set a console password (you\'ll need it + your email to get back in):'); if(!pass) return;
        localStorage.setItem('ho.localpass',pass); }
    }
    cfg.published=true; Console._unlocked=true; Store.save(); Console.statusBanners();
    UI.toast('Published — the console is now locked'); },
  unpublish(){ if(!confirm('Switch back to open studio mode? The console will no longer require a login.')) return;
    Store.state.config.published=false; Store.save(); Console.statusBanners(); UI.toast('Back to open studio mode'); }
};

/* ============================================================ UI HELPERS */
const UI = {
  openOverlay(id){ document.getElementById(id).classList.add('show'); },
  closeAll(){ document.querySelectorAll('.overlay').forEach(o=>o.classList.remove('show'));
    document.getElementById('cart').classList.remove('show');
    // only drop scrim if console isn't meant to be open
    if(!document.getElementById('console').classList.contains('show')) document.getElementById('scrim').classList.remove('show'); },
  toast(msg){ const w=document.getElementById('toastWrap'); const t=document.createElement('div'); t.className='toast';
    t.innerHTML='<span>✓</span>'+msg; w.appendChild(t);
    setTimeout(()=>{ t.classList.add('out'); setTimeout(()=>t.remove(),300); },2400); }
};

/* ============================================================ PHYSICS / MOTION */
const Physics = {
  reduced:matchMedia('(prefers-reduced-motion:reduce)').matches,
  bindTilt(){ if(this.reduced) return;
    document.querySelectorAll('.card').forEach(card=>{
      card.onpointermove=e=>{ const r=card.getBoundingClientRect();
        const px=(e.clientX-r.left)/r.width-0.5, py=(e.clientY-r.top)/r.height-0.5;
        card.style.transform=`perspective(900px) rotateY(${px*7}deg) rotateX(${-py*7}deg) translateY(-6px)`; };
      card.onpointerleave=()=>{ card.style.transform=''; };
    }); },
  initRipple(){ const cv=document.getElementById('rippleCanvas'); const ctx=cv.getContext('2d');
    const fit=()=>{ cv.width=innerWidth; cv.height=innerHeight; }; fit(); addEventListener('resize',fit);
    this.ripples=[];
    addEventListener('pointerdown',e=>{ if(this.reduced) return; this.ripples.push({x:e.clientX,y:e.clientY,r:0,a:.5}); });
    const loop=()=>{ ctx.clearRect(0,0,cv.width,cv.height);
      this.ripples=this.ripples.filter(rp=>rp.a>0.02);
      this.ripples.forEach(rp=>{ rp.r+=4; rp.a*=0.95;
        ctx.beginPath(); ctx.arc(rp.x,rp.y,rp.r,0,Math.PI*2);
        ctx.strokeStyle=`rgba(52,198,224,${rp.a})`; ctx.lineWidth=2; ctx.stroke(); });
      requestAnimationFrame(loop); };
    if(!this.reduced) loop(); },
  rippleAt(el){ if(this.reduced||!this.ripples) return; const r=el.getBoundingClientRect();
    this.ripples.push({x:r.left+r.width/2,y:r.top+r.height/2,r:0,a:.6}); }
};

const Reveal = {
  io:null,
  init(){ this.io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); this.io.unobserve(e.target); } }),{threshold:.12});
    this.scan(); },
  scan(){ if(!this.io) return; document.querySelectorAll('.reveal:not(.in)').forEach(el=>this.io.observe(el)); }
};

/* ============================================================ TAB WIRING + INIT */
document.getElementById('consoleTabs').addEventListener('click',e=>{
  const b=e.target.closest('.ctab'); if(b) Console.tab(b.dataset.tab,b);
});
// hide topbar on scroll down, show on up (spatial nicety)
let lastY=0;
addEventListener('scroll',()=>{ const y=scrollY; const bar=document.getElementById('topbar');
  bar.style.transform = (y>lastY && y>200) ? 'translateX(-50%) translateY(-130%)' : 'translateX(-50%)'; lastY=y; });

function boot(){
  Store.load();
  // restore firebase if previously published with cloud
  if(Store.state.config.published && Store.state.config.cloud && Store.state.config.firebase){
    Settings.initFirebase(Store.state.config.firebase);
  }
  Render.all();
  Reveal.init();
  Physics.initRipple();
  Cart.bump();
}
boot();
</script>
</body>
</html>
