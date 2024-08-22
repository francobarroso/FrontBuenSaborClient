import { useAuth0 } from "@auth0/auth0-react";
import { CarritoContextProvider } from "./context/CarritoContext";
import { AppRoutes } from "./routes/AppRoutes";
import Loading from "./screens/Loading";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <CarritoContextProvider>
        <AppRoutes />
      </CarritoContextProvider>
    </>
  )
}

export default App