export type RoutesObject = {
  [key: string]: RouteObject
}

export type RouteObject = {
  path: string
  protected?: boolean
  localizedPaths?: {
    [locale: string]: string
  }
  children?: {
    [key: string]: {
      path: string
      protected?: boolean
      default?: boolean
      localizedPaths?: {
        [locale: string]: string
      }
    }
  }
}

export const routes: RoutesObject = {
  home: {
    path: '/',
  },
  property: {
    path: '/property',
  },
  host: {
    path: '/host',
    protected: true,
    children: {
      hostProperties: {
        path: '/properties',
        protected: true,
        default: true,
      },
      hostBookings: {
        path: '/bookings',
        protected: true,
      },
      structure: {
        path: '/:propertyId/structure',
        protected: true,
      },
      floorPlan: {
        path: '/:propertyId/floor-plan',
        protected: true,
      },
      location: {
        path: '/:propertyId/location',
        protected: true,
      },
      privacyType: {
        path: '/:propertyId/privacy-type',
        protected: true,
      },
    },
  },
  guest: {
    path: '/guest',
    protected: true,
    children: {
      guestBookings: {
        path: '/bookings',
        protected: true,
        default: true,
      },
      guestFavorites: {
        path: '/favorites',
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
  admin: {
    path: '/admin',
    protected: true,
    children: {
      users: {
        path: '/users',
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
