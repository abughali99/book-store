
import { getBookById, getBooks } from '@/api/books'
import { useQuery } from '@tanstack/react-query'

export function useBooks(query?: string, maxResults = 20) {
  return useQuery({
    queryKey: ['books', query, maxResults],
    queryFn: () => getBooks(query ?? "popular", maxResults),
  })
}

export function useBookById(id: string) {
  return useQuery({
    queryKey: ['book', id],
    queryFn: () => getBookById(id),
  })
}