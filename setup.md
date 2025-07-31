# WF‑LP Local Setup Guide (`setup.md`)

> **Purpose**
> Run the Figma Make–exported WisteriaForest website locally at
> `C:\Users\jkwrr\Documents\wf-lp`, replacing Figma‑specific services with a
> self‑hosted setup and preparing for future CMS integration.

---

## 0 Prerequisites

| Tool              | Version (minimum) | Notes                                  |
| ----------------- | ----------------- | -------------------------------------- |
| Node.js           | ≥ 20.x            | Use Volta or nvm‑windows to manage.    |
| pnpm / npm / yarn | Latest LTS        | The script auto‑detects which to use.  |
| Git               | Any               | Needed for version control (optional). |

---

## 1 Initial House‑Keeping

1. **Open workspace**

   ```powershell
   cd C:\Users\jkwrr\Documents\wf-lp
   ```

2. **Install dependencies**
   The helper script will choose the right package manager:

   ```bash
   # pnpm‑first preference
   pnpm install          # if pnpm‑lock.yaml exists
   # npm fallback
   npm ci                # if package‑lock.json exists
   # yarn fallback
   yarn install          # if yarn.lock exists
   ```

3. **Pause on errors**
   If peer‑dependency or postinstall errors appear, stop and ask for guidance.

---

## 2 Environment Variables

1. Create **`.env.local`** (Next.js/Vite) or **`.env`** (other frameworks) in the project root:

   ```dotenv
   # --- Supabase ---
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=

   # --- Resend ---
   RESEND_API_KEY=

   # --- Site metadata ---
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

2. Ensure `.gitignore` contains:

   ```gitignore
   # Environment files
   .env*
   ```

---

## 3 Supabase Client

1. Locate or create `lib/supabase.ts`:

   ```ts
   import { createClient } from '@supabase/supabase-js';

   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
   const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

   export const supabase = createClient(supabaseUrl, supabaseAnonKey);
   ```

2. Replace any hard‑coded keys/URLs with the env vars above.

---

## 4 Resend Email API

1. Search the repo for `Resend` or `@resend/…`.
2. Move any inline keys to `process.env.RESEND_API_KEY`.
3. Install the SDK if missing:

   ```bash
   pnpm add resend   # or npm install resend --save / yarn add resend
   ```

---

## 5 Static Assets

1. Make a folder:

   ```bash
   mkdir -p public/images
   ```

2. Move exported images from Figma (**/assets** or **/public**) into `public/images`.

3. Update JSX/TSX references, changing remote Figma CDN URLs to `/images/<file>`.

---

## 6 Framework‑Specific Tweaks

<details>
<summary><strong>Next.js</strong></summary>

* Remove `images.remotePatterns` entries that point to Figma CDN in `next.config.js`.
* Add `output: 'standalone'` if Docker deployment is planned.

</details>

<details>
<summary><strong>Vite (+ React)</strong></summary>

* Check `vite.config.ts` for `assetsInclude` patterns if images are imported rather than referenced by path.

</details>

---

## 7 Type Safety & Linting

```bash
pnpm lint           # or npm run lint / yarn lint
pnpm type-check     # or tsc --noEmit
```

* Fix obvious errors (unused imports, trivial `any` types).
* Surface non‑trivial issues for review.

---

## 8 Run the Dev Server

```bash
pnpm dev            # or npm run dev / yarn dev
```

1. Open [http://localhost:3000](http://localhost:3000).
2. Verify:

   * All pages route correctly.
   * Supabase calls fail gracefully (until keys are provided).
   * No missing images (404).

---

## 9 Git Hygiene (Optional)

```bash
git init                      # if .git is absent
git add .
git commit -m "chore: migrate Figma Make export to local wf‑lp project"
```

---

## Done Criteria ✔️

* `pnpm dev` (or equivalent) serves the site without runtime errors.
* No hard‑coded secrets or Figma CDN dependencies remain.
* Environment variables live only in `.env*` files.

---

## Next Steps (Out of Scope for Today)

* Introduce a lightweight CMS layer (Supabase tables + Admin UI).
* Add image uploads to Supabase Storage.
* Configure Resend transactional templates.
* Set up CI/CD (e.g., GitHub Actions) for a `staging` branch.

---

**Happy coding!**
