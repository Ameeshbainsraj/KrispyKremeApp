
//ADDTOCART: When these functions will be called in the main page.js under a button for add to cart and the info will be stored and added to cart.

//GetCART: When this function will be called in the page.js to display info possibly in the checkout area.

//CLEARCHAT: When this function will be called in the page.js it is used to clear cart when we use the remove icon to delete cart.


//addToCart: Adds items to the cart and stores them in localStorage.
//This ensures the cart persists even if the page is refreshed.
export const addToCart = (product) => {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(product);

  localStorage.setItem("cart", JSON.stringify(cart));

};



//getCart: Retrieves the current list of items in the cart so they can be displayed or used in the app.
export const getCart = () => {

  return JSON.parse(localStorage.getItem("cart")) || [];

};




//clearCart: Empties the cart, typically after the user completes their purchase.
export const clearCart = () => {

  localStorage.removeItem("cart");

};





