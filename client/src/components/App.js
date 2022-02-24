import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Layout from "./core/Layout";
import Home from "./Home";
import Shop from "./Shop";
import Cart from "./Cart";
import Product from "./Product";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import Activate from "./auth/Activate";
import Private from "./core/Private";
import Admin from "./core/Admin";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import Forgot from "./auth/Forgot";
import Reset from "./auth/Reset";
import AdminDashboard from "./AdminDashboard";
import AdminEditProduct from "./AdminEditProduct";
import NotFound from "./NotFound";
import Checkout from "./Checkout";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/shop" component={Shop} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/product/:productId" component={Product} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/signin" exact component={Signin} />
            <Route path="/auth/activate/:token" exact component={Activate} />
            <PrivateRoute path="/private" exact component={Private} />
            <AdminRoute path="/admin" exact component={Admin} />
            <Route path="/auth/password/forgot" exact component={Forgot} />
            <Route path="/auth/password/reset/:token" exact component={Reset} />
            <AdminRoute
              exact
              path="/admin/dashboard"
              component={AdminDashboard}
            />
            <AdminRoute
              exact
              path="/admin/edit/product/:productId"
              component={AdminEditProduct}
            />
            <Route component={NotFound} />
          </Switch>
        </main>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
