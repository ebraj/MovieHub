import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import axios from "axios";
import slugify from "slugify";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import UpdateCompanyPopup from "./UpdateCompanyPopup";

function CompanyCard({ singleCompany }) {
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);

  const handleShowUpdatePopup = () => {
    setShowUpdatePopup(false);
  };
  const router = useRouter();
  const companySlug = slugify(singleCompany.company_name, {});
  const handleDeleteCompany = () => {
    try {
      axios.delete(`http://localhost:3001/companies/${companySlug}`);
      toast.success("Company deleted successfully.", {
        onClose: setTimeout(() => {
          router.push("/companies");
        }, 3500),
      });
    } catch {}
  };
  return (
    <>
      {showUpdatePopup && (
        <div className="fixed w-[100%] top-0 right-0 left-0 bottom-0 overflow-y-auto bg-gray-700 min-h-screen grid place-content-center custom-bg">
          <UpdateCompanyPopup
            handleShowUpdatePopup={handleShowUpdatePopup}
            singleCompany={singleCompany}
          />
        </div>
      )}
      <div className="grid grid-cols-2 gap-5 items-center">
        <div className="h-[300px] rounded-md bg-green-300"></div>
        <div className="space-y-5">
          <div>
            <p className="font-bold">{singleCompany.company_name}</p>
            <p className="text-gray-400">{singleCompany.address}</p>
          </div>
          <div className="flex space-x-5">
            <span
              onClick={() => {
                setShowUpdatePopup(true);
              }}
            >
              <FiEdit3 className="text-xl cursor-pointer" />
            </span>
            <span onClick={handleDeleteCompany}>
              <RiDeleteBin6Line className="text-xl cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompanyCard;
