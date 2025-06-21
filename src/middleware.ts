import { stackMiddlewares } from '@/middlewares/stack-middlewares'
import { withAuth } from '@/middlewares/with-auth'
import { withHeaders } from '@/middlewares/with-headers'
import { withLogging } from '@/middlewares/with-logging'

const middlewares = [withLogging, withHeaders, withAuth]

export default stackMiddlewares(middlewares)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap|public/).*)',
  ],
}
