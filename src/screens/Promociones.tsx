import { Alert, Box, Grid, Link, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import Promocion from "../types/Promocion";
import { PromocionFindByEcommerce } from "../services/PromocionService";
import PromocionCard from "../components/iu/Promocion/PromocionCard";
import Carrito from "../components/iu/Carrito/Carrito";
import colorConfigs from "../configs/colorConfig";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { SucursalGetByEmpresaId } from "../services/SucursalService";
import { setSucursal } from "../redux/slices/sucursalSlice";

const Promociones = () => {
    const [promociones, setPromociones] = useState<Promocion[]>([]);
    const [priceOrder, setPriceOrder] = useState("asc");
    const { isAuthenticated } = useAuth0();
    const sucursalRedux = useAppSelector((state) => state.sucursal.sucursal);
    const clienteRedux = useAppSelector((state) => state.cliente.cliente);
    const dispatch = useAppDispatch();

    const getAllPromociones = async () => {
        if (sucursalRedux) {
            const promociones: Promocion[] = await PromocionFindByEcommerce(sucursalRedux.id);
            setPromociones(promociones);
        }
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
        const traerSucursal = async () => {
            const sucursales = await SucursalGetByEmpresaId(1);
            const sucursalMatriz = sucursales.find(sucursal => sucursal.esCasaMatriz);
            if (sucursalMatriz) dispatch(setSucursal(sucursalMatriz));
        }

        if (sucursalRedux === null) {
            traerSucursal();
        }

        getAllPromociones();
    }, [sucursalRedux]);

    return (
        <>
            <Box mt={3} ml={3} borderRadius={2} bgcolor="#f5f5f5" boxShadow={2}>
                <Box key={sucursalRedux?.id} mb={2}>
                    <Typography variant="h5" sx={{ ...colorConfigs.textStyles }} display="flex" alignItems="center" gutterBottom>
                        <HomeIcon style={{ marginRight: '8px' }} /> {sucursalRedux?.nombre}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" display="flex" alignItems="center">
                        <QueryBuilderIcon style={{ marginRight: '8px' }} /> {sucursalRedux?.horarioApertura} - {sucursalRedux?.horarioCierre}
                    </Typography>
                </Box>
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
                    {promociones.length === 0 && (
                        <Grid item xs={12}>
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                height="80px"
                            >
                                <Typography variant="body1" sx={{ fontWeight: "bold" }}>No hay promociones disponibles</Typography>
                            </Box>
                        </Grid>
                    )}
                    <Grid container spacing={2}>
                        {sortItemsByPrice(promociones)
                            .map((promocion) => (
                                <Grid item xs={12} sm={6} key={promocion.id}>
                                    <PromocionCard promocion={promocion} cliente={clienteRedux} />
                                </Grid>
                            ))}
                    </Grid>
                </Box>
                <Box padding={2} ml={2} flexBasis="25%" flexGrow={0} sx={{ border: "1px solid #c5c5c5", borderRadius: "20px" }}>
                    <Carrito />
                    {!isAuthenticated && (
                        <Box mt={2}>
                            <Alert variant="outlined" severity="info">
                                Para realizar pedidos debe tener<br />una cuenta en el sistema.
                            </Alert>
                        </Box>
                    )}
                    {isAuthenticated && !clienteRedux && (
                        <Box mt={2}>
                            <Alert variant="outlined" severity="warning">
                                Para realizar pedidos termine de<br />completar su <Link href="/registro" underline="hover">registro</Link>.
                            </Alert>
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    )
}

export default Promociones;