// Cloudflare Pages Functions middleware for SPA routing
export async function onRequest(context: any) {
  try {
    const { request, next, env } = context;
    const url = new URL(request.url);
    const pathname = url.pathname;
    
    // Skip middleware for asset requests (files with extensions)
    const isAsset = pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|json|glb|webp)$/i);
    if (isAsset) {
      return next();
    }
    
    // Try to serve the request
    const response = await next();
    
    // If we get a 404 and it's not an asset, serve index.html for client-side routing
    if (response.status === 404 && !isAsset) {
      // Get index.html from the assets
      const indexRequest = new Request(new URL('/', url.origin), {
        method: 'GET',
        headers: request.headers,
      });
      
      return env.ASSETS.fetch(indexRequest);
    }
    
    return response;
  } catch (err) {
    // If anything fails, try to serve from assets directly
    return context.env.ASSETS.fetch(context.request);
  }
}


