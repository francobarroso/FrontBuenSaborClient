import Cliente from "./Cliente";
import DetallePedido from "./DetallePedido";
import Domicilio from "./Domicilio";
import Empleado from "./Empleado";
import { Estado } from "./enums/Estado";
import { FormaPago } from "./enums/FormaPago";
import { TipoEnvio } from "./enums/TipoEnvio";
import Sucursal from "./Sucursal";

export default interface Pedido{
    id: number | null;
    eliminado: boolean;
    total: number;
    estado: Estado | null;
    tipoEnvio: TipoEnvio | null;
    formaPago: FormaPago | null;
    domicilio: Domicilio | null;
    sucursal: Sucursal | undefined;
    cliente: Cliente | undefined;
    detallePedidos: DetallePedido[] | undefined;
    empleado: Empleado | undefined;
}