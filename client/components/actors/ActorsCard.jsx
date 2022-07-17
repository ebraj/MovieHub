import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import axios from "axios";
import slugify from "slugify";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function ActorCard({ singleActor }) {
  const router = useRouter();
  const actorSlug = slugify(singleActor.actor_name, {});
  const handleDeleteCompany = () => {
    try {
      axios.delete(`http://localhost:3001/actors/${actorSlug}`);
      toast.success("Company deleted successfully.", {
        onClose: setTimeout(() => {
          router.push("/actors");
        }, 3500),
      });
    } catch {}
  };
  return (
    <>
      <div className="grid grid-cols-2 gap-5 items-center">
        <div className="h-[300px] rounded-md bg-green-300"></div>
        <div className="space-y-5">
          <div>
            <p className="font-bold">{singleActor.actor_name}</p>
            <p className="text-gray-400">{singleActor.actor_DOB}</p>
            <p className="text-gray-400">{singleActor.movie_name}</p>
          </div>
          <div className="flex space-x-5">
            <FiEdit3 className="text-xl cursor-pointer" />
            <span onClick={handleDeleteCompany}>
              <RiDeleteBin6Line className="text-xl cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ActorCard;
