import { Avatar, Box, IconButton, Modal, Typography } from "@mui/material";
import { useState } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Promocion from "../../../types/Promocion";
import PromocionDetalle from "../../../types/PromocionDetalle";
import CloseIcon from '@mui/icons-material/Close';

interface PromocionProps {
    promocion: Promocion;
    open: boolean;
    onClose: () => void;
    images: string[];
}

const PromocionView: React.FC<PromocionProps> = ({ promocion, open, onClose, images }) => {
    const [currentPromocion, setCurrentPromocion] = useState<Promocion>(promocion);
    const [detalles, setDetalles] = useState<PromocionDetalle[]>(promocion.promocionDetalles);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePreviousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const handleClose = () => {
        setCurrentPromocion(promocion);
        setDetalles(promocion.promocionDetalles);
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
                        {currentPromocion.denominacion}
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
                        Esta promo incluye:
                    </Typography>
                    {detalles.map((detalle) => (
                        <Box key={detalle.articulo.id} mb={1} ml={2} display="flex" alignItems="center">
                            <Avatar
                                src={detalle.articulo.imagenes[0].url}
                                alt={detalle.articulo.denominacion}
                                sx={{ width: 40, height: 40, marginRight: 1 }}
                            />
                            <Typography>
                                {detalle.cantidad} {detalle.articulo.denominacion}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Modal>
        </>
    );
}

export default PromocionView;