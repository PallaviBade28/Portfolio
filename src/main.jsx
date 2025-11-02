import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// --- custom cursor + magnetic micro-interactions ---
// Expose a small API at window.CustomCursorAPI so UI can toggle it at runtime.
(function createCustomCursorAPI(){
  const STORAGE_KEY = 'customCursorEnabled';
  let cursorEl = null;
  let mouseMoveHandler = null;
  

  function supportsFinePointer(){
    try{
      return window.matchMedia && window.matchMedia('(pointer: fine)').matches;
    }catch(e){
      return false;
    }
  }

  function prefersReducedMotion(){
    try{ return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){ return false; }
  }

  function create(){
    if (cursorEl) return;
    cursorEl = document.createElement('div');
    cursorEl.className = 'custom-cursor';
    document.body.appendChild(cursorEl);

    // cursor positions for lerp smoothing + magnetic inertia
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let curX = targetX;
    let curY = targetY;
  // lerp factor (0-1). tuned for snappy-yet-smooth feel
  const ease = 0.18;
    let rafId = null;

    // last mouse event used by magnetic calculations
    let lastMouse = { clientX: targetX, clientY: targetY };

  // store per-element animated state to apply inertia
  const elementState = new WeakMap();
    // cached magnetic elements to avoid querying DOM each frame
    let magneticElements = Array.from(document.querySelectorAll('.magnetic'));
    // mutation observer to refresh cache when DOM changes
    let mo = null;
    try{
      mo = new MutationObserver(()=>{
        magneticElements = Array.from(document.querySelectorAll('.magnetic'));
      });
      // observe only subtree changes and class attribute changes to refresh cache
      mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    }catch(e){ mo = null; }

    // detect very low-end devices and optionally disable heavy effects
    let disableHeavy = false;
    try{
      const dm = navigator.deviceMemory || 0;
      const hc = navigator.hardwareConcurrency || 0;
      if ((dm > 0 && dm < 2) || (hc > 0 && hc <= 1)){
        disableHeavy = true;
        document.documentElement.classList.add('no-heavy-effects');
      }
    }catch(e){ disableHeavy = false; }

    mouseMoveHandler = (e)=>{
      targetX = e.clientX;
      targetY = e.clientY;
      lastMouse = e;
    };
    window.addEventListener('mousemove', mouseMoveHandler, {passive:true});

    // pause rAF processing when page hidden to save CPU
    let visible = true;
    const onVisibility = ()=>{
      visible = document.visibilityState === 'visible';
      if (visible && !rafId) rafId = requestAnimationFrame(step);
    };
    document.addEventListener('visibilitychange', onVisibility);

    let lastTime = performance.now();
    const frameSkipThreshold = 40; // ms

    function step(timestamp){
      const delta = Math.max(0, timestamp - lastTime);
      lastTime = timestamp;
      // cursor lerp
      curX += (targetX - curX) * ease;
      curY += (targetY - curY) * ease;
      if (cursorEl) cursorEl.style.transform = `translate(${curX}px, ${curY}px)`;
      // magnetic inertia: compute targets and lerp per-element state
      try{
        if (!disableHeavy){
          const els = magneticElements; // cached list
          const heavyFrame = delta > frameSkipThreshold;
          const ih = window.innerHeight, iw = window.innerWidth;
          for(const el of els){
            // skip elements outside viewport quickly
            const r = el.getBoundingClientRect();
            if (r.bottom < 0 || r.top > ih || r.right < 0 || r.left > iw) continue;
            const cx = r.left + r.width/2; const cy = r.top + r.height/2;
            const dx = lastMouse.clientX - cx; const dy = lastMouse.clientY - cy;
            const dist = Math.hypot(dx,dy);
            const max = Math.max(r.width, r.height) * 1.2;

            // desired transform
            let tx = 0, ty = 0, scale = 1;
            if (dist < max && !heavyFrame){
              const strength = (1 - dist/max) * 8; // pixels
              tx = dx / - (20/strength);
              ty = dy / - (20/strength);
              scale = 1 + strength/120;
            }

            let state = elementState.get(el);
            if (!state) { state = { tx: 0, ty: 0, scale: 1 }; elementState.set(el, state); }

            // if frame is heavy, gently decay toward resting state to avoid jumps
            const sEase = heavyFrame ? 0.06 : 0.18;
            state.tx += (tx - state.tx) * sEase;
            state.ty += (ty - state.ty) * sEase;
            state.scale += (scale - state.scale) * sEase;

            // use translate3d for GPU compositing
            el.style.transform = `translate3d(${state.tx}px, ${state.ty}px, 0) scale(${state.scale})`;
          }
        }
      }catch(err){/* ignore DOM read errors */}

      rafId = requestAnimationFrame(step);
    }
    rafId = requestAnimationFrame(step);

    

    // disable neon halo on low-memory devices or small viewports to save paint
    try{
      const deviceMemory = navigator.deviceMemory || 0;
      const lowMemory = deviceMemory > 0 && deviceMemory < 4;
      if (lowMemory || window.innerWidth < 1100) {
        document.documentElement.classList.add('no-cursor-halo');
      }
    }catch(e){}

    // mark html so CSS hides native cursor
    document.documentElement.classList.add('custom-cursor-enabled');
  }

  function destroy(){
    if (!cursorEl) return;
    try{
      window.removeEventListener('mousemove', mouseMoveHandler);
      if (rafId) cancelAnimationFrame(rafId);
    }catch(e){}
    cursorEl.remove(); cursorEl = null; mouseMoveHandler = null;
    // disconnect mutation observer
    try{ if (mo) mo.disconnect(); }catch(e){}
    magneticElements = [];
    document.documentElement.classList.remove('custom-cursor-enabled');
    try{ document.removeEventListener('visibilitychange', onVisibility); }catch(e){}
    // clear transforms on magnetic elements
    try{
      document.querySelectorAll('.magnetic').forEach(el=>el.style.transform='');
    }catch(e){}
  }

  function isEnabled(){
    try{
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === null) return true;
      return v === '1';
    }catch(e){
      return true;
    }
  }

  function enable(){
    // don't enable if user requests reduced motion
    if (prefersReducedMotion()) return;
    // only enable on fine pointer and desktop width
    if (!supportsFinePointer() || window.innerWidth < 768) return;
    create();
    try{ localStorage.setItem(STORAGE_KEY, '1'); }catch(e){}
  }

  function disable(){
    destroy();
    try{ localStorage.setItem(STORAGE_KEY, '0'); }catch(e){}
  }

  // expose API
  window.CustomCursorAPI = { enable, disable, isEnabled };

  // Auto-initialize if enabled and environment looks appropriate
  try{
    if (isEnabled() && !prefersReducedMotion() && supportsFinePointer() && window.innerWidth >= 768) enable();
  }catch(e){}
})();
