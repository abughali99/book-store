"use client"

import { useBooks } from "@/hooks/api";
import { Loading } from "../loading";
import { CardBook } from "../card-book";

export const Search = ({id}: {id: string;}) => {
    const books = useBooks(id);
    
      if (books.isLoading) {
        return <Loading />;
      }

    return (
        <section className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
      <h1 className="text-2xl font-semibold mb-4">
        Search Results for "{id}"
      </h1>

      {books?.data?.length === 0 ? (
        <p className="text-muted-foreground">No books found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.data?.map((i) => (
            <CardBook key={i.id} book={i} />
          ))}
        </div>
      )}
    </section>
    )
}