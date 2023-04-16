import Link from "next/link";

const Card = ({ product }) => {
  const imageUrl = product.imageCollection.items[0].url;

  return (
    <Link href={`/product/${product.sys.id}`}>
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={imageUrl} alt={product.name} />
          </figure>
        </div>
        <div className="card-header is-shadowless">
          <p className="card-header-title is-size-6 has-text-weight-medium">{product.name}</p>
          <p className="card-header-icon is-size-5 has-text-weight-bold has-text-danger">${product.price}</p>
        </div>
      </div>
    </Link>
  );
};
export default Card;
