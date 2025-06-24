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
    localizedPaths: {
      en: '/property',
      nl: '/verhuur',
      fr: '/propriete',
    },
  },
  host: {
    path: '/host',
    protected: true,
    children: {
      hostListings: {
        path: '/listings',
        protected: true,
        default: true,
      },
      hostBookings: {
        path: '/bookings',
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
