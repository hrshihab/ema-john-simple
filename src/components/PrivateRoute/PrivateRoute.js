import React from "react";
import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { userContext } from "../../App";

const PrivateRoute = ({ childern, ...rest }) => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const location = useLocation();
  return loggedInUser.email ? (
    <Outlet/>
  ) : (
    <Navigate
      to={{
        pathname: "/login",
        state: { from: location },
      }}
    />
  );
};

export default PrivateRoute;
