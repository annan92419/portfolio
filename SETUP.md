# Setup Guide — Annan's Portfolio

Everything you need to get this project running again on any computer, from scratch.

---

## 1. Get the code

```bash
git clone https://github.com/annan92419/portfolio.git
cd portfolio
```

---

## 2. Install system tools

You need these installed globally before anything else works.

### Node.js (v22 or later)
Download from https://nodejs.org — choose the LTS version.

Verify: `node --version` should show `v22.x.x`

### pnpm (package manager)
```bash
npm install -g pnpm
```

Verify: `pnpm --version` should show `10.x.x`

### Git
Usually pre-installed on Mac/Linux. On Windows download from https://git-scm.com.

Verify: `git --version`

### Claude Code (the AI assistant CLI)
```bash
npm install -g @anthropic/claude-code
```

Then log in:
```bash
claude
```

It will prompt you to authenticate with your Anthropic account the first time.

---

## 3. Install project dependencies

From inside the portfolio folder:

```bash
pnpm install
```

This installs everything listed in `package.json` — Next.js, Tailwind, Framer Motion, etc.

---

## 4. Run the project locally

```bash
pnpm dev
```

Open http://localhost:3000 in your browser. You should see your portfolio.

---

## 5. Re-enable Claude Code plugins (MCPs)

These were used to build the portfolio and you'll want them again when continuing development.

### Vercel plugin (for deploying)
Inside Claude Code, run:
```
/install vercel
```
Or go to **Settings → Plugins** and enable `vercel`.

### context7 (live Next.js docs)
Used to look up up-to-date Next.js documentation during development. Enable via:
```
/install context7
```

### GitHub MCP (for repo management)
Used to create and push the repo. You can re-enable it from Claude Code settings.

> **Note:** Plugins are stored on your computer at `~/.claude/plugins/`, not inside the repo. That's why you need to re-install them on a new machine.

---

## 6. Set up Vercel (for deployment)

Install the Vercel CLI:
```bash
npm install -g vercel
```

Log in:
```bash
vercel login
```

Link this project to your Vercel account:
```bash
vercel link
```

Deploy to production:
```bash
vercel --prod
```

Your live site URL is: check your Vercel dashboard at https://vercel.com/dashboard

---

## 7. Continue making changes

The basic workflow for any edit:

```bash
# 1. Make your changes in the src/ folder
# 2. Save the file
# 3. Commit and push

git add .
git commit -m "describe what you changed"
git push
```

Or open Claude Code and just describe what you want:
```bash
claude
```

Then tell it what to change in plain English.

---

## Project stack summary

| Tool | Purpose | Version used |
|---|---|---|
| Next.js | Web framework | 16.x |
| React | UI library | 19.x |
| Tailwind CSS | Styling | 4.x |
| Framer Motion | Animations | 12.x |
| TypeScript | Type safety | 5.x |
| pnpm | Package manager | 10.x |
| Node.js | Runtime | 22.x |
| Claude Code | AI assistant CLI | latest |
| Vercel | Hosting/deployment | — |

---

## If something breaks

- **Port 3000 already in use:** `pnpm dev -- -p 3001` to use a different port
- **Module not found errors:** run `pnpm install` again
- **Git push rejected:** make sure you're logged into the right GitHub account with `git config user.email`
- **Vercel deploy fails:** run `vercel login` to re-authenticate
