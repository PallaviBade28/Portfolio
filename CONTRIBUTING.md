# Contributing

Thanks for contributing! A couple of repo conventions help keep the codebase clean and consistent.

Local checks (run these before opening a PR):

1. Install dependencies

```powershell
npm install
```

2. Format files with Prettier

```powershell
npm run format
```

3. Run ESLint (will error on warnings because CI is strict)

```powershell
npm run lint
```

Pre-commit hooks

- This repo uses Husky + lint-staged. Running `git commit` will automatically run ESLint (with --fix) and Prettier on staged files.
- If a pre-commit hook prevents a commit, fix the reported issues or run the lint/format commands above.

CI checks

- The project has a `lint` GitHub Action that runs Prettier (check) and ESLint on PRs and pushes to `main`.
- We also run scheduled auto-fix jobs that open PRs with automatic ESLint/Prettier fixes.

If you find stylistic or lint rules you disagree with, open an issue or PR to discuss changes — we try to keep rules minimal and practical.

Thanks for helping keep the code quality high! 🎯
