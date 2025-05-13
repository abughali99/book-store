export interface Book {
  id: string
  volumeInfo: {
    title: string
    subtitle?: string
    authors?: string[]
    publisher?: string
    publishedDate?: string
    description?: string
    pageCount?: number
    categories?: string[]
    imageLinks?: {
      smallThumbnail?: string
      thumbnail?: string
    }
    language?: string
    previewLink?: string
    infoLink?: string
  }
}

export interface GoogleBooksResponse {
  kind: string
  totalItems: number
  items?: Book[]
}
