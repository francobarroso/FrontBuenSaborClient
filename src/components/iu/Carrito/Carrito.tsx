import { Box, Button, Divider, Stack, Tooltip, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useCarrito } from "../../../hooks/useCarrito";
import { ItemCarrito } from "./ItemCarrito";
import colorConfigs from "../../../configs/colorConfig";
import { useNavigate } from "react-router-dom";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const Carrito = () => {
    const { carrito, totalPedido, limpiarCarrito } = useCarrito();
    const navigate = useNavigate();
    const isCarritoEmpty = carrito.length === 0;

    const handlePedido = () => {
        navigate("/pedido");
    }

    return (
        <>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Mi pedido</Typography>
            {isCarritoEmpty ? (
                <>
                    <Stack direction="column" alignItems="center">
                        <SearchIcon sx={{ color: "#b6bfbe", fontSize: 100 }} />
                        <Typography variant="body2">Tu pedido está vacío.</Typography>
                    </Stack>
                </>
            ) : (
                <>
                    <Stack direction="column" spacing={2} sx={{ mb: 2 }}>
                        {carrito.map((detalle, index) => (
                            <Box key={index}>
                                <ItemCarrito
                                    item={detalle}
                                    cantidad={detalle.cantidad}
                                />
                            </Box>
                        ))}
                    </Stack>

                    <Divider sx={{ my: 2 }} />

                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total:</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>${totalPedido}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        {
                            !location.pathname.includes('pedido') && (
                                <>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        sx={{
                                            py: 1.5, fontWeight: 'bold', ...colorConfigs.buttonStyles
                                        }}
                                        onClick={handlePedido}
                                    >
                                        Completar Pedido
                                    </Button>
                                    <Tooltip title="Vaciar Carrito" arrow>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                py: 1.5, fontWeight: 'bold', ...colorConfigs.backButtonStyles
                                            }}
                                            onClick={limpiarCarrito}
                                        >
                                            <RemoveShoppingCartIcon />
                                        </Button>
                                    </Tooltip>
                                </>
                            )
                        }
                    </Stack>
                </>
            )}
        </>
    );

}

export default Carrito;