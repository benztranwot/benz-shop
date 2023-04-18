import "bulma/css/bulma.css";
import "../styles/globals.css";
import Layout from "../container/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
