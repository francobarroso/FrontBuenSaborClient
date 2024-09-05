import { createContext, ReactNode, useEffect, useState } from "react";
import ArticuloManufacturado from "../types/ArticuloManufacturado";
import ArticuloInsumo from "../types/ArticuloInsumo";
import DetallePedido from "../types/DetallePedido";
import Promocion from "../types/Promocion";

export interface CarritoContextType {
    carrito: DetallePedido[];
    addCarrito: (product: ArticuloManufacturado | ArticuloInsumo) => void;
    addPromocionCarrito: (promocion: Promocion) => void,
    removeCarrito: (product: ArticuloManufacturado | ArticuloInsumo | Promocion) => void;
    removeItemCarrito: (product: ArticuloManufacturado | ArticuloInsumo | Promocion) => void;
    limpiarCarrito: () => void;
    totalPedido: number;
}

// 1. Crear contexto
export const CarritoContext = createContext<CarritoContextType>({
    carrito: [],
    addCarrito: () => { },
    addPromocionCarrito: () => { },
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
            const itemIndex = prevCart.findIndex(item => item.articulo && item.articulo.id === product.id);
            if (itemIndex === -1) {
                // Si el producto no está en el carrito, lo agregamos con cantidad 1
                const newDetalle: DetallePedido = {
                    id: null,
                    eliminado: false,
                    cantidad: 1,
                    subTotal: product.precioVenta,
                    articulo: product,
                    promocion: null
                };
                return [...prevCart, newDetalle];
            } else {
                // Si el producto ya está en el carrito, incrementamos su cantidad
                return prevCart.map((item, index) =>
                    index === itemIndex
                        ? {
                            ...item,
                            cantidad: item.cantidad + 1,
                            subTotal: (item.cantidad + 1) * product.precioVenta
                        }
                        : item
                );
            }
        });
    };

    const addPromocionCarrito = (promocion: Promocion) => {
        setCarrito(prevCart => {
            const itemIndex = prevCart.findIndex(item => item.promocion && item.promocion.id === promocion.id);
            if (itemIndex === -1) {
                // Si el producto no está en el carrito, lo agregamos con cantidad 1
                const newDetalle: DetallePedido = {
                    id: null,
                    eliminado: false,
                    cantidad: 1,
                    subTotal: promocion.precioPromocional,
                    articulo: null,
                    promocion: promocion
                };
                return [...prevCart, newDetalle];
            } else {
                // Si el producto ya está en el carrito, incrementamos su cantidad
                return prevCart.map((item, index) =>
                    index === itemIndex
                        ? {
                            ...item,
                            cantidad: item.cantidad + 1,
                            subTotal: (item.cantidad + 1) * promocion.precioPromocional
                        }
                        : item
                );
            }
        });
    };


    const removeCarrito = (product: ArticuloManufacturado | ArticuloInsumo | Promocion) => {
        setCarrito(prevCart => prevCart.filter(detalle => detalle.articulo ? detalle.articulo.id !== product.id : detalle.promocion && detalle.promocion.id !== product.id));
    };

    const removeItemCarrito = (product: ArticuloManufacturado | ArticuloInsumo | Promocion) => {
        const newCart = carrito.map(detalle => {
            if (detalle.articulo && detalle.articulo.id === product.id) {
                if (detalle.cantidad > 1) {
                    return { ...detalle, cantidad: detalle.cantidad - 1, subTotal: (detalle.cantidad - 1) * detalle.articulo.precioVenta };
                }
                return null;
            } else if (detalle.promocion && detalle.promocion.id === product.id) {
                if (detalle.cantidad > 1) {
                    return { ...detalle, cantidad: detalle.cantidad - 1, subTotal: (detalle.cantidad - 1) * detalle.promocion.precioPromocional };
                }
                return null;
            }

            return detalle;
        }).filter(detalle => detalle !== null) as DetallePedido[];
        setCarrito(newCart);
    };

    const limpiarCarrito = () => {
        setCarrito([]);
    };

    const calcularTotalCarrito = () => {
        const total = carrito.reduce((acc, item) =>
            acc + (item.subTotal || 0), 0);
        setTotalPedido(total);
    };

    return (
        <CarritoContext.Provider value={{ carrito, addCarrito, addPromocionCarrito, removeCarrito, removeItemCarrito, limpiarCarrito, totalPedido }}>
            {children}
        </CarritoContext.Provider>
    );
}