"use client"

import { Calendar, User, BookOpen, Info } from "lucide-react"
import type { Book } from "@/types/books"
import Image from "next/image"
import { useBookById } from "@/hooks/api"
import { Loading } from "./loading"

interface IProps {
  id: string
}

export function BookDetail({ id }: IProps) {
  const data =  useBookById(id);
const book = data?.data;

  if (!book) {
    return (
     <Loading />
    )
  }

  const volumeInfo = book.volumeInfo || {}
  const {
    title = "Untitled Book",
    subtitle,
    authors = [],
    publishedDate,
    pageCount,
    categories = [],
    description = "No description available",
    publisher,
    imageLinks = {},
  } = volumeInfo

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="grid gap-10 md:grid-cols-[280px_1fr] lg:gap-16">
        <div className="space-y-6">
          <div className="aspect-[2/3] relative overflow-hidden rounded-2xl shadow-md border border-indigo-100 bg-white">
            <Image
              src={imageLinks?.thumbnail || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 280px"
              priority
            />
          </div>

          {publisher && (
            <div className="md:hidden p-4 bg-indigo-50 rounded-xl border border-indigo-100">
              <h3 className="text-sm font-semibold text-[#121520]">Publisher</h3>
              <p className="text-slate-700">{publisher}</p>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-[#121520]">{title}</h1>
            {subtitle && <p className="text-lg text-indigo-600">{subtitle}</p>}

            <div className="flex flex-wrap gap-2 pt-4">
              {authors.map((author, index) => (
                <div
                  key={`${author}-${index}`}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-100 text-[#0ac5b2] text-sm"
                >
                  <User className="h-4 w-4" />
                  {author}
                </div>
              ))}

              {publishedDate && (
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-100 text-[#0ac5b2] text-sm">
                  <Calendar className="h-4 w-4" />
                  {publishedDate}
                </div>
              )}

              {pageCount && (
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-100 text-[#0ac5b2] text-sm">
                  <BookOpen className="h-4 w-4" />
                  {pageCount} pages
                </div>
              )}
            </div>
          </div>
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <div
                  key={`${category}-${index}`}
                  className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 text-sm"
                >
                  {category}
                </div>
              ))}
            </div>
          )}
          <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl shadow-sm p-6 border border-indigo-100">
            <div className="flex items-start gap-4">
              <Info className="h-6 w-6 text-[#121520] mt-1" />
              <div>
                <h3 className="font-semibold text-[#0ac5b2] text-lg">About this book</h3>
                <div className="mt-3 text-slate-800 prose prose-sm max-w-none">
                  <p>{description}</p>
                </div>
              </div>
            </div>
          </div>

          {publisher && (
            <div className="hidden md:block p-4 bg-indigo-50 rounded-xl border border-indigo-100">
              <h3 className="text-sm font-semibold text-[#0ac5b2]">Publisher</h3>
              <p className="text-slate-700">{publisher}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
