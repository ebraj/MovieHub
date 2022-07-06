import React from "react";
import Link from "next/link";
import slugify from "slugify";

function Card({ singleData }) {
  const {
    movie_name = "Movie Name",
    year_of_release = "0000",
    length = "0h 0m",
  } = singleData;
  const slug = slugify(singleData.movie_name, {
    remove: ":",
    lower: true,
  });

  return (
    <>
      <div key={singleData.movie_name} className="space-y-2 pb-5">
        <div className="h-[300px] rounded-md"></div>
        <Link href={`movie/${slug}`}>
          <h2 className="cursor-pointer">{singleData.movie_name}</h2>
        </Link>
        <div className="flex items-center space-x-4 text-gray-400">
          <p>{singleData.year_of_release}</p>
          <p>{singleData.length}</p>
        </div>
      </div>
    </>
  );
}

export default Card;
