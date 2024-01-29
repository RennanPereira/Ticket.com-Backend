declare module 'knex/types/tables' {
  export interface tables {
    movies: {
      id: string
      movieName: string
      rating: string
      parentalRating: string
      length: string
      cinemaName: string
      language: string
      type: string
      city: string
    }

    regions: {
      id: string
      estate: string
      city: string
    }

    cinemas: {
      id: string
      cinemaName: string
      address: string
      estate: string
      city: string
    }
  }
}
