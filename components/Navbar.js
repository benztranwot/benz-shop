import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  const { setShowCart, totalQuantity } = useStateContext();

  return (
    <nav className="level is-mobile box mt-4 py-2">
      <div className="level-left">
        <div className="level-item">
          <Link className="navbar-item has-text-weight-medium is-size-4 has-text-danger" href="/">
            Benz Shop
          </Link>
        </div>
      </div>
      <div className="level-right">
        <div className="level-item">
          <button className="button is-white has-text-danger icon-text pr-2" onClick={() => setShowCart(true)}>
            <AiOutlineShoppingCart className="icon" />
            <span>{totalQuantity}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
