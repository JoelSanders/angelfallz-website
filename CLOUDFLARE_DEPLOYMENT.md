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

**IMPORTANT:** You MUST configure these environment variables in CloudFlare Pages for the Shopify integration to work:

1. Go to your CloudFlare Pages project
2. Navigate to **Settings** → **Environment variables**
3. Add the following variables for **Production** and **Preview**:

| Variable Name | Description | Example |
|--------------|-------------|---------|
| `VITE_SHOPIFY_STORE_DOMAIN` | Your Shopify store domain | `your-store.myshopify.com` |
| `VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Storefront API access token | `abc123...` |

**How to get these values:**
1. Log into your Shopify Admin
2. Go to **Settings** → **Apps and sales channels**
3. Click **Develop apps** → Create or select your app
4. Copy the **Storefront API access token**
5. Your store domain is in your Shopify URL

⚠️ **Without these environment variables, the shop pages will not load products!**

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

### Build Failures

If deployment fails:

1. **Check build output:** Ensure the `dist` folder is created
2. **Verify output directory:** Make sure "dist" is specified in CloudFlare settings
3. **Check node version:** Ensure Node 18+ is being used
4. **Clear cache:** In CloudFlare Pages, try clearing build cache

### Products Not Loading / 404 Errors

If you see 404 errors or products not loading on the deployed site:

1. **Environment Variables Not Set:**
   - Go to CloudFlare Pages → Settings → Environment variables
   - Add `VITE_SHOPIFY_STORE_DOMAIN` and `VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN`
   - Redeploy the site after adding variables

2. **SPA Routing Issues:**
   - Cloudflare Pages uses `functions/_middleware.ts` for SPA routing
   - The `public/_routes.json` file configures which routes to handle
   - Ensure both files are included in your repository
   - DO NOT use `_redirects` file - it causes infinite loop errors on Cloudflare

3. **Shopify Configuration:**
   - Verify your Shopify store is active and products are published
   - Check that the Storefront API app has correct permissions
   - Test your API credentials locally first

## 📊 Build Stats

- Bundle size: ~1.07 MB (298 KB gzipped)
- Build time: ~10 seconds
- Assets: 3 files (HTML, CSS, JS)

