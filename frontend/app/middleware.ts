import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Check if the route starts with /admin
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Skip middleware for login and registration routes
        if (request.nextUrl.pathname === '/admin/login' || 
            request.nextUrl.pathname === '/admin/register') {
            return NextResponse.next();
        }

        const token = request.cookies.get('milesforhope-admin-token');
        
        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
} 