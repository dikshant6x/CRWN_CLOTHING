import { createContext, useState, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_CART_COUNT: "SET_CART_COUNT",
  SET_CART_TOTAL: "SET_CART_TOTAL",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

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
  // const [isCartOpen, setIsCartOpen] = useState(false);         // for icon dropdown
  // const [cartItems, SetCartItems] = useState([]);             // for cart items
  // const [cartCount, setCartCount] = useState(0);                // for total cart items count to show in icon
  // const [cartTotal, setCartTotal] = useState(0);              // for total cart items count to show in icon

  const [isCartOpen, setIsCartOpen] = useState(false);

  const [{ cartCount, cartTotal, cartItems }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  );
  // useEffect(() => {
  //   const newcartCount = cartItems.reduce(
  //     (total, cartItem) => total + cartItem.quantity,
  //     0
  //   );                          // reduce takes 2 aregumenst ist callback , second is starting value
  //   setCartCount(newcartCount);
  // }, [cartItems]);             // this whole useEffect gets us total no.of  items in cart

  // // To calculate Total price of commodities
  // useEffect(() => {
  //   const newCartTotal = cartItems.reduce(
  //     (total, cartItem) => total + cartItem.quantity * cartItem.price,
  //     0
  //   );                  // reduce takes 2 aregumenst ist callback , second is starting value
  //   setCartTotal(newCartTotal);
  // }, [cartItems]);                   // this whole useEffect gets us total no.of  items in cart

  // REDUCER SPECIFIC FUNCTION USED TO UPDAET

  const updateCartItemsReducer = (newCartItems) => {
    //generate newCartTotal

    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    //generate newCartCount

    const newcartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    const payload = {
      cartItems,
      cartTotal: newCartTotal,
      cartCount: newcartCount,
    };

    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  }; // function that triggers whenever user click on any product depending on availablity of product in cart item it either increase quantity added or it simply adds product to the cart item
  const removeItemToCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  // function to clear a specifi product on clcik to remove the product in checkout page
  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };

  // functiomn to dispatch for setIsCartOpen
  // const setIsCartOpen = (bool) => {
  //   dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  // };
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

// REASON TO USE REDUCERS IN CONTEXT HERE I SSO WE CAN CONGREGATE SOME LOGICS TO DISPATCH UPDATS FOR MULTIPLE ATTRIBUTES IN A SINGLE DISPATCH

// BASICALLY MODIFY MULTIPLE READABLE VALUES INSIDE STATE
