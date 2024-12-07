

export const handleRemoveItem = (cart, setCartState, clearCart) => (index) => {

  const updatedCart = cart.filter((_, i) => i !== index); // Filter out the item at the given index.

  setCartState(updatedCart); // Update the cart state in the app.

  if (updatedCart.length === 0) {

    clearCart(); // If the cart is now empty, clear it completely (removes from localStorage).

  } else {

    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Otherwise, update the cart in localStorage.

  }
};



export const handleQuantityChange = (cart, setCartState, addToCart) => (index, value) => {

  const updatedCart = [...cart]; // Create a copy of the cart to avoid mutating the original array.

  updatedCart[index].quantity = Math.max(1, value); // Update the quantity but ensure it doesn’t go below 1.

  setCartState(updatedCart); // Update the cart state in the app.

  addToCart(updatedCart); // Save the updated cart to localStorage.

};



export const goToCheckout = (router) => () => {

  router.push("/checkout"); // Navigate to the "/checkout" route.
  
};

