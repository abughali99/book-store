import { BookDetail } from "@/components/book-details"
import { Loading } from "@/components/loading";
import { useBookById } from "@/hooks/api"
import { Suspense } from "react"

export default async function BookPage({ params }: { params: { id: string } }) {
    return (
      <Suspense fallback={<Loading />}>
        <BookDetail id={params.id!}  />
      </Suspense>
    )
  } 

