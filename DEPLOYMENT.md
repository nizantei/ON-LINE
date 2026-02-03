# Deployment Guide

This guide explains how to deploy your game online so anyone can play it.

## Quick Start (Easiest)

### Option 1: Netlify (Recommended - Easiest!)

1. Create a free account at [netlify.com](https://www.netlify.com/)
2. Click "Add new site" → "Deploy manually"
3. Run `npm run build` in your project
4. Drag and drop the `dist` folder to Netlify
5. Done! Your game is live with a URL like `your-game.netlify.app`

**To update later:** Just drag and drop a new `dist` folder.

### Option 2: GitHub Pages (Automatic Deployment)

This option automatically rebuilds and deploys your game whenever you push changes to GitHub.

#### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

#### Step 2: Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** → **Pages** (in left sidebar)
3. Under "Source", select **GitHub Actions**
4. Done! The workflow will automatically deploy your game

Your game will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

**Updates:** Just push to GitHub and it auto-deploys!

```bash
git add .
git commit -m "Updated game content"
git push
```

#### Optional: Custom Domain

If you want a custom domain (like `mygame.com`):

1. Buy a domain from Namecheap, Google Domains, etc.
2. Go to Settings → Pages → Custom domain
3. Enter your domain and follow instructions
4. Update `vite.config.js`:
   ```js
   base: process.env.GITHUB_ACTIONS ? '/' : '/',
   ```

---

## Alternative Deployment Options

### Option 3: Vercel

1. Create account at [vercel.com](https://vercel.com/)
2. Click "New Project" → Import from Git
3. Connect your GitHub repo
4. Vercel auto-detects Vite and deploys
5. Done! Live at `your-game.vercel.app`

### Option 4: Self-Hosted (Your Own Server)

1. Run `npm run build`
2. Copy the `dist` folder to your web server
3. Point your domain to the dist folder
4. Make sure your server serves static files

**Example with Nginx:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## Troubleshooting

### Images not loading?

✅ **Check:** All images are in `public/assets/`
✅ **Check:** CSV files reference correct filenames (e.g., `image.jpg` not `/assets/image.jpg`)
✅ **Check:** Image filenames match exactly (case-sensitive on Linux servers)

### CSV data not loading?

✅ **Check:** CSV files are in `public/data/`
✅ **Check:** CSV files have proper headers (see CSVs for examples)
✅ **Check:** Open browser console (F12) for error messages

### Build fails?

✅ **Run:** `npm install` to ensure all dependencies are installed
✅ **Run:** `npm run build` and check for error messages
✅ **Check:** Node version is 18+ (`node --version`)

### GitHub Actions failing?

✅ **Check:** GitHub Pages is enabled in repository settings
✅ **Check:** Source is set to "GitHub Actions" (not "Deploy from branch")
✅ **Check:** Actions tab for error logs

---

## Content Updates

### Update Game Content

1. Edit CSV files in `public/data/`
   - `posts.csv` - Feed posts
   - `chats.csv` - Character messages
   - `endings.csv` - Game endings

2. **Local testing:**
   ```bash
   npm run dev
   ```
   Changes appear immediately when you refresh!

3. **Deploy updates:**
   - **Netlify:** Run `npm run build` and drag `dist` folder
   - **GitHub Pages:** Just `git push` (auto-deploys)
   - **Vercel:** Just `git push` (auto-deploys)

### Add New Images

1. Drop images in `public/assets/`
2. Reference in CSV: `my_image.jpg` (just the filename)
3. Rebuild and deploy

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies (first time) |
| `npm run dev` | Run locally for testing |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `./start.bat` (Windows) | Quick start script |
| `./start.sh` (Mac/Linux) | Quick start script |

---

## Free Hosting Comparison

| Service | Setup Time | Custom Domain | Auto-Deploy | Best For |
|---------|-----------|---------------|-------------|----------|
| **Netlify** | 2 min | ✅ Free | ✅ | Fastest setup |
| **GitHub Pages** | 5 min | ✅ Free | ✅ | Version control |
| **Vercel** | 3 min | ✅ Free | ✅ | Developer-friendly |

All options are **100% free** for static sites like this game!

---

## Need Help?

- Build failing? Check the error in terminal
- Page blank? Open browser console (F12) for errors
- Images missing? Verify they're in `public/assets/`
- Still stuck? Check the CSV file format matches examples
