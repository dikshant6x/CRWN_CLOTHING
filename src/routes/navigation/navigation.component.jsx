import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../components/contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import "./navigations.styles.scss";

const Navgiation = () => {
  const { currentUser } = useContext(UserContext); // we want current user value not the setter one ; we want actual value of current user
  // console.log(Currentuser);

  // const signOutHandler = async () => {
  //   await signOutUser();
  //   // setCurrentUser(null); // signout  the user but also reset the context by calling setter function making current value null
  // };

  return (
    <Fragment>
      <div className="navigation">
        <div className="nav-links-container">
          <Link className="logo-conatiner" to="/">
            <div>
              <CrwnLogo className="Logo" />
            </div>
          </Link>
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navgiation;
