Add your assets here:

- cinematic-bg.mp4    -> Site-wide looping video background (place an MP4 here)
- resume.pdf         -> Your resume PDF linked from the Resume button
- og.png             -> Open Graph image (optional)
- favicon.ico        -> Favicon (optional)
- models/hero-model.glb -> (optional) place your polished GLB here to be shown in the Hero section

Then run:
  npm install
  npm run dev

Notes:
- If you don't provide `public/models/hero-model.glb`, the Hero will show a procedural 3D orb as a fallback.
- You can use a remote GLB by editing `src/components/HeroModel.jsx` and passing a `path` prop to the component.
