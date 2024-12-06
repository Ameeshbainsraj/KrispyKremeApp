// cartUtils.js
export const handleRemoveItem = (cart, setCartState, clearCart) => (index) => {
  const updatedCart = cart.filter((_, i) => i !== index);
  setCartState(updatedCart);
  if (updatedCart.length === 0) {
    clearCart();
  } else {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }
};

export const handleQuantityChange = (cart, setCartState, addToCart) => (index, value) => {
  const updatedCart = [...cart];
  updatedCart[index].quantity = Math.max(1, value);
  setCartState(updatedCart);
  addToCart(updatedCart); // Use addToCart to update the cart in localStorage
};

export const goToCheckout = (router) => () => {
  router.push("/checkout"); // Redirect to checkout page
};
