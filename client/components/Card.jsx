import React from "react";

function Card({ singleData }) {
  return (
    <>
      <div key={singleData.movie_name} className="space-y-2 pb-5">
        <div className="h-[300px] rounded-md"></div>
        <h2>{singleData.movie_name}</h2>
        <div className="flex items-center space-x-4 text-gray-400">
          <p>{singleData.year_of_release}</p>
          <p>{singleData.length}</p>
        </div>
      </div>
    </>
  );
}

export default Card;
