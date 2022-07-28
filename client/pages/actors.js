import axios from "axios";
import React from "react";
import slugify from "slugify";
import { ToastContainer } from "react-toastify";
import ActorCard from "../components/actors/ActorsCard";

function Actors({ actorDatas }) {
  return (
    <>
      <div className="max-w-[1200px] mx-auto space-y-5">
        <ToastContainer autoClose={3000} />
        <h2 className="text-3xl md:text-4xl font-black">Actors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {actorDatas.map((singleActor) => {
            return (
              <ActorCard
                key={slugify(singleActor.actor_name)}
                singleActor={singleActor}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (contexts) => {
  const { data } = await axios.get("http://localhost:3001/actors");
  return {
    props: {
      actorDatas: data,
    },
  };
};
export default Actors;
