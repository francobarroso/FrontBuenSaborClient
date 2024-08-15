import { createContext, ReactNode, useEffect, useState } from "react";
import ArticuloManufacturado from "../types/ArticuloManufacturado";
import ArticuloInsumo from "../types/ArticuloInsumo";
import DetallePedido from "../types/DetallePedido";

export interface CarritoContextType {
    carrito: DetallePedido[];
    addCarrito: (product: ArticuloManufacturado | ArticuloInsumo) => void;
    removeCarrito: (product: ArticuloManufacturado | ArticuloInsumo) => void;
    removeItemCarrito: (product: ArticuloManufacturado | ArticuloInsumo) => void;
    limpiarCarrito: () => void;
    totalPedido: number;
}

// 1. Crear contexto
export const CarritoContext = createContext<CarritoContextType>({
    carrito: [],
    addCarrito: () => { },
    removeCarrito: () => { },
    removeItemCarrito: () => { },
    limpiarCarrito: () => { },
    totalPedido: 0
});

// 2. Crear provider
export const CarritoContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [carrito, setCarrito] = useState<DetallePedido[]>(() => {
        const savedCarrito = localStorage.getItem("carrito");
        return savedCarrito ? JSON.parse(savedCarrito) : [];
    });
    const [totalPedido, setTotalPedido] = useState<number>(0);

    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
        calcularTotalCarrito();
    }, [carrito]);

    const addCarrito = (product: ArticuloManufacturado | ArticuloInsumo) => {
        setCarrito(prevCart => {
            const itemIndex = prevCart.findIndex(item => item.articulo.id === product.id);
            if (itemIndex === -1) {
                // Si el producto no está en el carrito, lo agregamos con cantidad 1
                const newDetalle: DetallePedido = {
                    id: null,
                    eliminado: false,
                    cantidad: 1,
                    subTotal: 0,
                    articulo: product,
                };
                return [...prevCart, newDetalle];
            } else {
                // Si el producto ya está en el carrito, incrementamos su cantidad
                return prevCart.map((item, index) =>
                    index === itemIndex
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }
        });
    };


    const removeCarrito = (product: ArticuloManufacturado | ArticuloInsumo) => {
        setCarrito(prevCart => prevCart.filter(detalle => detalle.articulo.id !== product.id));
    };

    const removeItemCarrito = (product: ArticuloManufacturado | ArticuloInsumo) => {
        setCarrito(prevCart => {
            const newCart = prevCart.map(detalle => {
                if (detalle.articulo.id === product.id) {
                    if (detalle.cantidad > 1) {
                        return { ...detalle, cantidad: detalle.cantidad - 1 };
                    }
                    return null;
                }
                return detalle;
            }).filter(detalle => detalle !== null) as DetallePedido[];
            return newCart;
        });
    };

    const limpiarCarrito = () => {
        setCarrito([]);
    };

    const calcularTotalCarrito = () => {
        const total = carrito.reduce((acc, item) => acc + Number(item.articulo.precioVenta) * Number(item.cantidad), 0);
        setTotalPedido(total);
    };

    return (
        <CarritoContext.Provider value={{ carrito, addCarrito, removeCarrito, removeItemCarrito, limpiarCarrito, totalPedido }}>
            {children}
        </CarritoContext.Provider>
    );
}