import { NextResponse } from 'next/server';

export function middleware() {
  // retrieve the current response
  const res = NextResponse.next();

  const allowCredentials = process.env.ACCESS_CONTROL_ALLOW_CREDENTIALS || 'false';
  const allowOrigin = process.env.ACCESS_CONTROL_ALLOW_ORIGIN || '*';
  const allowMethods = process.env.ACCESS_CONTROL_ALLOW_METHODS || 'GET, POST, PUT, DELETE';
  const allowHeaders = process.env.ACCESS_CONTROL_ALLOW_HEADERS || '*';

  // add the CORS headers to the response
  res.headers.append('Access-Control-Allow-Credentials', allowCredentials);
  res.headers.append('Access-Control-Allow-Origin', allowOrigin);
  res.headers.append('Access-Control-Allow-Methods', allowMethods);
  res.headers.append('Access-Control-Allow-Headers', allowHeaders);

  return res;
}

// specify the path regex to apply the middleware to
export const config = {
  matcher: '/api/:path*',
};
