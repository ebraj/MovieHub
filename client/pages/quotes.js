import axios from "axios";
import React, { useEffect, useState } from "react";
import slugify from "slugify";
import { ToastContainer } from "react-toastify";
import QuotesCard from "../components/quotes/QuotesCard";

function Quotes({ quotesDatas }) {
  return (
    <div className="max-w-[1200px] mx-auto space-y-5">
      <ToastContainer autoClose={3000} />
      <h2 className="text-3xl md:text-4xl font-black">Quotes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {quotesDatas.map((singleQuote) => {
          return (
            <QuotesCard
              key={slugify(singleQuote.role_played)}
              singleQuote={singleQuote}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Quotes;

export const getServerSideProps = async (contexts) => {
  const { data } = await axios.get("http://localhost:3001/quotes");
  return {
    props: {
      quotesDatas: data,
    },
  };
};
