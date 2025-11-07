// Cloudflare Worker for SPA routing with Workers Sites
import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event));
});

async function handleRequest(event) {
  const url = new URL(event.request.url);
  
  try {
    // Try to serve the static asset
    return await getAssetFromKV(event);
  } catch (e) {
    // If 404, check if it's not an actual asset file
    const pathname = url.pathname;
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

