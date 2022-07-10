import React from "react";
import Card from "../../components/Card";
import MOVIES_DATAS from "../../datas/movies.json";

function Slug() {
  return (
    <>
      <div className="max-w-[1200px] mx-auto space-y-14">
        {/* Grid container`` */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr,2fr] md:grid-cols-[1fr,3fr] gap-10 items-center">
          <div className="w-full h-[400px] bg-green-300 rounded-md"></div>
          <div className="space-y-5">
            <h2 className="text-3xl md:text-4xl font-black">The Princess</h2>
            <p className="text-gray-400">
              A beautiful, strong-willed young royal refuses to wed the cruel
              sociopath to whom she is betrothed and is kidnapped and locked in
              a remote tower of her fathers castle. With her scorned, vindictive
              suitor intent on taking her fathers throne, the princess must
              protect her family and save the kingdom.
            </p>

            {/* Details */}
            <div className="space-y-2 grid grid-cols-1 md:grid-cols-2 md:gap-10">
              <div className="space-y-2">
                <p>
                  <span>Released:</span>
                  <span className="text-gray-400"> 2020</span>
                </p>
                <p>
                  <span>Duration:</span>
                  <span className="text-gray-400"> 2h 30m</span>
                </p>
                <p>
                  <span>Director:</span>
                  <span className="text-gray-400"> The Don</span>
                </p>
                <p>
                  <span>Casts:</span>
                  <span className="text-gray-400">
                    {" "}
                    Joey King, Ngô Thanh Vân, Dominic Cooper, Ivo Arakov, Olga
                    Kurylenko
                  </span>
                </p>
              </div>
              <div className="space-y-2">
                <p>
                  <span>Genre:</span>
                  <span className="text-gray-400"> Drama, Action, Fantasy</span>
                </p>
                <p>
                  <span>Production:</span>
                  <span className="text-gray-400"> 20th Century Studios</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-black">Related Movies</h2>
          {/* Grid Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 grid-container">
            {MOVIES_DATAS.map((singleData) => {
              return (
                <Card singleData={singleData} key={singleData.movie_name} />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Slug;
