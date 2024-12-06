import { auth } from 'server/auth';

export default auth((req) => {
    if (
        !req.auth &&
        // allow signup
        req.nextUrl.pathname !== '/signup' &&
        // allow signin
        req.nextUrl.pathname !== '/signin' &&
        // allow images
        !['.jpg', '.png', '.svg'].some((ext) => req.nextUrl.pathname.endsWith(ext))
    ) {
        const newUrl = new URL('/signin', req.nextUrl.origin);
        return Response.redirect(newUrl);
    }
});

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
