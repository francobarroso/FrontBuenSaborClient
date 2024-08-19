import { Box, Button, Modal, Typography } from "@mui/material";
import colorConfigs from "../../../configs/colorConfig";
import Cliente from "../../../types/Cliente";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

interface PedidoProps {
    cliente: Cliente;
    open: boolean;
    onClose: () => void;
}

const RegistroModal: React.FC<PedidoProps> = ({ cliente, open, onClose }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '40%',
                    maxWidth: 500,
                    maxHeight: '80vh',
                    overflow: 'auto',
                    bgcolor: 'background.paper',
                    p: 4,
                    borderRadius: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',  // Center align items horizontally
                    justifyContent: 'center', // Center align items vertically
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                        width: '100%',
                    }}
                >
                    <VerifiedUserIcon 
                        sx={{
                            color: "#233044",
                            fontSize: 60, // Adjust the size of the icon here
                        }} 
                    />
                </Box>
                <Typography variant="h4" gutterBottom align="center">
                    ¡Hola {cliente.nombre}!
                </Typography>
                <Typography variant="h6" gutterBottom align="center">
                    Te registraste correctamente en el Buen Sabor.
                </Typography>
                <Box mt={2}>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            py: 1.5, fontWeight: 'bold', ...colorConfigs.buttonStyles
                        }}
                        onClick={onClose}
                    >
                        Ir al Inicio
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default RegistroModal;
