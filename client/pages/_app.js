import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <>
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
    </>
  );
}

export default MyApp;
