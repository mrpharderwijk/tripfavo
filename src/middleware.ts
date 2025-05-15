import { stackMiddlewares } from '@/middlewares/stack-middlewares'
import { withAuth } from '@/middlewares/with-auth'
import { withHeaders } from '@/middlewares/with-headers'
import { withLocale } from '@/middlewares/with-locale'
import { withLogging } from '@/middlewares/with-logging'

const middlewares = [withLogging, withHeaders, withAuth, withLocale]

export default stackMiddlewares(middlewares)

export const config = {
  matcher: ['/((?!_next|favicon.ico|api|.*\\.).*)'],
}
