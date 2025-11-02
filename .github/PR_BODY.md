## Summary
This change applies conservative vendor-splitting (manualChunks) and several small runtime/performance hardening fixes to make the site more resilient in production. It also contains the accessibility- and performance-friendly replacements we previously added (safe background, R3F Hero, custom-cursor toggle, magnetic CTAs).

Branch: perf/split-vendors

### What changed
- Conservative vendor chunking added to `vite.config.js` (split React, three/r3f, framer-motion, tsparticles, lucide-react, etc.)
- Performance hardening (rAF-driven small loops, cursor/magnetic inertia, visibility pause, MutationObserver caching) — implemented in `src/main.jsx`.
- Replaced fragile background video with `src/components/BackgroundFX.jsx` (animated gradient fallback).
- Replaced risky video Hero; added R3F torus-knot Hero in `src/components/Hero.jsx`.
- Cursor toggle component and styles: `src/components/CursorToggle.jsx`, changes to `src/index.css`.
- Repo hygiene: updated `.gitignore` and removed unnecessary artifacts.

### Files changed (high-level)
- `vite.config.js` — manualChunks added for conservative vendor splitting
- `src/main.jsx` — CustomCursorAPI, rAF loop, device heuristics, mutation observer, visibility handling
- `src/components/BackgroundFX.jsx` — video removed/fallback gradient
- `src/components/Hero.jsx` — R3F torus-knot hero
- `src/components/CursorToggle.jsx` — toggle + localStorage
- `src/index.css` — theme, animated gradient, reduced-motion rules
- `.gitignore` — cleaned
- `tools/lighthouse-report_live.html` — Lighthouse HTML report (audit results)
- `tools/lighthouse-report_live.json` — Lighthouse JSON report (raw data)

### Key audit metrics (live site)
- Performance score: 0.77
- First Contentful Paint (FCP): 2.8 s (2818 ms) — score 0.56
- Largest Contentful Paint (LCP): 2.9 s (2867 ms) — score 0.81
- Speed Index: 4.7 s (4742 ms) — score 0.68
- Accessibility: 0.92
- Best practices: 0.96
- SEO: 1.00

(Full reports are on the branch under `tools/`.)

### Notes
- The integrated PR creation tool requires GitKraken authentication in this environment; I attempted to create the PR automatically and it prompted for sign-in.
- Alternatives below let you create the PR quickly from your machine.

### How to create the PR locally (PowerShell)
1) (recommended) Use GitHub CLI (needs `gh` and to be authenticated):

```powershell
# from repo root
gh pr create --base main --head perf/split-vendors --title "chore(perf): split vendor chunks (manualChunks) + performance hardening" --body .github/PR_BODY.md
```

2) Or open the GitHub compare page in your browser and create the PR there (web UI):

https://github.com/pallavibade28/Portfolio/compare/main...perf/split-vendors?expand=1

3) If you prefer, sign in to GitKraken and I can re-run the automated PR creation.

### How to review
1. Run the build locally and inspect output:
   - `npm ci`
   - `npm run build`
   - `npx http-server ./dist -p 5000` (or your preferred preview)
2. Inspect `dist/` and compare chunk file sizes (gzipped) to validate vendor splitting.
3. Open `tools/lighthouse-report_live.html` for the full trace and filmstrip.

### Recommended next steps
- Attach the `tools/lighthouse-report_live.html` and `.json` to the PR (or let me post them as comments).
- Run a preview deploy or CI job to verify gzipped chunk sizes on the served build.
- If you want, I can follow up with a compact before/after metrics table and a served-preview job.

---

If you want me to create the PR for you now after you sign in to GitKraken, say so and I'll re-attempt the automated creation; otherwise run the `gh pr create` command above (it's fast and creates the PR with this body).