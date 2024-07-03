import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// https://nextjs.org/docs/app/building-your-application/routing/middleware

export function middleware(request: NextRequest) {
    const token = request.cookies.get('boilerplateNext_token');
    const email = request.cookies.get('user_email');

    // Apenas renderiza a página de login se o usuário não estiver autenticado.
    if (request.nextUrl.pathname.startsWith('/auth') && token) {
        return NextResponse.redirect(new URL('/app', request.url));
    }

    // Apenas renderiza a pagina principal se o usuário estiver autenticado.
    if (request.nextUrl.pathname.startsWith('/app') && !token) {
        return NextResponse.redirect(new URL('/auth', request.url));
    }

    // Apenas renderiza a pagina Welcome caso o usuario já tenha informado o email no signUp (gravado num cookie no AthContext).
    if (request.nextUrl.pathname.startsWith('/welcome') && !email) {
        return NextResponse.redirect(new URL('/auth', request.url));
    }
    // Apenas renderiza a pagina EmailVerify caso o usuario já tenha informado o email no signIn (gravado num cookie no AthContext).
    if (request.nextUrl.pathname.startsWith('/emailVerify') && !email) {
        return NextResponse.redirect(new URL('/auth', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/auth/:path*', '/app/:path*', '/welcome', '/emailVerify'],
};
