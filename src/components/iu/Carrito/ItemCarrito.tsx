import { Box, Typography, Divider, Avatar } from "@mui/material";
import DetallePedido from "../../../types/DetallePedido";

interface Props {
    cantidad: number;
    item: DetallePedido;
}

export function ItemCarrito({ cantidad, item }: Props) {
    return (
        <>
            {item.articulo ? (
                <Box key={item.articulo.id} sx={{ padding: 2, display: 'flex', alignItems: 'center' }}>
                    <Avatar
                        variant="square"
                        src={item.articulo.imagenes?.[0]?.url}
                        alt={item.articulo.denominacion}
                        sx={{ width: 40, height: 40, marginRight: 2 }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {item.articulo.denominacion}
                        </Typography>
                        <Typography variant="body2">
                            {cantidad} {cantidad === 1 ? 'unidad' : 'unidades'} - ${Number(item.articulo.precioVenta) * cantidad}
                        </Typography>
                    </Box>
                    <Divider variant="middle" sx={{ width: '100%', marginTop: 2 }} />
                </Box>
            ) : item.promocion && (
                <Box key={item.promocion.id} sx={{ padding: 2, display: 'flex', alignItems: 'center' }}>
                    <Avatar
                        variant="square"
                        src={item.promocion.imagenes?.[0]?.url}
                        alt={item.promocion.denominacion}
                        sx={{ width: 40, height: 40, marginRight: 2 }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {item.promocion.denominacion}
                        </Typography>
                        <Typography variant="body2">
                            {cantidad} {cantidad === 1 ? 'unidad' : 'unidades'} - ${Number(item.promocion.precioPromocional) * cantidad}
                        </Typography>
                    </Box>
                    <Divider variant="middle" sx={{ width: '100%', marginTop: 2 }} />
                </Box>
            )}
        </>
    );
}