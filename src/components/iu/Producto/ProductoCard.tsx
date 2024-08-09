import React from 'react';
import { Card, CardActions, CardMedia, CardContent, Typography, Grid, Box, IconButton } from "@mui/material";
import ArticuloInsumo from '../../../types/ArticuloInsumo';
import ArticuloManufacturado from '../../../types/ArticuloManufacturado';
import StarIcon from '@mui/icons-material/Star';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface ProductosProps {
    articulo: ArticuloInsumo | ArticuloManufacturado;
    esMasVendido?: boolean;
}

const ProductoCard: React.FC<ProductosProps> = ({ articulo, esMasVendido }) => {

    const esArticuloManufacturado = (articulo: ArticuloInsumo | ArticuloManufacturado): articulo is ArticuloManufacturado => {
        return 'descripcion' in articulo;
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
            {esMasVendido && (
                <Box style={{ position: 'absolute', top: '8px', left: '8px', backgroundColor: '#ffefef', borderRadius: '4px', padding: '4px 8px' }}>
                    <Typography variant="caption" style={{ fontWeight: 'bold', color: '#d32f2f' }}>
                        <StarIcon style={{ fontSize: '16px', marginRight: '4px' }} />
                        MÁS VENDIDO
                    </Typography>
                </Box>
            )}
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
                        <Typography variant="body2" color="primary" style={{ marginTop: '8px', fontWeight: 'bold' }}>
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
        </Card>
    );
}

export default ProductoCard;
