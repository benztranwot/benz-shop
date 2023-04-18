import Head from "next/head";
import Card from "../components/Card";

export default function Home({ products }) {
  return (
    <main>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <meta name="description" content="An Online Shop developed by Benz" />
        <link rel="icon" href="/favicon.ico" />
        <title>Benz Shop</title>
      </Head>
      <header className="is-medium hero box" id="hero">
        <div className="hero-body">
          <p className="title is-2">Summer Sale</p>
          <p className="subtitle is-5">SHOP NOW</p>
        </div>
      </header>
      <section className="mb-5">
        <div className="columns is-centered is-multiline">
          {products.map((product, index) => (
            <div className="column is-half is-one-quarter-fullhd" key={index}>
              <Card product={product} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export const getServerSideProps = async () => {
  const spaceId = process.env.SPACE_ID;
  const accessToken = process.env.ACCESS_TOKEN;
  const query = `
  {
    productCollection(limit: 20) {
      items {
        sys {
          id
        }
        name
        price
        imageCollection(limit: 1) {
          items {
            url(transform: {format: WEBP})
          }
        }
      }
    }
  }
  `;

  const response = await fetch(`https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/master`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: accessToken,
    },
    body: JSON.stringify({
      query,
    }),
  });

  const result = await response.json();
  const products = result.data.productCollection.items;

  return {
    props: {
      products,
    },
  };
};
