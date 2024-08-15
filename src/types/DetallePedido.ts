import ArticuloInsumo from "./ArticuloInsumo";
import ArticuloManufacturado from "./ArticuloManufacturado";

export default interface DetallePedido{
    id: number | null;
    eliminado: boolean;
    cantidad: number;
    subTotal: number;
    articulo: ArticuloManufacturado | ArticuloInsumo;
}