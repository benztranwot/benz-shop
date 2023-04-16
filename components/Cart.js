import { useStateContext } from "../context/StateContext";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from "react-icons/ai";
import getStripe from "../lib/getStripe";

const Cart = () => {
  const {
    cartItems,
    totalPrice,
    showCart,
    setShowCart,
    removeFromCart,
    increaseProductQuantity,
    decreaseProductQuantity,
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className={showCart ? "modal is-active" : "modal"}>
      <div className="modal-background" onClick={() => setShowCart(false)}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Your Cart</p>
          <button className="delete" aria-label="close" onClick={() => setShowCart(false)}></button>
        </header>
        <section className="modal-card-body">
          {cartItems.map((item, i) => (
            <div className="columns is-mobile block" key={i}>
              <div className="column is-one-quarter">
                <figure className="image is-5by4 box">
                  <img src={item.imageCollection.items[0].url} alt={item.name} />
                </figure>
              </div>
              <div className="column is-three-quarters">
                <div className="level mb-5">
                  <div className="level-left">
                    <div className="level-item is-size-4 has-text-weight-semibold">{item.name}</div>
                  </div>
                  <div className="level-right">
                    <div className="level-item is-size-4">${item.price}</div>
                  </div>
                </div>
                <div className="level">
                  <div className="level-left">
                    <div className="level-item is-size-4 has-text-weight-semibold">
                      <p className="control buttons has-addons">
                        <button className="button" onClick={() => decreaseProductQuantity(item)}>
                          <AiOutlineMinus />
                        </button>
                        <button className="button">{item.quantity}</button>
                        <button className="button" onClick={() => increaseProductQuantity(item)}>
                          <AiOutlinePlus />
                        </button>
                      </p>
                    </div>
                  </div>
                  <div className="level-right">
                    <div className="level-item is-size-4">
                      <button className="button is-danger" onClick={() => removeFromCart(item)}>
                        <AiOutlineDelete className="icon" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="level">
            <div className="level-left">
              <div className="level-item is-size-4 has-text-weight-semibold">Subtotal</div>
            </div>
            <div className="level-right">
              <div className="level-item is-size-4 has-text-weight-semibold">${totalPrice}</div>
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-danger mx-auto" onClick={handleCheckout}>
            Pay with Stripe
          </button>
        </footer>
      </div>
    </div>
  );
};
export default Cart;
