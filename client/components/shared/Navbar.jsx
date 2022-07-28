import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { BsSearch } from "react-icons/bs";
import PopupContext from "../contexts/PopupContext";
import ActorPopupContext from "../contexts/ActorPopupContext";
import CompanyPopupContext from "../contexts/CompanyPopupContext";
import DirectorPopupContext from "../contexts/DirectorPopupContext";
import QuotesPopupContext from "../contexts/QuotesPopupContext";

import Image from "next/image";

function Navbar() {
  const { showPopup, setShowPopup } = useContext(PopupContext);
  const { showActorPopup, setShowActorPopup } = useContext(ActorPopupContext);
  const { showDirectorPopup, setShowDirectorPopup } =
    useContext(DirectorPopupContext);
  const { showCompanyPopup, setShowCompanyPopup } =
    useContext(CompanyPopupContext);
  const { showQuotesPopup, setShowQuotesPopup } =
    useContext(QuotesPopupContext);
  const { route } = useRouter();
  return (
    <div className="max-w-[1200px] mx-auto space-y-5 sm:space-y-0">
      {/* Top navbar */}
      <div className="flex flex-col items-center space-y-5 md:flex-row md:space-x-5 md:space-y-0 justify-center">
        <div className="flex-1">
          <div className="w-[150px] cursor-pointer">
            <Link passHref href="/">
              <Image
                src="/logo.png"
                width={1638}
                height={408}
                layout="responsive"
              />
            </Link>
          </div>
        </div>

        <ul className="flex items-center justify-center flex-wrap space-x-5">
          <li>
            <Link href="/actors">Actors</Link>
          </li>
          <li>
            <Link href="/directors">Directors</Link>
          </li>
          <li>
            <Link href="/companies">Companies</Link>
          </li>
          <li>
            <Link href="/quotes">Quotes</Link>
          </li>
        </ul>
        {route === "/" && (
          <button
            onClick={() => {
              setShowPopup(true);
            }}
            className="bg-custom-yellow px-4 py-2 rounded-sm text-custom-dark font-bold"
          >
            Add Movie
          </button>
        )}
        {route === "/actors" && (
          <button
            onClick={() => {
              setShowActorPopup(true);
            }}
            className="bg-custom-yellow px-4 py-2 rounded-sm text-custom-dark font-bold"
          >
            Add Actor
          </button>
        )}
        {route === "/directors" && (
          <button
            onClick={() => {
              setShowDirectorPopup(true);
            }}
            className="bg-custom-yellow px-4 py-2 rounded-sm text-custom-dark font-bold"
          >
            Add Director
          </button>
        )}
        {route === "/companies" && (
          <button
            onClick={() => {
              setShowCompanyPopup(true);
            }}
            className="bg-custom-yellow px-4 py-2 rounded-sm text-custom-dark font-bold"
          >
            Add Company
          </button>
        )}
        {route === "/quotes" && (
          <button
            onClick={() => {
              setShowQuotesPopup(true);
            }}
            className="bg-custom-yellow px-4 py-2 rounded-sm text-custom-dark font-bold"
          >
            Add Quotes
          </button>
        )}
      </div>

      {/* Searching movie */}
      {/* {route === "/" && (
        <div className="flex items-center justify-center translate-y-0 sm:translate-y-[100%]">
          <div className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-2 w-full sm:justify-center">
            <input
              className="p-3 rounded-sm outline-none text-custom-dark sm:w-[400px]"
              placeholder="Enter Keyboards"
            ></input>
            <button className="bg-custom-yellow text-custom-dark px-6 rounded-sm flex items-center justify-center p-3">
              <BsSearch />
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default Navbar;
