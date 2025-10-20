// Cloudflare Pages Functions middleware for SPA routing
export async function onRequest(context: any) {
  const { request, next, env } = context;
  const url = new URL(request.url);
  
  // If the request is for an asset (has file extension), let it pass through
  const hasExtension = url.pathname.includes('.') && !url.pathname.endsWith('/');
  
  if (hasExtension) {
    // Try to serve the asset
    const response = await next();
    
    // If asset not found, this is still an asset request, return 404
    if (response.status === 404) {
      return response;
    }
    
    return response;
  }
  
  // For all other routes (SPA routes), try to serve the route first
  const response = await next();
  
  // If the route doesn't exist (404), serve index.html for client-side routing
  if (response.status === 404) {
    return env.ASSETS.fetch(new URL('/index.html', url.origin));
  }
  
  return response;
}

