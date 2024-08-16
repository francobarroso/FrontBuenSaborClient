import { Box, Button, Modal, Typography } from "@mui/material";
import Pedido from "../../../types/Pedido";
import { TipoEnvio } from "../../../types/enums/TipoEnvio";
import Sucursal from "../../../types/Sucursal";
import colorConfigs from "../../../configs/colorConfig";

interface PedidoProps {
    pedido: Pedido;
    sucursal: Sucursal | null;
    open: boolean;
    onClose: () => void;
}

const PedidoEnviadoModal: React.FC<PedidoProps> = ({ pedido, sucursal, open, onClose }) => {
    return (
        <>
            <Modal open={open} onClose={onClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '40%',
                        maxWidth: 500,
                        maxHeight: '80vh',
                        overflow: 'auto',
                        bgcolor: 'background.paper',
                        p: 4,
                        borderRadius: 8,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography variant="h5" gutterBottom align="center">
                        ¡Pedido Realizado con Éxito!
                    </Typography>

                    <Box mt={2}>
                        <Typography variant="subtitle1" gutterBottom align="left" sx={{ fontWeight: 'bold' }}>
                            Tipo Envío:
                        </Typography>
                        <Typography variant="body2" gutterBottom align="left">
                            {pedido.tipoEnvio === TipoEnvio.DELIVERY ? "Delivery" : "Retiro en Local"}
                        </Typography>
                    </Box>

                    <Box mt={2}>
                        <Typography variant="subtitle1" gutterBottom align="left" sx={{ fontWeight: 'bold' }}>
                            Forma de Pago:
                        </Typography>
                        <Typography variant="body2" gutterBottom align="left">
                            {pedido.tipoEnvio === TipoEnvio.DELIVERY ? "Mercado Pago" : "Efectivo"}
                        </Typography>
                    </Box>

                    <Box mt={2}>
                        <Typography variant="subtitle1" gutterBottom align="left" sx={{ fontWeight: 'bold' }}>
                            {pedido.tipoEnvio === TipoEnvio.DELIVERY ? "Domicilio:" : "Dirección de la Sucursal:"}
                        </Typography>
                        <Typography variant="body2" gutterBottom align="left">
                            {pedido.tipoEnvio === TipoEnvio.DELIVERY
                                ? `${pedido.domicilio?.calle}, ${pedido.domicilio?.numero}, ${sucursal?.domicilio?.localidad?.nombre}, ${sucursal?.domicilio?.localidad?.provincia.nombre}`
                                : `${sucursal?.domicilio?.calle}, ${sucursal?.domicilio?.numero}, ${sucursal?.domicilio?.localidad?.nombre}, ${sucursal?.domicilio?.localidad?.provincia.nombre}`
                            }
                        </Typography>
                    </Box>
                    <Box mt={2}>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                py: 1.5, fontWeight: 'bold', ...colorConfigs.buttonStyles
                            }}
                            onClick={onClose}
                        >
                            Volver al Inicio
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}

export default PedidoEnviadoModal;
