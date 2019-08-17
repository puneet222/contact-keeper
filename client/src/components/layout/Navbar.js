import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import ContactContext from "../../context/contact/contactContext";

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => {
    logout();
    contactContext.clearContacts();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li onClick={onLogout}>Logout</li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </Fragment>
  );

  return (
    <div className="navbar bg-primary">
      <h2>
        <i className={icon} /> {title}
      </h2>
      <ul>
        {/* <li>
          <Link to="/about">About</Link>
        </li> */}
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: "Contact Keeper",
  icon: "fas fa-id-card-alt"
};

export default Navbar;
