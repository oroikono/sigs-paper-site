# Deploying to GitHub Pages

## 1. Install dependencies and test locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and confirm everything works.

---

## 2. Set the base path

GitHub Pages serves your site from `https://<username>.github.io/<repo>/`.
You must tell Vite about this sub-path so asset URLs are generated correctly.

**Option A — environment variable (recommended for CI):**

```bash
VITE_BASE=/<repo-name>/ npm run build
```

**Option B — hardcode in `vite.config.js`:**

```js
export default defineConfig({
  plugins: [react()],
  base: "/your-repo-name/",
});
```

---

## 3. Build

```bash
npm run build
```

Output goes to `dist/`.

---

## 4. Deploy

### Option A — Manual push with `gh-pages`

```bash
npm install -g gh-pages
gh-pages -d dist
```

### Option B — GitHub Actions (recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
        env:
          VITE_BASE: /<your-repo-name>/
          # Add VITE_ANON=false here to enable public mode in the deployed build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: dist
```

Replace `<your-repo-name>` with your actual repository name.

---

## 5. GitHub repository settings

1. Go to **Settings → Pages**.
2. Set **Source** to: `Deploy from a branch`.
3. Set **Branch** to: `gh-pages` / `/ (root)`.
4. Click **Save**.

Your site will be live at `https://<username>.github.io/<repo>/` within a few minutes.

---

## Anonymous vs. public mode

| Scenario | Command |
|---|---|
| Double-blind submission (default) | `npm run build` |
| Public / arXiv release | `VITE_ANON=false npm run build` |

Public mode reveals author names, affiliations, and logos configured in
`src/site.config.js`. Make sure to populate `authors`, `affiliations`, and
`logos` before switching to public mode.
