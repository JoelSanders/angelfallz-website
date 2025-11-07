// Cloudflare Pages Functions middleware for SPA routing
export async function onRequest(context: any) {
  const { request, next } = context;
  const url = new URL(request.url);
  
  // If the request is for an asset (has file extension), let it pass through
  const hasExtension = url.pathname.split('/').pop()?.includes('.');
  
  if (hasExtension) {
    // Serve the asset directly
    return next();
  }
  
  // For all other routes (SPA routes), try to serve the route first
  const response = await next();
  
  // If the route doesn't exist (404), serve index.html for client-side routing
  if (response.status === 404) {
    // Fetch index.html from the origin
    const indexUrl = new URL('/index.html', url.origin);
    return fetch(indexUrl.toString(), {
      headers: request.headers,
    });
  }
  
  return response;
}


