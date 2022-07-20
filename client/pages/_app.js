import "../styles/globals.css";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import PopupContext from "../components/contexts/PopupContext";
import ActorPopupContext from "../components/contexts/ActorPopupContext";
import CompanyPopupContext from "../components/contexts/CompanyPopupContext";
import DirectorPopupContext from "../components/contexts/DirectorPopupContext";

import AddMoviePopup from "../components/AddMoviePopup";
import AddActorPopup from "../components/actors/AddActorPopup";
import AddCompanyPopup from "../components/companies/AddCompanyPopup";
import AddDirectorPopup from "../components/directors/AddDirectorPopup";

function MyApp({ Component, pageProps }) {
  const [showPopup, setShowPopup] = useState(false);
  const [showActorPopup, setShowActorPopup] = useState(false);
  const [showCompanyPopup, setShowCompanyPopup] = useState(false);
  const [showDirectorPopup, setShowDirectorPopup] = useState(false);
  return (
    <PopupContext.Provider value={{ showPopup, setShowPopup }}>
      <ActorPopupContext.Provider value={{ showActorPopup, setShowActorPopup }}>
        <CompanyPopupContext.Provider
          value={{ showCompanyPopup, setShowCompanyPopup }}
        >
          <DirectorPopupContext.Provider
            value={{ showDirectorPopup, setShowDirectorPopup }}
          >
            {showPopup && (
              <div className="fixed w-[100%] top-0 right-0 left-0 bottom-0 overflow-y-auto bg-gray-700 min-h-screen grid place-content-center custom-bg">
                <AddMoviePopup />
              </div>
            )}
            {showActorPopup && (
              <div className="fixed w-[100%] top-0 right-0 left-0 bottom-0 overflow-y-auto bg-gray-700 min-h-screen grid place-content-center custom-bg">
                <AddActorPopup />
              </div>
            )}

            {showCompanyPopup && (
              <div className="fixed w-[100%] top-0 right-0 left-0 bottom-0 overflow-y-auto bg-gray-700 min-h-screen grid place-content-center custom-bg">
                <AddCompanyPopup />
              </div>
            )}
            {showDirectorPopup && (
              <div className="fixed w-[100%] top-0 right-0 left-0 bottom-0 overflow-y-auto bg-gray-700 min-h-screen grid place-content-center custom-bg">
                <AddDirectorPopup />
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
          </DirectorPopupContext.Provider>
        </CompanyPopupContext.Provider>
      </ActorPopupContext.Provider>
    </PopupContext.Provider>
  );
}

export default MyApp;
