import { useEffect, useState } from 'react';

const STORAGE_KEY = 'customCursorEnabled';

export default function CursorToggle() {
  const [enabled, setEnabled] = useState(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      return v === null ? true : v === '1';
    } catch (e) {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, enabled ? '1' : '0');
    } catch (e) {}
    if (typeof window !== 'undefined' && window.CustomCursorAPI) {
      if (enabled) window.CustomCursorAPI.enable();
      else window.CustomCursorAPI.disable();
    }
  }, [enabled]);

  // transient pulse to animate the indicator when enabling
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    if (enabled) {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 900);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [enabled]);

  return (
    <button
      className="ml-3 px-3 py-1 rounded-md bg-white/6 text-sm text-zinc-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7b2ff7] flex items-center"
      aria-pressed={enabled}
      aria-label={enabled ? 'Disable custom cursor' : 'Enable custom cursor'}
      onClick={() => setEnabled((s) => !s)}
      title={enabled ? 'Disable custom cursor' : 'Enable custom cursor'}
    >
      <span className={`cursor-indicator ${enabled ? 'on' : 'off'} ${pulse ? 'pulse' : ''}`} aria-hidden />
      <span className="sr-only">Custom cursor</span>
      <span className="ml-2">{enabled ? 'Cursor: On' : 'Cursor: Off'}</span>
    </button>
  );
}
