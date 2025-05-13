import { CardBook } from "@/components/card-book";
import { Loading } from "@/components/loading";
import { Search } from "@/components/search";
import { useBooks } from "@/hooks/api";
import { Suspense } from "react";

interface SearchPageProps {
  searchParams: { q: string };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const id = await searchParams.q;

  if (!id) {
    return (
      <Loading />
    );
  }
  return (
    <Suspense fallback={<Loading />}>
      <Search id={id} />
    </Suspense>
  );
}
