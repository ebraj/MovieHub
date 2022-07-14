import "../styles/globals.css";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PopupContext from "../components/contexts/PopupContext";
import AddMoviePopup from "../components/AddMoviePopup";

function MyApp({ Component, pageProps }) {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <PopupContext.Provider value={{ showPopup, setShowPopup }}>
      {showPopup && (
        <div className="fixed w-[100%] top-0 right-0 left-0 bottom-0 overflow-y-auto bg-gray-700 min-h-screen grid place-content-center custom-bg">
          <AddMoviePopup />
        </div>
      )}
      <div className="flex flex-col min-h-[100vh]">
        <div className="bg-custom-blue px-5 py-6">
          <Navbar />
        </div>
        <div className="px-5 py-6 sm:py-14 flex-1">
          <Component {...pageProps} />
        </div>
        <div className="bg-custom-blue px-5 py-6">
          <Footer />
        </div>
      </div>
    </PopupContext.Provider>
  );
}

export default MyApp;
