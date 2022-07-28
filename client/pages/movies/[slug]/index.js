import axios from "axios";
import slugify from "slugify";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";

import UpdateMoviePopup from "../../../components/main/UpdateMoviePopup";
import Card from "../../../components/Card";

function Slug({ movieDatas }) {
  const router = useRouter();
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [singleMovie, setSingleMovie] = useState({});
  const {
    query: { slug },
  } = useRouter();

  const handleEditMovie = () => {
    setShowUpdatePopup(true);
  };
  const handleEditMovieCancel = () => {
    setShowUpdatePopup(false);
  };
  const handleDeleteMovie = () => {
    try {
      axios.delete(`http://localhost:3001/movies/${slug}`);
      toast.success("Movie deleted successfully.", {
        onClose: setTimeout(() => {
          router.push("/");
        }, 3500),
      });
    } catch {}
  };
  useEffect(() => {
    axios.get(`http://localhost:3001/movies/${slug}`).then((response) => {
      setSingleMovie(response.data[0]);
    });
  }, [slug]);

  return (
    <>
      {showUpdatePopup && (
        <div className="fixed w-[100%] top-0 right-0 left-0 bottom-0 overflow-y-auto bg-gray-700 min-h-screen grid place-content-center custom-bg">
          <UpdateMoviePopup
            handleEditMovieCancel={handleEditMovieCancel}
            singleMovie={singleMovie}
          />
        </div>
      )}
      <ToastContainer autoClose={3000} />
      {singleMovie && (
        <div className="max-w-[1200px] mx-auto space-y-14">
          {/* Grid container`` */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr,2fr] md:grid-cols-[1fr,3fr] gap-10 items-center">
            <div className="w-full h-[400px] bg-green-300 rounded-md"></div>
            <div className="space-y-5">
              <h2 className="text-3xl md:text-4xl font-black">
                {singleMovie.movie_name}
              </h2>
              <p className="text-gray-400">{singleMovie.plot_outline}</p>

              {/* Details */}
              <div className="space-y-2 grid grid-cols-1 md:grid-cols-2 md:gap-10">
                <div className="space-y-2">
                  <p>
                    <span>Released:</span>
                    <span className="text-gray-400">
                      {" "}
                      {singleMovie.year_of_release}
                    </span>
                  </p>
                  <p>
                    <span>Duration:</span>
                    <span className="text-gray-400"> {singleMovie.length}</span>
                  </p>
                  {singleMovie.director_name && (
                    <p>
                      <span>Director:</span>
                      <span className="text-gray-400">
                        {" "}
                        {singleMovie.director_name}
                      </span>
                    </p>
                  )}
                  {singleMovie.actors && (
                    <p>
                      <span>Actors: </span>
                      <span className="text-gray-400">
                        {singleMovie.actors}
                      </span>
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  {singleMovie.genres && (
                    <p>
                      <span>Genres: </span>
                      <span className="text-gray-400">
                        {" "}
                        {singleMovie.genres}
                      </span>
                    </p>
                  )}
                  <p>
                    <span>Production: </span>
                    <span className="text-gray-400">
                      {singleMovie.company_name}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-5">
                <span onClick={handleEditMovie}>
                  <FiEdit3 className="text-2xl cursor-pointer" />
                </span>
                <span onClick={handleDeleteMovie}>
                  <RiDeleteBin6Line className="text-2xl cursor-pointer" />
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-black">Related Movies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 grid-container">
              {movieDatas.slice(0, 5).map((singleData) => {
                return (
                  <Card singleData={singleData} key={singleData.movie_name} />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Slug;

export const getServerSideProps = async (context) => {
  const {
    query: { slug },
  } = context;
  const { data } = await axios.get("http://localhost:3001/");

  /*
   * Getting the moviesData other than the selected Movie
   */

  const upgradedArray = data.filter((singleData) => {
    if (slugify(singleData.movie_name) !== slug) {
      return singleData;
    }
  });

  return {
    props: {
      movieDatas: upgradedArray,
    },
  };
};
