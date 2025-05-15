type Route = {
  [key: string]: {
    path: string
    protected?: boolean
  }
}
export const routes: Route = {
  home: {
    path: '/',
  },
  host: {
    path: '/host',
    protected: true,
  },
  login: {
    path: '/auth/login',
  },
  signUp: {
    path: '/auth/sign-up',
  },
}
