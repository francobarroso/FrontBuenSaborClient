import { Box, Typography, Divider, Avatar } from "@mui/material";
import ArticuloInsumo from "../../../types/ArticuloInsumo";
import ArticuloManufacturado from "../../../types/ArticuloManufacturado";

interface Props {
    cantidad: number;
    item: ArticuloManufacturado | ArticuloInsumo;
}

export function ItemCarrito({ cantidad, item }: Props) {
    return (
        <Box key={item.id} sx={{ padding: 2, display: 'flex', alignItems: 'center' }}>
            <Avatar
                variant="square"
                src={item.imagenes?.[0]?.url}
                alt={item.denominacion}
                sx={{ width: 40, height: 40, marginRight: 2 }}
            />
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {item.denominacion}
                </Typography>
                <Typography variant="body2">
                    {cantidad} {cantidad === 1 ? 'unidad' : 'unidades'} - ${Number(item.precioVenta) * cantidad}
                </Typography>
            </Box>
            <Divider variant="middle" sx={{ width: '100%', marginTop: 2 }} />
        </Box>
    );
}