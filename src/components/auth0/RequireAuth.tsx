import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Loading from "../../screens/Loading";
import { ClienteExist } from "../../services/ClienteService";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const [cliente, setCliente] = useState(true);
  const [isCheckingCliente, setIsCheckingCliente] = useState(true);

  useEffect(() => {
    const checkCliente = async () => {
      if (user && user.email) {
        try {
          const cliente: boolean = await ClienteExist(user.email);
          setCliente(cliente);
        } catch (error) {
          console.error("Error fetching cliente:", error);
        }
      }
      setIsCheckingCliente(false);
    };

    if (isAuthenticated) {
      checkCliente();
    } else {
      setIsCheckingCliente(false);
    }
  }, [isAuthenticated, user]);

  if (isLoading || isCheckingCliente) {
    return <Loading />;
  }

  if (!isAuthenticated || cliente) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;