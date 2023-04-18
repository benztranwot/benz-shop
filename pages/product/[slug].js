import Head from "next/head";
import { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus, AiFillStar, AiOutlineStar } from "react-icons/ai";
import Card from "../../components/Card";
import { useStateContext } from "../../context/StateContext";

const Product = ({ product, products }) => {
  const { addToCart } = useStateContext();

  const images = product.imageCollection.items;
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => {
      if (prev === 1) return 1;
      return prev - 1;
    });
  };

  return (
    <main>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <meta name="description" content="An Online Shop developed by Benz" />
        <link rel="icon" href="/favicon.ico" />
        <title>{product.name} - Benz Shop</title>
      </Head>
      <section className="section">
        <div className="columns is-centered is-variable is-6">
          <div className="column is-6 is-5-widescreen">
            <figure className="image is-1by1 box">
              <img src={images[imageIndex].url} alt={product.name} />
            </figure>
            <div className="columns">
              {images.map((item, i) => (
                <div className="column is-3" key={i}>
                  <figure className="image is-5by4 box is-clickable" onMouseEnter={() => setImageIndex(i)}>
                    <img src={item.url} alt={product.name} />
                  </figure>
                </div>
              ))}
            </div>
          </div>
          <div className="column is-6 is-5-widescreen">
            <div className="block">
              <h1 className="title is-3 mb-5">{product.name}</h1>
              <h2 className="subtitle mb-3 is-5">{product.categoryCollection.items[0].name}</h2>
              <div className="field is-grouped has-text-danger">
                <div className="control">
                  <AiFillStar className="icon" />
                  <AiFillStar className="icon" />
                  <AiFillStar className="icon" />
                  <AiFillStar className="icon" />
                  <AiOutlineStar className="icon" />
                </div>
                <div className="control is-size-6">(162)</div>
              </div>
            </div>
            <hr />
            <div className="block">
              <h3 className="title is-4 mb-2">Details</h3>
              <p>{product.description.json.content[0].content[0].value}</p>
            </div>
            <hr />
            <div className="block">
              <h3 className="title is-3 mb-2 has-text-danger mb-5">${product.price}</h3>
              <div className="field is-grouped">
                <p className="control buttons has-addons">
                  <button className="button" onClick={decreaseQuantity}>
                    <AiOutlineMinus />
                  </button>
                  <button className="button">{quantity}</button>
                  <button className="button" onClick={increaseQuantity}>
                    <AiOutlinePlus />
                  </button>
                </p>
                <p className="control">
                  <button className="button is-danger" onClick={() => addToCart(product, quantity)}>
                    Add to Cart
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <h1 className="title has-text-centered is-2 mb-6">You may also like</h1>
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
};
export default Product;

export const getServerSideProps = async ({ params: { slug } }) => {
  const spaceId = process.env.SPACE_ID;
  const accessToken = process.env.ACCESS_TOKEN;
  const query = `
  {
    product(id: "${slug}") {
      name
      price
      description {
        json
      }
      categoryCollection {
        items {
          name
        }
      }
      imageCollection(limit: 4) {
        items {
          url
        }
      }
    }
    productCollection(limit: 20, where: {sys: {id_not: "${slug}"}}) {
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
  const product = result.data.product;
  const products = result.data.productCollection.items;

  return {
    props: {
      product,
      products,
    },
  };
};
