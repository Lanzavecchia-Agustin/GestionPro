import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// Define protected and auth paths
const protectedPaths = ['/dashboard', '/profile', '/settings']; // Paths that require authentication
const authPaths = ['/login', '/signup', '/verify-email']; // Paths accessible only when unauthenticated

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll().map((cookie) => ({
            name: cookie.name,
            value: cookie.value,
          }));
        },
        setAll(cookies: { name: string; value: string }[]) {
          cookies.forEach(({ name, value }) => {
            response.cookies.set(name, value);
          });
        },
      },
    }
  );

  // Retrieve user information
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const url = new URL(request.url);
  const next = url.searchParams.get('next');

  // If user is authenticated and tries to access an auth path, redirect them to the dashboard
  if (user?.id) {
    if (authPaths.includes(url.pathname)) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    // Allow access to protected routes if authenticated
    return response;
  } else {
    // If user is not authenticated and tries to access a protected path, redirect to login
    if (protectedPaths.includes(url.pathname)) {
      return NextResponse.redirect(
        new URL(`/login?next=${next || url.pathname}`, request.url)
      );
    }
    // Allow access to public routes
    return response;
  }
}
