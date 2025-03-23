import React from "react";
import { Navigate } from "react-router-dom";
import useStore from "../../store/useStore";

const PrivateRoute = ({ children }) => {
  const user = useStore((state) => state.user);

  // Si no hay usuario, redirige a login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario, muestra el contenido protegido
  return children;
};

export default PrivateRoute;
