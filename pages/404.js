import Link from "next/link";
import { TbError404 } from "react-icons/tb";

const NotFound = () => {
  return (
    <section className="hero is-large">
      <div className="hero-body columns is-centered has-text-centered">
        <div className="box is-danger p-6">
          <TbError404 className="icon has-text-danger is-large" />
          <h1 className="title is-5 mb-6">Page Not Found!</h1>
          <Link href="/" class="button is-danger">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};
export default NotFound;
