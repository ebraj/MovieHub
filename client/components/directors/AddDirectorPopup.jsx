import { useContext, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import * as Yup from "yup";
import Select from "react-select";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import DirectorPopupContext from "../contexts/DirectorPopupContext";

/**
 * Validation Schema added.
 */
const requiredSchema = Yup.object({
  director_name: Yup.string().required(),
  director_DOB: Yup.string().required(),
  movie_name: Yup.string().required(),
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

function AddDirectorPopup() {
  const [allMovies, setAllMovies] = useState([]);
  const { showDirectorPopup, setShowDirectorPopup } =
    useContext(DirectorPopupContext);
  const router = useRouter();

  const moviesOptions = allMovies.map((singleMovie) => {
    return {
      value: singleMovie.movie_name,
      label: singleMovie.movie_name,
    };
  });

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get("http://localhost:3001/movies");
      setAllMovies(response.data);
    };
    fetchMovies();
  }, []);
  return (
    <>
      <ToastContainer autoClose={3000} />
      <div className="overflow-y-auto rounded-md border-yellow-500 border-[1px] bg-gray-900 text-gray-100 w-[318px] sm:w-[400px] md:w-[500px] p-7">
        <div className="space-y-5">
          {/* All about the form to add the movie */}
          <Formik
            initialValues={{
              director_name: "",
              director_DOB: "",
              movie_name: "",
              isActor: false,
              role: "",
            }}
            validationSchema={requiredSchema}
            onSubmit={async (values) => {
              try {
                const response = await axios.post(
                  "http://localhost:3001/directors",
                  values
                );
                toast.success("Director added successfully!", {
                  onClose: setTimeout(() => {
                    router.reload("/directors");
                  }, 3500),
                });
              } catch {
                toast.error("Failed to add director.");
              }
            }}
          >
            {({ values, isSubmitting, setFieldValue }) => {
              return (
                <Form className="space-y-3">
                  <div className="space-y-2">
                    <label htmlFor="">Director Name</label>
                    <Field
                      type="text"
                      name="director_name"
                      autoComplete="off"
                      className="w-full px-3 py-2 border-none bg-gray-800 outline-none"
                    ></Field>
                    <ErrorMessage
                      name="director_name"
                      component="p"
                      className="text-red-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="">Director DOB</label>
                    <Field
                      type="text"
                      name="director_DOB"
                      autoComplete="off"
                      className="w-full px-3 py-2 border-none bg-gray-800 outline-none"
                    ></Field>
                    <ErrorMessage
                      name="director_DOB"
                      component="p"
                      className="text-red-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="space-y-2 flex flex-col">
                      <label htmlFor="">Movies Directed</label>
                      <Select
                        options={moviesOptions}
                        styles={customStyles}
                        onChange={(selectedOption) => {
                          setFieldValue("movie_name", selectedOption.value);
                        }}
                      />
                    </div>
                    <ErrorMessage
                      name="movie_name"
                      component="p"
                      className="text-red-400"
                    />
                  </div>

                  <div className="space-y-2 flex items-center justify-between">
                    <label htmlFor="">Is director an actor?</label>
                    <Field
                      type="checkbox"
                      name="isActor"
                      label="Is actor"
                      className="h-5 w-5"
                    ></Field>
                  </div>

                  {values.isActor && (
                    <div className="space-y-2">
                      <label htmlFor="">Role</label>
                      <Field
                        type="text"
                        name="role"
                        autoComplete="off"
                        className="w-full px-3 py-2 border-none bg-gray-800 outline-none"
                      ></Field>
                      <ErrorMessage
                        name="role"
                        component="p"
                        className="text-red-400"
                      />
                    </div>
                  )}
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
                        setShowDirectorPopup(false);
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

export default AddDirectorPopup;
