import { useContext } from "react"
import { CarritoContext } from "../context/CarritoContext";

export const useCarrito = () => {
    const context = useContext(CarritoContext);

    if (context === undefined) {
        throw new Error('useCarrito debe ser usado dentro del ambito de un CartProvider')
      }

    return context;
}