import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from "../auth/helpers";

const AdminRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuth() && isAuth().role === 1 ? (
            <Component {...props} />
          ) : (
            <Redirect to="/signin" />
          )
        }
      />
    );
};

export default AdminRoute;
