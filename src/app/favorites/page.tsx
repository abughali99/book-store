'use client';

import { Suspense, useEffect, useState } from 'react';
import { useBooks } from '@/hooks/api';
import { CardBook } from '@/components/card-book';
import { Loading } from '@/components/loading';

const FavouritePage = () => {
  const [favouriteIds, setFavouriteIds] = useState<string[]>([]);
  const books = useBooks();

  useEffect(() => {
    const storedIds: string[] = JSON.parse(localStorage.getItem('favourites') || '[]');
    setFavouriteIds(storedIds);
  }, []);

  if (books.isLoading) {
    return <Loading />;
  }

  const favouriteBooks = books?.data?.filter(i => favouriteIds?.includes(i.id));

  return (
    <Suspense fallback={<Loading />}>
      <div className="p-6">
        <section className="max-w-7xl mx-auto bg-white py-8">
          <h2 className="text-2xl font-bold mb-6">Favourite Books</h2>
          <div className="flex flex-wrap gap-6">
            {favouriteBooks?.length ? (
              favouriteBooks.map((book) => (
                <div key={book.id} className="max-w-1/3">
                  <CardBook book={book} />
                </div>
              ))
            ) : (
              <p className="text-gray-600">No favourite books found.</p>
            )}
          </div>
        </section>
      </div>
    </Suspense>
  );
};

export default FavouritePage;
