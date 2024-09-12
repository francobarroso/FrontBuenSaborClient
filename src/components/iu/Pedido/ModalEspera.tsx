import React from 'react';
import { Modal, Box, Typography, CircularProgress } from '@mui/material';

interface ModalEsperaProps {
    open: boolean;
}

const ModalEspera: React.FC<ModalEsperaProps> = ({ open }) => (
    <Modal
        open={open}
        aria-labelledby="modal-espera-title"
        aria-describedby="modal-espera-description"
    >
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            bgcolor="rgba(255, 255, 255, 0.9)"
            p={4}
            borderRadius={2}
        >
            <CircularProgress />
            <Typography variant="h6" id="modal-espera-title" mt={2}>
                Generando botón de pago, por favor espere...
            </Typography>
        </Box>
    </Modal>
);

export default ModalEspera;