// This config ensures the password only applies to the admin page.
// If you want to protect the display page too, change it to: matcher: '/(.*)'
export const config = {
  matcher: '/admin.html',
};

export default function middleware(req) {
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    
    // Decode the Base64 username:password string
    const [user, pwd] = atob(authValue).split(':');

    // CHANGE YOUR USERNAME AND PASSWORD HERE
    if (user === 'admin' && pwd === 'ecc4pass2026') {
      // Password is correct, load the HTML file normally
      return; 
    }
  }

  // If password is wrong or not provided, trigger the browser's login popup
  return new Response('Authentication Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Admin Area"',
    },
  });
}
