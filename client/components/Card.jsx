import React from "react";
import Link from "next/link";
import slugify from "slugify";

function Card({ singleData }) {
  const {
    movie_name = "Untitled Movie",
    length = "Untitled Length",
    year_of_release = "Untitled Year",
    plot_outline = "Untitled Plot Outline",
    company_name = "Untitled Company Name",
    genre = "Untitled Genre",
  } = singleData;
  const slug = slugify(singleData.movie_name, {
    // remove: ":",
    // lower: true,
  });

  return (
    <>
      <div className="space-y-2 pb-5">
        <div className="h-[300px] rounded-md"></div>
        <Link href={`http://localhost:3000/movies/${slug}`}>
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
