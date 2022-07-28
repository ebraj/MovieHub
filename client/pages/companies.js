import axios from "axios";
import React from "react";
import slugify from "slugify";
import CompanyCard from "../components/companies/CompanyCard";
import { ToastContainer } from "react-toastify";

function Companies({ companyDatas }) {
  return (
    <div className="max-w-[1200px] mx-auto space-y-5">
      <ToastContainer autoClose={3000} />
      <h2 className="text-3xl md:text-4xl font-black">Companies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {companyDatas.map((singleCompany) => {
          return (
            <CompanyCard
              key={slugify(singleCompany.company_name)}
              singleCompany={singleCompany}
            />
          );
        })}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const { data } = await axios.get("http://localhost:3001/companies");
  return {
    props: {
      companyDatas: data,
    },
  };
};
export default Companies;
