import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Grid, Box } from "@mui/material";
import ArticuloInsumo from '../../../types/ArticuloInsumo';
import ArticuloManufacturado from '../../../types/ArticuloManufacturado';
import ProductoView from './ProductoView';
import { useCarrito } from '../../../hooks/useCarrito';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppSelector } from '../../../redux/hook';

interface ProductosProps {
    articulo: ArticuloInsumo | ArticuloManufacturado;
    cliente: boolean | null;
}

const ProductoCard: React.FC<ProductosProps> = ({ articulo, cliente }) => {
    const [open, setOpen] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const { addCarrito, removeCarrito, removeItemCarrito } = useCarrito();
    const carritoRedux = useAppSelector((state) => state.carrito.carrito);
    const { isAuthenticated } = useAuth0();

    const verificarArticuloCarrito = (product: ArticuloManufacturado | ArticuloInsumo) => {
        return carritoRedux.some(item => String(item.articulo && item.articulo.id) === String(product.id));
    };

    const isArticuloCarrito = verificarArticuloCarrito(articulo);

    const esArticuloManufacturado = (articulo: ArticuloInsumo | ArticuloManufacturado): articulo is ArticuloManufacturado => {
        return 'descripcion' in articulo;
    };

    const handleOpen = () => {
        setImages(articulo.imagenes.map(imagen => imagen.url));
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card
            key={articulo.id}
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
                            {articulo.denominacion}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" noWrap>
                            {esArticuloManufacturado(articulo) ? articulo.descripcion : '...'}
                        </Typography>
                        <Typography variant="body2" color="primary" style={{ marginTop: '8px', fontWeight: 'bold', cursor: 'pointer' }} onClick={handleOpen}>
                            Ver Detalles
                        </Typography>
                    </Grid>
                    <Grid item xs={4} style={{ position: 'relative' }}>
                        <CardMedia
                            component="img"
                            height="120"
                            image={articulo.imagenes[0].url}
                            alt={articulo.denominacion}
                            style={{ objectFit: 'cover' }}
                        />
                    </Grid>
                </Grid>
                <Box style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                        ${articulo.precioVenta && articulo.precioVenta.toFixed(2)}
                    </Typography>
                    {isAuthenticated && cliente && (
                        <Box>
                            {
                                !isArticuloCarrito ? (
                                    <Box>
                                        <RemoveIcon sx={{ color: "grey" }} />
                                        <AddShoppingCartIcon sx={{ cursor: "pointer", color: "green" }} onClick={() => addCarrito(articulo)} />
                                        <AddIcon sx={{ cursor: "pointer" }} onClick={() => addCarrito(articulo)} />
                                    </Box>
                                ) : (
                                    <Box>
                                        <RemoveIcon sx={{ cursor: "pointer" }} onClick={() => removeItemCarrito(articulo)} />
                                        <RemoveShoppingCartIcon sx={{ cursor: "pointer", color: "red" }} onClick={() => removeCarrito(articulo)} />
                                        <AddIcon sx={{ cursor: "pointer" }} onClick={() => addCarrito(articulo)} />
                                    </Box>
                                )
                            }
                        </Box>
                    )}
                </Box>
            </CardContent>

            <ProductoView articulo={articulo} open={open} onClose={handleClose} images={images} />
        </Card>
    );
};

export default ProductoCard;