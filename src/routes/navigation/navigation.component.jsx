import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import "./navigations.styles.scss";

const Navgiation = () => {
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
          <Link className="nav-link" to="/sign-in">
            SIGN IN
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navgiation;
