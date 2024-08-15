import { Box, IconButton, Modal, Typography } from "@mui/material";
import ArticuloInsumo from "../../../types/ArticuloInsumo";
import ArticuloManufacturado from "../../../types/ArticuloManufacturado";
import { useState } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';

interface ProductosProps {
    articulo: ArticuloInsumo | ArticuloManufacturado;
    open: boolean;
    onClose: () => void;
    images: string[];
}

const ProductoView: React.FC<ProductosProps> = ({ articulo, open, onClose, images }) => {
    const [currentArticulo, setCurrentArticulo] = useState<ArticuloInsumo | ArticuloManufacturado>(articulo);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePreviousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const esArticuloManufacturado = (articulo: ArticuloInsumo | ArticuloManufacturado): articulo is ArticuloManufacturado => {
        return 'descripcion' in articulo;
    };

    const handleClose = () => {
        setCurrentArticulo(articulo);
        onClose();
    }

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '40%', // Ancho del modal
                        maxWidth: 800, // Máximo ancho del modal
                        maxHeight: '80vh',
                        overflow: 'auto',
                        bgcolor: 'background.paper',
                        p: 4,
                        borderRadius: 8, // Borde redondeado del modal
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h5" gutterBottom align="center">
                        {currentArticulo.denominacion}
                    </Typography>
                    {images.length > 0 && (
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <IconButton onClick={handlePreviousImage} disabled={images.length <= 1}>
                                <ArrowBackIosIcon />
                            </IconButton>
                            <img
                                src={images[currentImageIndex]}
                                alt={`Imagen ${currentImageIndex}`}
                                style={{ maxWidth: '40%', marginTop: '10px', borderRadius: 8 }}
                            />
                            <IconButton onClick={handleNextImage} disabled={images.length <= 1}>
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </Box>
                    )}
                    <Typography mt={1} variant="h6" gutterBottom align="left">
                        Descripcion:
                    </Typography>
                    <Typography variant="body2" gutterBottom align="left">
                        {esArticuloManufacturado(articulo) ? articulo.descripcion : '...'}
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}

export default ProductoView;