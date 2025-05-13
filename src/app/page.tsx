"use client";

import { CardBook } from "@/components/card-book";
import { Loading } from "@/components/loading";
import { useBooks } from "@/hooks/api";
import { Suspense } from "react";

export default function Home() {
  const books = useBooks("popular");

  if (books.isLoading) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <section className="max-w-7xl mx-auto py-5 my-5 px-4 sm:px-6">
        <h1 className="text-3xl font-bold">Popular Books</h1>
        <p className="text-muted-foreground">
          Discover trending books from various categories
        </p>
      </section>

      <section className="max-w-7xl mx-auto bg-white py-8 px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books?.data?.map((i) => (
          <div key={i.id}>
            <CardBook book={i} />
          </div>
        ))}
      </section>
Z    </Suspense>
  );
}