# CloudFlare Pages Deployment Guide

## 📦 Configuration

The project is now configured for CloudFlare Pages deployment with the following settings:

### Build Configuration

In your CloudFlare Pages project settings, use these build settings:

**Framework preset:** `None` or `Vite`

**Build command:**
```bash
npm run build
```

**Build output directory:**
```
dist
```

**Root directory (advanced):**
```
/
```

### Environment Variables
No environment variables are required for this static site.

## 🚀 Alternative: Deploy via Wrangler CLI

If you prefer to deploy via command line:

```bash
npx wrangler pages deploy dist --project-name=angelfallz-website
```

## 📝 Build Settings Summary

- **Node version:** 18.x or higher (detected: 22.16.0)
- **Package manager:** npm
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Deploy command:** `npx wrangler pages deploy dist` (if using CLI)

## ✅ What's Included

- React + TypeScript application
- Vite build system
- Tailwind CSS
- Three.js 3D model viewer
- Liquid Ether animated background
- Shop pages
- Dark/Light mode toggle

## 🔧 Troubleshooting

If deployment fails:

1. **Check build output:** Ensure the `dist` folder is created
2. **Verify output directory:** Make sure "dist" is specified in CloudFlare settings
3. **Check node version:** Ensure Node 18+ is being used
4. **Clear cache:** In CloudFlare Pages, try clearing build cache

## 📊 Build Stats

- Bundle size: ~1.07 MB (298 KB gzipped)
- Build time: ~10 seconds
- Assets: 3 files (HTML, CSS, JS)

