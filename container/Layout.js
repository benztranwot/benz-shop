import { Toaster } from "react-hot-toast";
import { StateContext } from "../context/StateContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cart from "../components/Cart";

const Layout = ({ children }) => {
  return (
    <StateContext>
      <Toaster />
      <div className="container px-4">
        <Navbar />
        {children}
        <Footer />
      </div>
      <Cart />
    </StateContext>
  );
};
export default Layout;
