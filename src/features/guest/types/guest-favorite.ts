export type GuestFavorite = {
  id: string
  createdAt: Date
  listing: {
    id: string
    title: string | null
    images: {
      url: string
      fileName: string
    }[]
    location: {
      city: string
      country: string
    } | null
  }
}