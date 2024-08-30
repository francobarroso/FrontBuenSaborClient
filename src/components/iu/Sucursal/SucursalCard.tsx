import React, { useEffect } from 'react';
import { Card, CardContent, Typography, CardActionArea, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Sucursal from '../../../types/Sucursal';
import sucursalImage from '../../../assets/images/sucursal.png';
import { useAppDispatch } from '../../../redux/hook';
import { setSucursal } from '../../../redux/slices/sucursalSlice';

interface SucursalCardProps {
    sucursal: Sucursal;
}

const SucursalCard: React.FC<SucursalCardProps> = ({ sucursal }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(setSucursal(sucursal));
        navigate('/menu');
        window.scrollTo(0, 0);
    };

    useEffect(()=>{
        localStorage.removeItem('sucursal');
    });

    return (
        <Card
            sx={{
                backgroundColor: '#F2E4D7',
                borderRadius: '16px', // Ajusta el radio del borde según tus necesidades
            }}
        >
            <CardActionArea onClick={handleClick}>
                <CardMedia
                    component="img"
                    height="140"
                    image={sucursalImage}
                    alt="Sucursal"
                />
                <CardContent>
                    <Typography variant="h6" component="div">
                        {sucursal.nombre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {sucursal.domicilio.calle} {sucursal.domicilio.numero}, {sucursal.domicilio.localidad?.nombre}, {sucursal.domicilio.localidad?.provincia.nombre}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default SucursalCard;
