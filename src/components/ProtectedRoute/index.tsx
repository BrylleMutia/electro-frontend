import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { RouteProps } from "react-router-dom";

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
} & RouteProps;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, ...routeProps }) => {
  const [token] = useState(localStorage.getItem("token"));

  if (isAuthenticated || token) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to="/auth" />;
  }
};

export default ProtectedRoute;
