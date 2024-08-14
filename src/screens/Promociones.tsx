import { Box, Grid, MenuItem, Select, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Sucursal from "../types/Sucursal";
import { SucursalGetByEmpresaId } from "../services/SucursalService";
import HomeIcon from '@mui/icons-material/Home';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import SearchIcon from '@mui/icons-material/Search';
import Promocion from "../types/Promocion";
import { PromocionFindByEcommerce } from "../services/PromocionService";
import PromocionCard from "../components/iu/Promocion/PromocionCard";

const Promociones = () => {
    const [sucursales, setSucursales] = useState<Sucursal[]>([]);
    const [promociones, setPromociones] = useState<Promocion[]>([]);
    const [sucursalNombre, setCurrentSucursalNombre] = useState("");
    const [sucursalHorario, setCurrentSucursalHorario] = useState("");
    const [priceOrder, setPriceOrder] = useState("asc");

    const getAllSucursal = async () => {
        const sucursales: Sucursal[] = await SucursalGetByEmpresaId(1);
        setSucursales(sucursales);
    };

    const getAllPromociones = async () => {
        const promociones: Promocion[] = await PromocionFindByEcommerce();
        setPromociones(promociones);
    }

    const handlePriceOrderChange = (event: any) => {
        setPriceOrder(event.target.value);
    };

    const sortItemsByPrice = (items: any[]) => {
        return items.sort((a, b) =>
            priceOrder === "asc" ? a.precioPromocional - b.precioPromocional : b.precioPromocional - a.precioPromocional
        );
    };

    useEffect(() => {
        getAllSucursal();
        getAllPromociones();
        const sucursalNombre = localStorage.getItem('sucursalNombre');
        const sucursalHorario = localStorage.getItem('sucursalHorario');
        if (sucursalNombre && sucursalHorario) {
            setCurrentSucursalNombre(sucursalNombre);
            setCurrentSucursalHorario(sucursalHorario);
        }
    }, []);

    return (
        <>
            <Box mt={3} ml={3} borderRadius={2} bgcolor="#f5f5f5" boxShadow={2}>
                {
                    sucursalNombre !== "" && sucursalHorario !== "" ? (
                        <>
                            <Typography variant="h5" color="primary" display="flex" alignItems="center" gutterBottom>
                                <HomeIcon style={{ marginRight: '8px' }} /> {sucursalNombre}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" display="flex" alignItems="center">
                                <QueryBuilderIcon style={{ marginRight: '8px' }} /> {sucursalHorario}
                            </Typography>
                        </>
                    ) :
                        sucursales.filter(sucursal => sucursal.esCasaMatriz)
                            .map((sucursal) => (
                                <Box key={sucursal.id} mb={2}>
                                    <Typography variant="h5" color="primary" display="flex" alignItems="center" gutterBottom>
                                        <HomeIcon style={{ marginRight: '8px' }} /> {sucursal.nombre}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" display="flex" alignItems="center">
                                        <QueryBuilderIcon style={{ marginRight: '8px' }} /> {sucursal.horarioApertura} - {sucursal.horarioCierre}
                                    </Typography>
                                </Box>
                            ))
                }
            </Box>
            <Box mt={3} ml={3} mr={3} display="flex" alignItems="flex-start">
                <Box padding={2} flexBasis="50%" flexGrow={1} mx={2} sx={{ border: "1px solid #c5c5c5", borderRadius: "20px" }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Promociones</Typography>
                        <Select
                            value={priceOrder}
                            onChange={handlePriceOrderChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Ordenar por precio' }}
                            size="small"
                            sx={{ minWidth: 120 }}
                        >
                            <MenuItem value="asc">Precio: Menor a Mayor</MenuItem>
                            <MenuItem value="desc">Precio: Mayor a Menor</MenuItem>
                        </Select>
                    </Box>
                    <Grid container spacing={2}>
                        {sortItemsByPrice(promociones)
                            .map((promocion) => (
                                <Grid item xs={12} sm={6} key={promocion.id}>
                                    <PromocionCard promocion={promocion} />
                                </Grid>
                            ))}
                    </Grid>
                </Box>
                <Box padding={2} ml={2} flexBasis="25%" flexGrow={0} sx={{ border: "1px solid #c5c5c5", borderRadius: "20px" }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Mi pedido</Typography>
                    <Stack direction="column" alignItems="center">
                        <SearchIcon sx={{ color: "#b6bfbe", fontSize: 100 }} />
                        <Typography variant="body2">Tu pedido está vacío.</Typography>
                    </Stack>
                </Box>
            </Box>
        </>
    )
}

export default Promociones;