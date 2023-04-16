import "bulma/css/bulma.css";
import "../styles/globals.css";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { StateContext } from "../context/StateContext";
import Cart from "../components/Cart";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <meta name="description" content="An Online Shop developed by Benz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StateContext>
        <div className="container px-4">
          <Toaster />
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </div>
        <Cart />
      </StateContext>
    </>
  );
}

export default MyApp;
