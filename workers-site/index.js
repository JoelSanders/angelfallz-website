// Cloudflare Worker for SPA routing with Workers Sites
import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event));
});

async function handleRequest(event) {
  const url = new URL(event.request.url);
  const pathname = url.pathname;
  
  // API endpoints for admin settings
  if (pathname === '/api/prelaunch/status') {
    return handlePrelaunchStatus(event);
  }
  
  if (pathname === '/api/prelaunch/toggle' && event.request.method === 'POST') {
    return handlePrelaunchToggle(event);
  }
  
  try {
    // Try to serve the static asset
    return await getAssetFromKV(event);
  } catch (e) {
    // If 404, check if it's not an actual asset file
    const isAsset = pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|json|glb|webp)$/i);
    
    // If it's not an asset, serve index.html for SPA routing
    if (!isAsset) {
      try {
        // Modify the request to get index.html
        const indexRequest = new Request(url.origin + "/index.html", event.request);
        const indexEvent = Object.assign({}, event, { request: indexRequest });
        return await getAssetFromKV(indexEvent);
      } catch (e) {
        return new Response("Not Found", { status: 404 });
      }
    }
    
    // If it's an asset that's not found, return 404
    return new Response("Not Found", { status: 404 });
  }
}

// Get prelaunch status
async function handlePrelaunchStatus(event) {
  try {
    const enabled = await SETTINGS.get('prelaunch_enabled');
    return new Response(JSON.stringify({ enabled: enabled === 'true' }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({ enabled: false }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Toggle prelaunch status (requires auth in production)
async function handlePrelaunchToggle(event) {
  try {
    const body = await event.request.json();
    const { enabled, password } = body;
    
    // Simple password check (same as admin page - admin123)
    if (password !== 'admin123') {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    await SETTINGS.put('prelaunch_enabled', enabled ? 'true' : 'false');
    
    return new Response(JSON.stringify({ success: true, enabled }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed to update' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

