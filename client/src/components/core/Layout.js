import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuth, signout } from "../auth/helpers";
import { useSelector } from "react-redux";

const Layout = ({ children, match, history }) => {
  const { cart } = useSelector((state) => state.cart);
  const isActive = (path) => {
    if (match.path === path) {
      return { color: "#000" };
    } else {
      return { color: "#fff" };
    }
  };

  const nav = () => (
    <ul className="nav nav-tabs bg-primary text-center">
      <li className="nav-item">
        <Link to="/" className="nav-link" style={isActive("/")}>
          <img
            src="../images/ecommerce.png"
            className="logo-image"
            alt=""
            srcset=""
          />
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/shop"
          className="nav-link link-center"
          style={isActive("/shop")}
        >
          <i className="fas fa-shopping-bag"></i> Shop
        </Link>
      </li>

      {!isAuth() && (
        <Fragment>
          <li className="nav-item">
            <Link
              to="/signin"
              className="nav-link link-center"
              style={isActive("/signin")}
            >
              <i className="fa fa-sign-language"></i> Signin
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/signup"
              className="nav-link link-center"
              style={isActive("/signup")}
            >
              <i className="fa fa-user-plus"></i> Signup
            </Link>
          </li>
          <li className="nav-item mr-2" style={{ position: "relative" }}>
            <Link
              to="/cart"
              className="nav-link link-center"
              style={isActive("/cart")}
            >
              <i className="fas fa-shopping-cart"></i> Cart{" "}
              <span
                className="badge badge-danger"
                style={{
                  position: "absolute",
                  top: "38px",
                }}
              >
                {cart.length}
              </span>
            </Link>
          </li>
        </Fragment>
      )}

      {isAuth() && isAuth().role === "admin" && (
        <Fragment>
          <li className="nav-item">
            <Link
              className="nav-link link-center"
              style={isActive("/admin")}
              to="/admin"
            >
              {isAuth().name}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link link-center"
              style={isActive("/admin/dashboard")}
              to="/admin/dashboard"
            >
              Admin Dashboard
            </Link>
          </li>
        </Fragment>
      )}

      {isAuth() && isAuth().role === "subscriber" && (
        <li className="nav-item">
          <Link
            className="nav-link link-center"
            style={isActive("/private")}
            to="/private"
          >
            {isAuth().name}
          </Link>
        </li>
      )}

      {isAuth() && (
        <Fragment>
          <li className="nav-item">
            <span
              className="nav-link link-center"
              style={{ cursor: "pointer", color: "#fff" }}
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
            >
              Signout
            </span>
          </li>
          <li className="nav-item mr-2" style={{ position: "relative" }}>
            <Link
              to="/cart"
              className="nav-link link-center"
              style={isActive("/cart")}
            >
              <i className="fas fa-shopping-cart"></i> Cart{" "}
              <span
                className="badge badge-danger"
                style={{
                  position: "absolute",
                  top: "38px",
                }}
              >
                {cart.length}
              </span>
            </Link>
          </li>
        </Fragment>
      )}
    </ul>
  );

  return (
    <Fragment>
      {nav()}
      <div className="container">{children}</div>
    </Fragment>
  );
};

export default withRouter(Layout);
