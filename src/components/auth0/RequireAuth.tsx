import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth0();
  const clienteRedux = useAppSelector((state) => state.cliente.cliente);

  if (!isAuthenticated || clienteRedux) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;