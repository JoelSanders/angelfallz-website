// Cloudflare Worker for SPA routing
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Check if this is a request for a static asset
    const isAsset = pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|json|glb|webp|html)$/i);

    try {
      // Try to fetch the asset
      const response = await env.ASSETS.fetch(request);
      
      // If it's found, return it
      if (response.status !== 404) {
        return response;
      }
      
      // If it's a 404 and not an asset, serve index.html for SPA routing
      if (!isAsset) {
        const indexUrl = new URL('/', url.origin);
        return env.ASSETS.fetch(new Request(indexUrl, request));
      }
      
      // If it's an asset that's not found, return 404
      return response;
    } catch (e) {
      // Fallback: serve index.html
      const indexUrl = new URL('/', url.origin);
      return env.ASSETS.fetch(new Request(indexUrl, request));
    }
  }
};

