import { useContext, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import * as Yup from "yup";
import Select from "react-select";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import QuotesPopupContext from "../contexts/QuotesPopupContext";
import slugify from "slugify";

/**
 * Validation Schema added.
 */
const requiredSchema = Yup.object({
  role_played: Yup.string().required(),
  quote: Yup.string().required(),
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

function UpdateQuotesPopup({ singleQuote, handleShowUpdatePopup }) {
  const quoteSlug = slugify(singleQuote.role_played);
  const { showQuotesPopup, setShowQuotesPopup } =
    useContext(QuotesPopupContext);
  const router = useRouter();
  const [allRoles, setAllRoles] = useState([]);
  const roleOptions = allRoles.map((singleRole) => {
    return {
      value: singleRole.role_played,
      label: singleRole.role_played,
    };
  });
  useEffect(() => {
    const fetchRoles = async () => {
      const response = await axios.get("http://localhost:3001/casts");
      setAllRoles(response.data);
    };
    fetchRoles();
  }, []);

  return (
    <>
      <ToastContainer autoClose={3000} />
      <div className="overflow-y-auto rounded-md border-yellow-500 border-[1px] bg-gray-900 text-gray-100 w-[318px] sm:w-[400px] md:w-[500px] p-7">
        <div className="space-y-5">
          {/* All about the form to add the movie */}
          <Formik
            initialValues={{
              role_played: singleQuote.role_played,
              quote: singleQuote.quote,
            }}
            validationSchema={requiredSchema}
            onSubmit={async (values) => {
              try {
                const response = await axios.put(
                  `http://localhost:3001/quotes/${quoteSlug}`,
                  values
                );
                toast.success("Quotes updated successfully!", {
                  onClose: setTimeout(() => {
                    router.reload("/quotes");
                  }, 3500),
                });
              } catch {
                toast.error("Failed to add quote.");
              }
            }}
          >
            {({ values, isSubmitting, setFieldValue }) => {
              return (
                <Form className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="">Role Played</label>
                      <Select
                        options={roleOptions}
                        onChange={(selectedOption) => {
                          setFieldValue("role_played", selectedOption.value);
                        }}
                        styles={customStyles}
                        isDisabled
                      />
                    </div>
                    <ErrorMessage
                      name="company_name"
                      component="p"
                      className="text-red-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="">Quote</label>
                    <Field
                      as="textarea"
                      name="quote"
                      className="w-full px-3 py-2 border-none bg-gray-800 outline-none min-h-[120px] resize-none"
                    ></Field>
                    <ErrorMessage
                      name="quote"
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
                        handleShowUpdatePopup();
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

export default UpdateQuotesPopup;
