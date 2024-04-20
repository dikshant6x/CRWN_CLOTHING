import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-drowpdown/cart-dropdown.component";

import { UserContext } from "../../components/contexts/user.context";
import { CartContext } from "../../components/contexts/cart.context";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import {
  NavigationContainer,
  NavLink,
  NavLinks,
  LogoContainer,
} from "./navigations.styles";

const Navgiation = () => {
  const { currentUser } = useContext(UserContext); // we want current user value not the setter one ; we want actual value of current user
  // console.log(Currentuser);

  // const signOutHandler = async () => {
  //   await signOutUser();
  //   // setCurrentUser(null); // signout  the user but also reset the context by calling setter function making current value null
  // };

  const { isCartOpen } = useContext(CartContext); // Implmenting cart dropdown on navbar via cart context

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="Logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropDown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navgiation;

//         {isCartOpen && <CartDropDown />}
// Shortcircuit { && } operator evaluates trythiness of values on each side
// component are all truthy value
// total thing returns true i will return you last thing you gave me that CartDropDown
