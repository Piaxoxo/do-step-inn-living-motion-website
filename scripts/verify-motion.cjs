/**
 * Motion regression check for the Do Step Inn Living site.
 *
 * A scroll-driven page fails quietly: a pin can print itself over the next
 * section, a reveal can stick at opacity 0, the film can stop following the
 * scroll — and the build still passes. This drives a real browser and asserts
 * the behaviour instead. It caught both of those bugs during the first build.
 *
 * Playwright is not a dependency of this project; fetch it on demand:
 *
 *   cd website && npm run dev                 # in one shell
 *   npx --yes playwright@latest node ../scripts/verify-motion.cjs   # in another
 *
 * Or, with playwright already installed somewhere:
 *   NODE_PATH=/path/to/node_modules node scripts/verify-motion.cjs
 *
 * Env: URL (default http://127.0.0.1:5173), CHROMIUM (browser executable path).
 * Exits non-zero if any check fails.
 */
const { chromium } = require('playwright');

const U = process.env.URL || 'http://127.0.0.1:5173/';
const L = {
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
  ...(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {}),
};
const go=async(p,y)=>p.evaluate(y=>{if(window.__lenis)window.__lenis.scrollTo(y,{immediate:true});window.scrollTo(0,y);},y);
const fail=[];
const check=(name,ok,detail)=>{console.log(`${ok?'PASS':'FAIL'}  ${name}${detail?'  '+detail:''}`); if(!ok)fail.push(name);};

(async()=>{
  const b=await chromium.launch(L);
  const p=await b.newPage({viewport:{width:1440,height:900}});
  // Only same-origin failures are the site's problem; a blocked third-party
  // host (fonts, analytics) is an environment condition, not a regression.
  const errs = [];
  const origin = new URL(U).origin;
  p.on('pageerror', (e) => errs.push('pageerror: ' + e.message));
  p.on('requestfailed', (r) => { if (r.url().startsWith(origin)) errs.push('requestfailed: ' + r.url()); });
  p.on('response', (r) => { if (r.status() >= 400 && r.url().startsWith(origin)) errs.push(r.status() + ' ' + r.url()); });
  await p.goto(U,{waitUntil:'domcontentloaded',timeout:20000});
  await p.waitForTimeout(2500);

  const meta=await p.evaluate(async()=>{const v=window.__bgv;
    if(v&&v.readyState<1)await new Promise(r=>v.addEventListener('loadedmetadata',r,{once:true}));
    return {rs:v.readyState,dur:v.duration,hooks:!!window.__lenis&&!!window.__ST};});
  check('film loads + dev hooks', meta.rs>=1 && meta.dur>0 && meta.hooks, `readyState=${meta.rs} duration=${meta.dur}`);

  // scrub monotonic in both directions
  const max=await p.evaluate(()=>document.documentElement.scrollHeight-window.innerHeight);
  const fwd=[];
  for(const f of [0,.2,.4,.6,.8,1]){await go(p,max*f);await p.waitForTimeout(550);
    fwd.push(await p.evaluate(()=>+window.__bgv.currentTime.toFixed(3)));}
  const back=[];
  for(const f of [.8,.6,.4,.2,0]){await go(p,max*f);await p.waitForTimeout(550);
    back.push(await p.evaluate(()=>+window.__bgv.currentTime.toFixed(3)));}
  check('scrub forward is monotonic', fwd.every((v,i)=>i===0||v>fwd[i-1]), JSON.stringify(fwd));
  check('scrub reverse is monotonic', back.every((v,i)=>i===0||v<back[i-1]), JSON.stringify(back));
  check('scrub spans the film', fwd[0]===0 && fwd[5]>meta.dur-0.2, `${fwd[0]} -> ${fwd[5]} of ${meta.dur}`);

  // pin geometry: no overlap into #living
  const stayTop=await p.evaluate(()=>document.getElementById('stay').getBoundingClientRect().top+window.scrollY);
  await go(p,stayTop+900*1.8*0.95);await p.waitForTimeout(700);
  const words=await p.evaluate(()=>[...document.querySelectorAll('.stay-word')].map(w=>+(+w.style.opacity).toFixed(2)));
  check('pinned reveal resolves', words.every(o=>o>0.9), JSON.stringify(words));
  const ly=await p.evaluate(()=>document.getElementById('living').getBoundingClientRect().top+window.scrollY);
  await go(p,ly);await p.waitForTimeout(700);
  const bleed=await p.evaluate(()=>{const r=document.querySelector('.stay-word').getBoundingClientRect();
    return r.bottom>0&&r.top<window.innerHeight;});
  check('pinned text does not bleed into #living', !bleed);

  // contrast: hero copy over the film
  const contrast=await p.evaluate(()=>{
    const lum=c=>{const [r,g,b]=c.match(/\d+/g).map(Number).map(v=>{v/=255;return v<=0.03928?v/12.92:((v+0.055)/1.055)**2.4;});
      return 0.2126*r+0.7152*g+0.0722*b;};
    const t=lum(getComputedStyle(document.querySelector('.hero__title')).color);
    const bg=lum('rgb(11,16,32)');
    return +(((Math.max(t,bg)+0.05)/(Math.min(t,bg)+0.05))).toFixed(2);});
  check('hero copy clears WCAG AA on the base ground', contrast>=4.5, `ratio ${contrast}`);

  for(const w of [1440,1024,768,390,320]){
    await p.setViewportSize({width:w,height:844});await p.waitForTimeout(450);
    const o=await p.evaluate(w=>document.documentElement.scrollWidth<=w+1,w);
    check(`no horizontal overflow @ ${w}px`, o);
  }
  check('no page errors or failed same-origin requests', errs.length === 0, errs.slice(0, 3).join(' | '));
  await p.close();

  // fallbacks
  const m=await b.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  await m.goto(U,{waitUntil:'domcontentloaded',timeout:20000});await m.waitForTimeout(2000);
  const mob=await m.evaluate(()=>({v:getComputedStyle(document.querySelector('#bgv')).display,
    poster:getComputedStyle(document.querySelector('.mobile-poster')).display,hook:!!window.__bgv,
    btnFits:document.querySelector('.nav .btn').getBoundingClientRect().right<=386}));
  check('touch: film off, poster on, nav fits', mob.v==='none'&&mob.poster==='block'&&!mob.hook&&mob.btnFits, JSON.stringify(mob));
  await m.close();

  const r=await b.newPage({viewport:{width:1440,height:900}});
  await r.emulateMedia({reducedMotion:'reduce'});
  await r.goto(U,{waitUntil:'domcontentloaded',timeout:20000});await r.waitForTimeout(1800);
  const red=await r.evaluate(()=>({lenis:!!window.__lenis,bgv:!!window.__bgv,
    hero:getComputedStyle(document.querySelector('.hero__title')).opacity,
    word:getComputedStyle(document.querySelector('.stay-word')).opacity}));
  check('reduced-motion: no smooth scroll, no film, all copy visible',
    !red.lenis&&!red.bgv&&red.hero==='1'&&red.word==='1', JSON.stringify(red));
  await r.close();

  await b.close();
  console.log(fail.length?`\n${fail.length} FAILED: ${fail.join(', ')}`:'\nall checks passed');
  process.exit(fail.length?1:0);
})();
