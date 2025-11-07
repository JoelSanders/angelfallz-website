// Cloudflare Pages catch-all route for SPA
export async function onRequest(context: any) {
  const { request, env } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Check if this is a request for a static asset
  const isAsset = pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|json|glb|webp|txt|xml)$/i);
  
  if (isAsset) {
    // Serve the asset directly
    try {
      return await env.ASSETS.fetch(request);
    } catch (e) {
      return new Response('Asset not found', { status: 404 });
    }
  }
  
  // For all other routes, serve index.html (SPA routing)
  try {
    const indexUrl = new URL('/', url.origin);
    const indexRequest = new Request(indexUrl, {
      method: 'GET',
      headers: request.headers,
    });
    return await env.ASSETS.fetch(indexRequest);
  } catch (e) {
    return new Response('Page not found', { status: 404 });
  }
}

