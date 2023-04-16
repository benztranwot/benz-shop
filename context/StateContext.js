import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState();

  useEffect(() => {
    updateProductsStat();
  }, [cartItems]);

  const updateProductsStat = () => {
    setTotalPrice(
      cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity, 0)
    );
    setTotalQuantity(cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0));
  };

  const addToCart = (product, addedQuantity) => {
    const foundProduct = cartItems.find((item) => item.name === product.name);

    if (foundProduct) {
      const otherCartProducts = cartItems.filter((item) => item.name !== product.name);
      setCartItems([...otherCartProducts, { ...foundProduct, quantity: foundProduct.quantity + addedQuantity }]);
    } else {
      product.quantity = addedQuantity;
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`Added ${addedQuantity} ${product.name} to Cart!`);
  };

  const removeFromCart = (product) => {
    const otherCartProducts = cartItems.filter((item) => item.name !== product.name);
    setCartItems([...otherCartProducts]);

    toast.success(`Removed ${product.quantity} ${product.name} from Cart!`);
  };

  const increaseProductQuantity = (product) => {
    // const foundProduct = cartItems.find((item) => item.name === product.name);
    // const otherCartProducts = cartItems.filter((item) => item.name !== product.name);
    // setCartItems([...otherCartProducts, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);

    // Fixed UI bug in Cart
    const newCartProducts = cartItems.map((item) => {
      if (item.name === product.name) item.quantity += 1;
      return item;
    });
    setCartItems([...newCartProducts]);
  };

  const decreaseProductQuantity = (product) => {
    // const foundProduct = cartItems.find((item) => item.name === product.name);
    // const otherCartProducts = cartItems.filter((item) => item.name !== product.name);
    // if (foundProduct.quantity === 1) return;
    // setCartItems([...otherCartProducts, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);

    // Fixed UI bug in Cart
    const newCartProducts = cartItems.map((item) => {
      if (item.name === product.name && item.quantity > 1) item.quantity -= 1;
      return item;
    });
    setCartItems([...newCartProducts]);
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantity,
        setShowCart,
        addToCart,
        removeFromCart,
        increaseProductQuantity,
        decreaseProductQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
