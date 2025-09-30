/* antiInspect.js (updated) 
   Watermark disabled by default (watermark: false).
   Shared anti-inspect + anti-copy script — include on many pages.
   Pages can still explicitly enable watermark via window.__ANTI_INSPECT_CONFIG
*/

(function antiInspectAll(){
  const pageConfig = (typeof window !== 'undefined' && window.__ANTI_INSPECT_CONFIG) ? window.__ANTI_INSPECT_CONFIG : {};
  const defaults = {
    blockContextMenu: true,
    blockKeys: true,
    blockConsole: false,
    detectDevtools: true,
    onDevtoolsDetected: 'overlay',
    redirectURL: 'about:blank',
    overlayMessage: 'Developer tools detected. Reload the page to continue.',
    checkInterval: 500,

    disableSelection: true,
    disableCopyCutPaste: true,
    preventPrintScreen: true,
    printScreenObscureMs: 700,

    // WATERMARK DEFAULT: disabled now
    watermark: false,             // <-- changed to false
    watermarkText: 'CONFIDENTIAL',
    watermarkOpacity: 0.08,
    watermarkRepeat: true
  };
  const o = Object.assign({}, defaults, pageConfig || {});

  /* ---------- CONTEXT MENU & KEYS ---------- */
  if (o.blockContextMenu) {
    document.addEventListener('contextmenu', e => { e.preventDefault(); return false; }, {capture:true});
  }

  if (o.blockKeys) {
    window.addEventListener('keydown', function(e){
      if (e.key === 'F12') { e.preventDefault(); e.stopPropagation(); return false; }
      if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
        e.preventDefault(); e.stopPropagation(); return false;
      }
      if (e.ctrlKey && (e.key === 'U' || e.key === 'S' || e.key === 'P')) {
        e.preventDefault(); e.stopPropagation(); return false;
      }
      if ((e.metaKey && e.shiftKey && e.key === 'I') || (e.metaKey && e.key === 'U')) {
        e.preventDefault(); e.stopPropagation(); return false;
      }
      if (o.preventPrintScreen && (e.key === 'PrintScreen' || e.key === 'Print')) {
        e.preventDefault(); e.stopPropagation();
        triggerObscureForPrint();
        return false;
      }
    }, true);
  }

  /* ---------- CONSOLE STUB ---------- */
  if (o.blockConsole) {
    try {
      const noop = function(){};
      ['log','info','warn','error','debug','table','dir'].forEach(k=>{
        if (window.console && window.console[k]) {
          try { Object.defineProperty(window.console, k, { value: noop, configurable: true }); }
          catch(e){ window.console[k] = noop; }
        }
      });
    } catch(e){}
  }

  /* ---------- SELECTION / COPY / PASTE / DRAG ---------- */
  if (o.disableSelection) {
    const styleId = '__antiInspect_user_select_style';
    if (!document.getElementById(styleId)) {
      const s = document.createElement('style');
      s.id = styleId;
      s.innerHTML = `*{ -webkit-user-select: none !important; -moz-user-select: none !important; -ms-user-select: none !important; user-select: none !important; } 
                     input, textarea, [contenteditable="true"]{ -webkit-user-select: text !important; user-select: text !important; }`;
      document.head.appendChild(s);
    }
  }

  if (o.disableCopyCutPaste) {
    ['copy','cut','paste','selectstart','dragstart'].forEach(evt=>{
      document.addEventListener(evt, function(e){
        const el = e.target;
        const allow = el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
        if (!allow) {
          try { e.preventDefault(); } catch (er) {}
          return false;
        }
      }, {capture:true});
    });
  }

  /* ---------- PRINTSCREEN OBSCURING ---------- */
  const __ovId = '__antiInspect_blank_overlay';
  function createObscureOverlay(){
    if (document.getElementById(__ovId)) return;
    const ov = document.createElement('div');
    ov.id = __ovId;
    ov.style.position = 'fixed';
    ov.style.zIndex = 2147483646;
    ov.style.left = 0; ov.style.top = 0; ov.style.right = 0; ov.style.bottom = 0;
    ov.style.background = '#000';
    ov.style.opacity = '1';
    ov.style.transition = 'opacity 120ms linear';
    document.body.appendChild(ov);
  }
  function removeObscureOverlay(){
    const ov = document.getElementById(__ovId);
    if (ov) {
      ov.style.opacity = '0';
      setTimeout(()=>{ if (ov.parentNode) ov.parentNode.removeChild(ov); }, 150);
    }
  }
  let lastObscure = 0;
  function triggerObscureForPrint(){
    const now = Date.now();
    if (now - lastObscure < (o.printScreenObscureMs + 100)) return;
    lastObscure = now;
    createObscureOverlay();
    setTimeout(removeObscureOverlay, o.printScreenObscureMs);
  }
  window.addEventListener('keyup', function(e){
    if (o.preventPrintScreen && (e.key === 'PrintScreen' || e.key === 'Print')) {
      triggerObscureForPrint();
    }
  }, true);
  document.addEventListener('visibilitychange', function(){
    if (document.visibilityState === 'hidden') {
      createObscureOverlay();
      setTimeout(removeObscureOverlay, 500);
    }
  });

  /* ---------- WATERMARK (only if explicitly enabled) ---------- */
  const watermarkId = '__antiInspect_watermark';
  function makeWatermark(){
    if (!o.watermark) return; // now guarded
    if (document.getElementById(watermarkId)) return;
    const wrap = document.createElement('div');
    wrap.id = watermarkId;
    wrap.style.pointerEvents = 'none';
    wrap.style.position = 'fixed';
    wrap.style.left = 0;
    wrap.style.top = 0;
    wrap.style.width = '100%';
    wrap.style.height = '100%';
    wrap.style.zIndex = 2147483645;
    wrap.style.overflow = 'hidden';
    const txt = (o.watermarkText || 'CONFIDENTIAL') + ' • ' + new Date().toLocaleString();
    const frag = document.createDocumentFragment();
    const cols = 6, rows = 6;
    for (let r=0;r<rows;r++){
      for (let c=0;c<cols;c++){
        const el = document.createElement('div');
        el.innerText = txt;
        el.style.position = 'absolute';
        el.style.left = `${(c/cols)*100 + (r%2?5:0)}%`;
        el.style.top = `${(r/rows)*100}%`;
        el.style.transform = 'translate(-50%,-50%) rotate(-30deg)';
        el.style.whiteSpace = 'nowrap';
        el.style.fontSize = '20px';
        el.style.opacity = String(o.watermarkOpacity || 0.08);
        el.style.fontFamily = 'system-ui,Segoe UI,Roboto,Arial';
        el.style.userSelect = 'none';
        el.style.pointerEvents = 'none';
        frag.appendChild(el);
      }
    }
    wrap.appendChild(frag);
    document.body.appendChild(wrap);

    let t = 0;
    setInterval(()=> {
      t += 0.2;
      wrap.style.transform = `translateX(${Math.sin(t)/80 * 100}%)`;
      if (Math.floor(t) % 15 === 0) {
        const nowTxt = (o.watermarkText || 'CONFIDENTIAL') + ' • ' + new Date().toLocaleString();
        wrap.querySelectorAll('div').forEach(d=> d.innerText = nowTxt);
      }
    }, 1200);
  }
  if (o.watermark) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') makeWatermark();
    else document.addEventListener('DOMContentLoaded', makeWatermark, {once:true});
  }

  /* ---------- DEVTOOLS DETECTION ---------- */
  if (o.detectDevtools) {
    let lastState = false;
    function isDevToolsOpen(){
      const threshold = 160;
      try {
        const widthDiff = window.outerWidth - window.innerWidth;
        const heightDiff = window.outerHeight - window.innerHeight;
        if (widthDiff > threshold || heightDiff > threshold) return true;
      } catch(e){}
      let open = false;
      const t0 = performance.now();
      for (let i=0;i<100000;i++) { /* noop */ }
      const t1 = performance.now();
      if (t1 - t0 > 120) open = true;
      return open;
    }
    function handleDetection(){
      const open = isDevToolsOpen();
      if (open && !lastState) {
        lastState = true;
        if (o.onDevtoolsDetected === 'overlay') {
          createObscureOverlay();
        } else if (o.onDevtoolsDetected === 'redirect') {
          try { window.location.href = o.redirectURL; } catch(e){}
        } else if (o.onDevtoolsDetected === 'callback' && typeof o.callback === 'function') {
          try { o.callback(); } catch(e){}
        }
      } else if (!open && lastState) {
        lastState = false;
        removeObscureOverlay();
      }
    }
    setInterval(handleDetection, o.checkInterval);
    setTimeout(handleDetection, 200);
  }

  /* ---------- EXPORT API ---------- */
  window.__antiInspect = {
    triggerObscureForPrint,
    removeObscureOverlay: function(){ removeObscureOverlay(); },
    removeWatermark: function(){ const w=document.getElementById(watermarkId); if (w) w.remove(); },
    options: o
  };

})();
