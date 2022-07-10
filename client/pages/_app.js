import "../styles/globals.css";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PopupContext from "../components/contexts/PopupContext";

function MyApp({ Component, pageProps }) {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <PopupContext.Provider value={{ showPopup, setShowPopup }}>
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
