import { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PopupContext from "./contexts/PopupContext";
import axios from "axios";

function AddMoviePopup() {
  const { setShowPopup } = useContext(PopupContext);
  return (
    <div className="overflow-y-auto rounded-md border-yellow-500 border-[1px] bg-gray-900 text-gray-100 w-[318px] sm:w-[400px] md:w-[500px] p-7">
      <div className="space-y-5">
        {/* All about the form to add the movie */}
        <Formik
          initialValues={{
            movie_name: "",
            length: "",
            year_of_release: "",
            plot_outline: "",
            company_name: "",
            genres: "",
          }}
          onSubmit={async (values) => {
            console.log(values);
            try {
              const response = await axios.post(
                "http://localhost:3001",
                values
              );
            } catch {}
          }}
        >
          {({ values, isSubmitting }) => {
            return (
              <Form className="space-y-3">
                <div className="space-y-2">
                  <label htmlFor="">Movie Name</label>
                  <Field
                    type="text"
                    name="movie_name"
                    className="w-full px-5 py-3 border-none bg-gray-800 outline-none"
                  ></Field>
                </div>
                <div className="space-y-2">
                  <label htmlFor="">Length of Movie</label>
                  <Field
                    type="text"
                    name="length"
                    className="w-full px-5 py-3 border-none bg-gray-800 outline-none"
                  ></Field>
                </div>
                <div className="space-y-2">
                  <label htmlFor="">Year Of Release</label>
                  <Field
                    type="text"
                    name="year_of_release"
                    className="w-full px-5 py-3 border-none bg-gray-800 outline-none"
                  ></Field>
                </div>
                <div className="space-y-2">
                  <label htmlFor="">Plot Outline</label>
                  <Field
                    type="text"
                    name="plot_outline"
                    className="w-full px-5 py-3 border-none bg-gray-800 outline-none"
                  ></Field>
                </div>
                <div className="space-y-2">
                  <label htmlFor="">Production Company</label>
                  <Field
                    type="text"
                    name="company_name"
                    className="w-full px-5 py-3 border-none bg-gray-800 outline-none"
                  ></Field>
                </div>
                <div className="space-y-2">
                  <label htmlFor="">Genres</label>
                  <Field
                    type="text"
                    name="genres"
                    className="w-full px-5 py-3 border-none bg-gray-800 outline-none"
                  ></Field>
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
                      setShowPopup(false);
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
  );
}

export default AddMoviePopup;
