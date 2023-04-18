import Link from "next/link";
import { BsFillBagCheckFill } from "react-icons/bs";

const Success = () => {
  return (
    <section className="hero is-large">
      <div className="hero-body columns is-centered has-text-centered">
        <div className="box is-danger p-6">
          <BsFillBagCheckFill className="icon has-text-success is-medium mb-4" />
          <h1 className="title is-5">Thank you for your order!</h1>
          <h2 className="subtitle mb-5">Check your email for the receipt.</h2>
          <Link href="/" className="button is-danger">
            Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Success;
