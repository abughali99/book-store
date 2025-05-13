import { Book, GoogleBooksResponse } from "@/types/books"

const API_BASE_URL = "https://www.googleapis.com/books/v1/volumes"

export async function getBooks(query: string, maxResults = 20): Promise<Book[]> {
  const response = await fetch(
    `${API_BASE_URL}?q=${encodeURIComponent(query)}&maxResults=${maxResults}`,
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch books: ${response.statusText}`)
  }

  const data: GoogleBooksResponse = await response.json()

  if (!data.items) {
    return []
  }

  return data.items
}

export async function getBookById(id: string): Promise<Book | null> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
  })

  if (!response.ok) {
    if (response.status === 404) {
      return null
    }
    throw new Error(`Failed to fetch book: ${response.statusText}`)
  }

  const book: Book = await response.json()
  return book
}