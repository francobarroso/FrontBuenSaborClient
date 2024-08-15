import { Box, Card, CardContent, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import Promocion from "../../../types/Promocion";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PromocionView from "./PromocionView";
import { useState } from "react";
import { useCarrito } from "../../../hooks/useCarrito";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface PromocionProps {
    promocion: Promocion;
}

const PromocionCard: React.FC<PromocionProps> = ({ promocion }) => {
    const [open, setOpen] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const { carrito, addPromocionCarrito, removeCarrito, removeItemCarrito } = useCarrito();

    const verificarPromocionCarrito = (promocion: Promocion) => {
        return carrito.some(item => String(item.promocion && item.promocion.id) === String(promocion.id));
    };

    const isPromocionCarrito = verificarPromocionCarrito(promocion);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        date.setDate(date.getDate() + 1);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const handleOpen = () => {
        setImages(promocion.imagenes.map(imagen => imagen.url));
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Card
                key={promocion.id}
                style={{
                    maxWidth: 400,
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '1px solid #c5c5c5',
                    position: 'relative',
                }}
            >
                <CardContent style={{ padding: 0 }}>
                    <Grid container spacing={0}>
                        <Grid item xs={8} style={{ padding: '16px' }}>
                            <Typography
                                variant="h6"
                                style={{
                                    fontWeight: 'bold',
                                    color: 'black',
                                    marginBottom: '8px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {promocion.denominacion}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" noWrap>
                                ¡Disponible hasta el {formatDate(promocion.fechaHasta)}!
                            </Typography>
                            <Typography variant="body2" color="primary" style={{ marginTop: '8px', fontWeight: 'bold', cursor: 'pointer' }} onClick={handleOpen}>
                                Ver Detalles
                            </Typography>
                        </Grid>
                        <Grid item xs={4} style={{ position: 'relative' }}>
                            <CardMedia
                                component="img"
                                height="120"
                                image={promocion.imagenes[0].url}
                                alt={promocion.denominacion}
                                style={{ objectFit: 'cover' }}
                            />
                            <IconButton
                                style={{
                                    position: 'absolute',
                                    top: '8px',
                                    right: '8px',
                                    backgroundColor: 'white',
                                    padding: '4px',
                                    borderRadius: '50%',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                }}
                            >
                                <AddCircleOutlineIcon style={{ color: '#1976d2' }} />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Box style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                            ${promocion.precioPromocional && promocion.precioPromocional.toFixed(2)}
                        </Typography>
                        <Box>
                            {
                                !isPromocionCarrito ? (
                                    <Box>
                                        <RemoveIcon sx={{ color: "grey" }} />
                                        <AddShoppingCartIcon sx={{ cursor: "pointer", color: "green" }} onClick={() => addPromocionCarrito(promocion)} />
                                        <AddIcon sx={{ cursor: "pointer" }} onClick={() => addPromocionCarrito(promocion)} />
                                    </Box>
                                ) : (
                                    <Box>
                                        <RemoveIcon sx={{ cursor: "pointer" }} onClick={() => removeItemCarrito(promocion)} />
                                        <RemoveShoppingCartIcon sx={{ cursor: "pointer", color: "red" }} onClick={() => removeCarrito(promocion)} />
                                        <AddIcon sx={{ cursor: "pointer" }} onClick={() => addPromocionCarrito(promocion)} />
                                    </Box>
                                )
                            }
                        </Box>
                    </Box>
                </CardContent>
                <PromocionView promocion={promocion} open={open} onClose={handleClose} images={images} />
            </Card>
        </>
    )
}

export default PromocionCard;