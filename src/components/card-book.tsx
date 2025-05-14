"use client";

import { useEffect, useState } from "react";
import { Book } from "@/types/books";
import { Heart, HeartPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type IProps = {
  book: Book;
};

export const CardBook = (props: IProps) => {
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const existingFavourites: string[] = JSON.parse(localStorage.getItem("favourites") || "[]");
    setIsFavourite(existingFavourites.includes(props.book.id));
  }, [props.book.id]);

  const addToFavourites = (id: string) => {
    const existingFavourites: string[] = JSON.parse(localStorage.getItem("favourites") || "[]");

    let updatedFavourites;

    if (existingFavourites.includes(id)) {
      updatedFavourites = existingFavourites.filter(favId => favId !== id);
      setIsFavourite(false);
    } else {
      updatedFavourites = [...existingFavourites, id];
      setIsFavourite(true);
    }

    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <Link href={`/book/${props.book.id}`}>
          <Image
            src={
              props.book.volumeInfo.imageLinks?.thumbnail || "/placeholder.svg"
            }
            alt={"title"}
            width={300}
            height={300}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform hover:scale-105 w-100 h-[300px] rounded-t-lg"
          />
        </Link>

        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            {props.book.volumeInfo.title}
          </div>
          <p className="text-gray-700 text-base line-clamp-3">
            {props.book.volumeInfo.description || "No description available."}
          </p>
        </div>

        <div className="px-6 pt-4 pb-2">
          {isFavourite ? (
            <Heart
              onClick={() => addToFavourites(props.book.id)}
              className="cursor-pointer text-red-500"
              fill="currentColor"
            />
          ) : (
            <HeartPlus
              onClick={() => addToFavourites(props.book.id)}
              className="cursor-pointer hover:text-red-500"
            />
          )}
        </div>
      </div>
    </>
  );
};
