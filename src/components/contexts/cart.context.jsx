import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener } from "../../utils/firebase/firebase.utils";

// adding items to cart

const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains producttoAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // if found increment the quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  // if not found , return new array with modified cartItems / new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }]; // spread out existing card items along with additional cartitem with quantity 1
};

// REMOVE CART ITEMS FOR DECREMENT BEHAVIOUR ON CHECKOUT PAGE

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find The spcific cartitem to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  //cehck if quantity = 1 ,if yes then remove that item from cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id); // Here what happend is that as per logic of filter we get only those items that are returning false to set condition cartItem.id !== cartItemToRemove.id if any ofthem is same we simply get false only truthy value passes. means we simply remove that 1 from quantity
  }
  // return back cartitems withh matching cart items with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

// FUNCTION TO CLEAR CART ITEM FULLY ONCE CLICKED
// same logic as remove cartitem function it basically maeks sure that return value don't have same prod i
const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [], // add new items to car
  addItemToCart: () => {}, // Our own method to decide what is added to item in this cart
  cartCount: 0,
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false); // for icon dropdown
  const [cartItems, SetCartItems] = useState([]); // for cart items
  const [cartCount, setCartCount] = useState(0); // for total cart items count to show in icon
  const [cartTotal, setCartTotal] = useState(0); // for total cart items count to show in icon

  useEffect(() => {
    const newcartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    ); // reduce takes 2 aregumenst ist callback , second is starting value
    setCartCount(newcartCount);
  }, [cartItems]); // this whole useEffect gets us total no.of  items in cart

  // To calculate Total price of commodities
  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    ); // reduce takes 2 aregumenst ist callback , second is starting value
    setCartTotal(newCartTotal);
  }, [cartItems]); // this whole useEffect gets us total no.of  items in cart

  const addItemToCart = (productToAdd) => {
    SetCartItems(addCartItem(cartItems, productToAdd));
  }; // function that triggers whenever user click on any product depending on availablity of product in cart item it either increase quantity added or it simply adds product to the cart item
  const removeItemToCart = (cartItemToRemove) => {
    SetCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  // function to clear a specifi product on clcik to remove the product in checkout page
  const clearItemFromCart = (cartItemToClear) => {
    SetCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemToCart,
    clearItemFromCart,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
