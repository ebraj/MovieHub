import { useContext, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import * as Yup from "yup";
import Select from "react-select";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

/**
 * Validation Schema added.
 */
const requiredSchema = Yup.object({
  movie_name: Yup.string().required(),
  length: Yup.string().required(),
  year_of_release: Yup.number().required(),
  plot_outline: Yup.string().required(),
  company_name: Yup.string().required(),
  genres: Yup.string().required(),
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

function UpdateMoviePopup({ handleEditMovieCancel, singleMovie }) {
  const [allCompanies, setAllCompanies] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const router = useRouter();
  const {
    query: { slug },
  } = useRouter();

  const companyOptions = allCompanies.map((singleCompany) => {
    return {
      value: singleCompany.company_name,
      label: singleCompany.company_name,
    };
  });

  const genresOptions = allGenres.map((singleGenre) => {
    return {
      value: singleGenre.genre,
      label: singleGenre.genre,
    };
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await axios.get("http://localhost:3001/companies");
      setAllCompanies(response.data);
    };
    const fetchGenres = async () => {
      const response = await axios.get("http://localhost:3001/genres");
      setAllGenres(response.data);
    };
    fetchCompanies();
    fetchGenres();
  }, []);
  return (
    <>
      <ToastContainer autoClose={3000} />
      <div className="overflow-y-auto rounded-md border-yellow-500 border-[1px] bg-gray-900 text-gray-100 w-[318px] sm:w-[400px] md:w-[500px] p-7">
        <div className="space-y-5">
          {/* All about the form to add the movie */}
          <Formik
            initialValues={singleMovie}
            validationSchema={requiredSchema}
            onSubmit={async (values) => {
              try {
                const response = await axios.put(
                  `http://localhost:3001/movies/${slug}`,
                  values
                );
                toast.success("Movie added successfully!", {
                  onClose: setTimeout(() => {
                    router.reload(`/movie/${slug}`);
                  }, 3500),
                });
              } catch {
                toast.error("Failed to add movie.");
              }
            }}
          >
            {({ values, isSubmitting, setFieldValue }) => {
              return (
                <Form className="space-y-3">
                  <div className="space-y-2">
                    <label htmlFor="">Movie Name</label>
                    <Field
                      type="text"
                      name="movie_name"
                      autoComplete="off"
                      className="w-full px-3 py-2 border-none bg-gray-800 outline-none"
                      disabled
                    ></Field>
                    <ErrorMessage
                      name="movie_name"
                      component="p"
                      className="text-red-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="">Length of Movie</label>
                    <Field
                      type="text"
                      name="length"
                      autoComplete="off"
                      className="w-full px-3 py-2 border-none bg-gray-800 outline-none"
                    ></Field>
                    <ErrorMessage
                      name="length"
                      component="p"
                      className="text-red-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="">Year Of Release</label>
                    <Field
                      type="text"
                      name="year_of_release"
                      autoComplete="off"
                      className="w-full px-3 py-2 border-none bg-gray-800 outline-none"
                    ></Field>
                    <ErrorMessage
                      name="year_of_release"
                      component="p"
                      className="text-red-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="">Production Company</label>
                      <Select
                        options={companyOptions}
                        onChange={(selectedOption) => {
                          setFieldValue("company_name", selectedOption.value);
                        }}
                        styles={customStyles}
                      />
                    </div>
                    <ErrorMessage
                      name="company_name"
                      component="p"
                      className="text-red-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="space-y-2 flex flex-col">
                      <label htmlFor="">Genres</label>
                      <Select
                        options={genresOptions}
                        styles={customStyles}
                        onChange={(selectedOption) => {
                          setFieldValue("genres", selectedOption.value);
                        }}
                      />
                    </div>
                    <ErrorMessage
                      name="genres"
                      component="p"
                      className="text-red-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="">Plot Outline</label>
                    <Field
                      as="textarea"
                      name="plot_outline"
                      className="w-full px-3 py-2 border-none bg-gray-800 outline-none min-h-[120px] resize-none"
                    ></Field>
                    <ErrorMessage
                      name="plot_outline"
                      component="p"
                      className="text-red-400"
                    />
                  </div>
                  <div className="text-gray-900 font-bold grid sm:grid-cols-2 gap-2">
                    <button
                      className="px-5 py-4 rounded-md bg-green-400 w-full"
                      type="submit"
                    >
                      Update
                    </button>
                    <button
                      className="px-5 py-4 rounded-md bg-orange-400 w-full"
                      onClick={() => {
                        handleEditMovieCancel();
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

export default UpdateMoviePopup;
