import React, { useState } from 'react';
import { Card, CardActions, CardMedia, CardContent, Typography, Grid, Box, IconButton } from "@mui/material";
import ArticuloInsumo from '../../../types/ArticuloInsumo';
import ArticuloManufacturado from '../../../types/ArticuloManufacturado';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ProductoView from './ProductoView';

interface ProductosProps {
    articulo: ArticuloInsumo | ArticuloManufacturado;
}

const ProductoCard: React.FC<ProductosProps> = ({ articulo }) => {
    const [open, setOpen] = useState(false);
    const [images, setImages] = useState<string[]>([]);

    const esArticuloManufacturado = (articulo: ArticuloInsumo | ArticuloManufacturado): articulo is ArticuloManufacturado => {
        return 'descripcion' in articulo;
    };

    const handleOpen = () => {
        setImages(articulo.imagenes.map(imagen => imagen.url));
        setOpen(true);
    } 

    const handleClose = () => {
        setOpen(false);
    } 

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
                <Box style={{ padding: '16px' }}>
                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                        ${articulo.precioVenta && articulo.precioVenta.toFixed(2)}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions style={{ justifyContent: 'space-between', padding: '0 16px 16px 16px' }}>
                {/* Aquí puedes agregar más botones o acciones si es necesario */}
            </CardActions>

            <ProductoView articulo={articulo} open={open} onClose={handleClose} images={images}/>
        </Card>
    );
}

export default ProductoCard;
