import { CarritoContextProvider } from "./context/CarritoContext";
import { AppRoutes } from "./routes/AppRoutes";

function App() {

  return (
    <>
      <CarritoContextProvider>
        <AppRoutes />
      </CarritoContextProvider>
    </>
  )
}

export default App
