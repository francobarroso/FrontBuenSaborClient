import { createContext, ReactNode, useEffect, useState } from "react";
import ArticuloManufacturado from "../types/ArticuloManufacturado";
import ArticuloInsumo from "../types/ArticuloInsumo";
import DetallePedido from "../types/DetallePedido";
import Promocion from "../types/Promocion";
import { useAppDispatch } from "../redux/hook";
import { setCarritoRedux } from "../redux/slices/carritoSlice";

export interface CarritoContextType {
    carrito: DetallePedido[];
    addCarrito: (product: ArticuloManufacturado | ArticuloInsumo) => void;
    addPromocionCarrito: (promocion: Promocion) => void;
    removeCarrito: (product: ArticuloManufacturado | ArticuloInsumo | Promocion) => void;
    removeItemCarrito: (product: ArticuloManufacturado | ArticuloInsumo | Promocion) => void;
    limpiarCarrito: () => void;
    totalPedido: number;
}

// Crear contexto
export const CarritoContext = createContext<CarritoContextType>({
    carrito: [],
    addCarrito: () => { },
    addPromocionCarrito: () => { },
    removeCarrito: () => { },
    removeItemCarrito: () => { },
    limpiarCarrito: () => { },
    totalPedido: 0
});

// Crear provider
export const CarritoContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [carrito, setCarrito] = useState<DetallePedido[]>([]);
    const [totalPedido, setTotalPedido] = useState<number>(0);
    const dispatch = useAppDispatch();

    useEffect(() => {
        calcularTotalCarrito();
    }, [carrito]);

    const addCarrito = (product: ArticuloManufacturado | ArticuloInsumo) => {
        const itemIndex = carrito.findIndex(item => item.articulo && item.articulo.id === product.id);

        let updatedCarrito;
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
            updatedCarrito = [...carrito, newDetalle];
        } else {
            // Si el producto ya está en el carrito, incrementamos su cantidad
            updatedCarrito = carrito.map((item, index) =>
                index === itemIndex
                    ? {
                        ...item,
                        cantidad: item.cantidad + 1,
                        subTotal: (item.cantidad + 1) * product.precioVenta
                    }
                    : item
            );
        }
        setCarrito(updatedCarrito);
        dispatch(setCarritoRedux(updatedCarrito));
    };

    const addPromocionCarrito = (promocion: Promocion) => {
        const itemIndex = carrito.findIndex(item => item.promocion && item.promocion.id === promocion.id);

        let updatedCarrito: DetallePedido[];
        if (itemIndex === -1) {
            // La promoción no está en el carrito, así que la agregamos
            const newDetalle: DetallePedido = {
                id: null,
                eliminado: false,
                cantidad: 1,
                subTotal: promocion.precioPromocional,
                articulo: null,
                promocion: promocion
            };
            updatedCarrito = [...carrito, newDetalle];
        } else {
            // La promoción ya está en el carrito, así que incrementamos su cantidad
            updatedCarrito = carrito.map((item, index) =>
                index === itemIndex
                    ? {
                        ...item,
                        cantidad: item.cantidad + 1,
                        subTotal: (item.cantidad + 1) * promocion.precioPromocional
                    }
                    : item
            );
        }

        setCarrito(updatedCarrito);
        dispatch(setCarritoRedux(updatedCarrito));
    };

    const removeCarrito = (product: ArticuloManufacturado | ArticuloInsumo | Promocion) => {
        const updatedCarrito = carrito.filter(detalle => detalle.articulo ? detalle.articulo.id !== product.id : detalle.promocion && detalle.promocion.id !== product.id);
        setCarrito(updatedCarrito);
        dispatch(setCarritoRedux(updatedCarrito));
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
        dispatch(setCarritoRedux(newCart));
    };

    const limpiarCarrito = () => {
        setCarrito([]);
        dispatch(setCarritoRedux([]));
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