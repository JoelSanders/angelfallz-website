# Cloudflare KV Setup for Persistent Prelaunch

## What Changed?
The prelaunch mode now uses **Cloudflare Workers KV** instead of localStorage, making it global for all users across all devices.

## Setup Steps

### 1. Create KV Namespace in Cloudflare Dashboard

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select your account
3. Go to **Workers & Pages** in the left sidebar
4. Click **KV** tab
5. Click **Create a namespace**
6. Name it: `SETTINGS`
7. Click **Add**

### 2. Get the Namespace ID

After creating the namespace, you'll see it listed with an ID like: `abc123def456...`

Copy this ID.

### 3. Update `wrangler.toml`

Open `wrangler.toml` and replace the `id` and `preview_id` with your actual namespace ID:

```toml
[[kv_namespaces]]
binding = "SETTINGS"
id = "YOUR_ACTUAL_KV_NAMESPACE_ID_HERE"
preview_id = "YOUR_ACTUAL_KV_NAMESPACE_ID_HERE"
```

### 4. Deploy

After updating the ID, commit and deploy:

```bash
npm run build
git add .
git commit -m "Update KV namespace ID"
git push origin main
```

Cloudflare will automatically redeploy.

## How It Works

1. **Admin Page**: When you toggle prelaunch on/off, it saves to Cloudflare KV (global storage)
2. **All Users**: When anyone visits the site, it checks KV for the prelaunch status
3. **Persistent**: The setting persists across all devices and users until you toggle it off

## API Endpoints

The worker now provides these API endpoints:

- `GET /api/prelaunch/status` - Returns current prelaunch status
- `POST /api/prelaunch/toggle` - Toggles prelaunch (requires admin password)

## Testing

1. Go to `https://angelfallz.co.uk/#/admin`
2. Login with password: `admin123`
3. Toggle "Prelaunch Mode"
4. Open your site on a different device or in incognito mode
5. You should see the prelaunch page!

## Future: Supabase Integration

When you're ready to move to Supabase, we'll replace:
- KV storage → Supabase database
- Hardcoded password → Supabase Auth
- Email collection → Supabase table

