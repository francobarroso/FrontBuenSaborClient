import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import Carrito from "../components/iu/Carrito/Carrito";
import colorConfigs from "../configs/colorConfig";
import { useEffect, useState } from "react";
import Sucursal from "../types/Sucursal";
import type Pedido from "../types/Pedido";
import { TipoEnvio } from "../types/enums/TipoEnvio";
import DetallePedido from "../types/DetallePedido";
import { FormaPago } from "../types/enums/FormaPago";
import { Estado } from "../types/enums/Estado";
import PedidoEnviadoModal from "../components/iu/Pedido/PedidoEnviadoModal";
import { useNavigate } from "react-router-dom";
import PreferenceMP from "../types/PreferenceMP";
import { createPreferenceMP, PedidoSave } from "../services/Pedido";
import CheckoutMP from "../components/iu/Carrito/CheckoutMP";
import { useCarrito } from "../hooks/useCarrito";
import { toast } from "react-toastify";

const emptyPedido = { id: null, eliminado: false, total: 0, estado: null, tipoEnvio: null, formaPago: null, domicilio: null, sucursal: undefined, clienteId: 1, detallePedidos: undefined, empleadoId: 1 }
const pedidoprub = { id: 0, eliminado: false, total: 0, estado: Estado.PREPARACION, tipoEnvio: TipoEnvio.DELIVERY, formaPago: FormaPago.MERCADO_PAGO, domicilio: null, sucursal: undefined, clienteId: 1, detallePedidos: undefined, empleadoId: 1 }

const Pedido = () => {
    const [sucursal, setSucursal] = useState<Sucursal | null>(null);
    const [carrito, setCarrito] = useState<DetallePedido[]>();
    const [pedido, setPedido] = useState<Pedido>(emptyPedido);
    const [open, setOpen] = useState(false);
    const { totalPedido } = useCarrito();
    const [idPreference, setIdPreference] = useState<string>('');
    const navigate = useNavigate();

    const SavePedido = async (pedido: Pedido) => {
        return PedidoSave(pedido);
    }

    const MercadoPago = async () => {
        const response: PreferenceMP = await createPreferenceMP(pedidoprub);
        if (response) {
            setIdPreference(response.id);
        }
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedTipoEnvio = (event.target as HTMLInputElement).value as TipoEnvio;
        setPedido((prevPedido) => ({
            ...prevPedido,
            tipoEnvio: selectedTipoEnvio,
        }));
    };

    const handleClose = () => {
        setOpen(false);
        navigate("/");
    }

    const handleSubmit = async () => {
        const updatedPedido = {
            ...pedido,
            estado: pedido.tipoEnvio === TipoEnvio.DELIVERY ? Estado.PREPARACION : Estado.PENDIENTE,
            formaPago: pedido.tipoEnvio === TipoEnvio.DELIVERY ? FormaPago.MERCADO_PAGO : FormaPago.EFECTIVO,
            detallePedidos: carrito,
            total: totalPedido,
            sucursal: sucursal || pedido.sucursal
        };

        try{
            const data = await SavePedido(updatedPedido);
            if(data.status !== 200){
                toast.error("Error al realizar el pedido, intente más tarde.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                });
                return;
            } else if(data.data.formaPago === FormaPago.MERCADO_PAGO){
                MercadoPago();
            } else{
                setOpen(true);
            }
        }catch (error) {
            console.log("Error al dar de baja un articulo insumo");
        }

    }

    useEffect(() => {
        const sucursal = localStorage.getItem("sucursal");
        if (sucursal) {
            setSucursal(JSON.parse(sucursal));
        } else {
            const sucursalMatriz = localStorage.getItem("sucursalMatriz");
            if (sucursalMatriz) {
                setSucursal(JSON.parse(sucursalMatriz));
            }
        }

        const carrito = localStorage.getItem("carrito");
        if (carrito) {
            setCarrito(JSON.parse(carrito));
        }
    }, []);

    return (
        <>
            <Box mt={3} ml={3} mr={3} display="flex" alignItems="flex-start">
                <Box padding={2} flexBasis="50%" flexGrow={1} mx={2} sx={{ border: "1px solid #c5c5c5", borderRadius: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <Box mb={3}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Elegí el tipo de envio</Typography>
                        <FormControl sx={{ mt: 5 }}>
                            <RadioGroup
                                aria-labelledby="tipo-envio-label"
                                name="tipo-envio"
                                onChange={handleRadioChange}
                            >
                                <FormControlLabel value={TipoEnvio.DELIVERY} control={<Radio />} label={<Typography sx={{ fontWeight: 'bold' }}>
                                    Envio a domicilio (Solo MecadoPago)
                                </Typography>} />
                                <Typography mb={3} variant="body2">Domicilio Cliente</Typography>
                                <FormControlLabel value={TipoEnvio.TAKE_AWAY} control={<Radio />} label={<Typography sx={{ fontWeight: 'bold' }}>
                                    Retiro en Local (Solo Efectivo)
                                </Typography>} />
                                <Typography mb={3} variant="body2">
                                    {sucursal?.domicilio.calle} {sucursal?.domicilio.numero}, {sucursal?.domicilio.localidad?.nombre}, {sucursal?.domicilio.localidad?.provincia.nombre}
                                </Typography>
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box display="flex" justifyContent="flex-end" alignItems="flex-end" mt={2}>
                        <Button variant="contained"
                            sx={{
                                py: 1.5, fontWeight: 'bold', ...colorConfigs.buttonStyles
                            }}
                            disabled={pedido.tipoEnvio === null}
                            onClick={handleSubmit}
                        >
                            Finalizar Pedido
                        </Button>
                    </Box>
                </Box>
                <Box padding={2} ml={2} flexBasis="25%" flexGrow={0} sx={{ border: "1px solid #c5c5c5", borderRadius: "20px" }}>
                    <Carrito />
                    {idPreference && (
                        <CheckoutMP idPreference={idPreference}></CheckoutMP>
                    )}
                </Box>
            </Box>
            <PedidoEnviadoModal pedido={pedido} sucursal={sucursal} onClose={handleClose} open={open} />
        </>
    );
}

export default Pedido;