export type RoutesObject = {
  [key: string]: RouteObject
}

export type RouteObject = {
  path: string
  protected?: boolean
  children?: {
    [key: string]: {
      path: string
      protected?: boolean
      default?: boolean
    }
  }
}

export const routes: RoutesObject = {
  home: {
    path: '/',
  },
  host: {
    path: '/host',
    protected: true,
    children: {
      myListings: {
        path: '/overview',
        protected: true,
        default: true,
      },
      myReservations: {
        path: '/reservations',
        protected: true,
      },
      structure: {
        path: '/:listingId/structure',
        protected: true,
      },
      floorPlan: {
        path: '/:listingId/floor-plan',
        protected: true,
      },
      location: {
        path: '/:listingId/location',
        protected: true,
      },
      privacyType: {
        path: '/:listingId/privacy-type',
        protected: true,
      },
    },
  },
  guest: {
    path: '/guest',
    protected: true,
    children: {
      overview: {
        path: '/overview',
        protected: true,
        default: true,
      },
      myFavorites: {
        path: '/favorites',
        protected: true,
      },
      myTrips: {
        path: '/trips',
        protected: true,
      },
    },
  },
  account: {
    path: '/account-settings',
    protected: true,
    children: {
      personalInfo: {
        path: '/personal-info',
        protected: true,
        default: true,
      },
    },
  },
  auth: {
    path: '/auth',
    children: {
      login: {
        path: '/login',
        default: true,
      },
      signUp: {
        path: '/sign-up',
      },
    },
  },
}
