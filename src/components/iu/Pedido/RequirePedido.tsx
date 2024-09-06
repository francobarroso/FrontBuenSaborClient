import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hook";
import { useCarrito } from "../../../hooks/useCarrito";

const RequirePedido = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth0();
  const clienteRedux = useAppSelector((state) => state.cliente.cliente);
  const sucursalRedux = useAppSelector((state) => state.sucursal.sucursal);
  const { carrito } = useCarrito();

  if (!isAuthenticated || !clienteRedux) {
    return <Navigate to="/" replace />;
  }

  if (carrito.length <= 0 || sucursalRedux === null) {
    return <Navigate to="/menu" replace />;
  }

  return children;
};

export default RequirePedido;