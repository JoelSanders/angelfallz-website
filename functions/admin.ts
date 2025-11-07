// Serve index.html for /admin route
export async function onRequest(context: any) {
  const { env, request } = context;
  
  // Create a request for index.html
  const url = new URL(request.url);
  url.pathname = '/index.html';
  
  return env.ASSETS.fetch(new Request(url, request));
}

