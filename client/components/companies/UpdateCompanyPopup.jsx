import { useContext, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import * as Yup from "yup";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import slugify from "slugify";

/**
 * Validation Schema added.
 */
const requiredSchema = Yup.object({
  company_name: Yup.string().required(),
  address: Yup.string().required(),
});

/**
 * Custom styling for the formik select.
 */
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: "#1F2937",
    backgroundColor: "#ffffff",
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: "#1F2937",
    color: "#F1F5F9",
    border: "none",
    outline: "none",
    padding: "2.5px",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "#ffffff",
  }),
};

function UpdateCompanyPopup({ singleCompany, handleShowUpdatePopup }) {
  const companySlug = slugify(singleCompany.company_name);
  const router = useRouter();

  return (
    <>
      <ToastContainer autoClose={3000} />
      <div className="overflow-y-auto rounded-md border-yellow-500 border-[1px] bg-gray-900 text-gray-100 w-[318px] sm:w-[400px] md:w-[500px] p-7">
        <div className="space-y-5">
          {/* All about the form to add the movie */}
          <Formik
            initialValues={{
              company_name: singleCompany.company_name,
              address: singleCompany.address,
            }}
            validationSchema={requiredSchema}
            onSubmit={async (values) => {
              try {
                const response = await axios.put(
                  `http://localhost:3001/companies/${companySlug}`,
                  values
                );
                toast.success("Company Updated successfully!", {
                  onClose: setTimeout(() => {
                    router.reload("/");
                  }, 3500),
                });
              } catch {
                toast.error("Failed to update movie.");
              }
            }}
          >
            {({ values, isSubmitting, setFieldValue }) => {
              return (
                <Form className="space-y-3">
                  <div className="space-y-2">
                    <label htmlFor="">Company Name</label>
                    <Field
                      type="text"
                      name="company_name"
                      autoComplete="off"
                      className="w-full px-3 py-2 border-none bg-gray-800 outline-none"
                      disabled
                    ></Field>
                    <ErrorMessage
                      name="company_name"
                      component="p"
                      className="text-red-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="">Company Address</label>
                    <Field
                      type="text"
                      name="address"
                      autoComplete="off"
                      className="w-full px-3 py-2 border-none bg-gray-800 outline-none"
                    ></Field>
                    <ErrorMessage
                      name="address"
                      component="p"
                      className="text-red-400"
                    />
                  </div>

                  <div className="text-gray-900 font-bold grid sm:grid-cols-2 gap-2">
                    <button
                      className="px-5 py-4 rounded-md bg-green-400 w-full"
                      type="submit"
                    >
                      Submit
                    </button>
                    <button
                      className="px-5 py-4 rounded-md bg-orange-400 w-full"
                      onClick={() => {
                        handleShowUpdatePopup(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default UpdateCompanyPopup;
