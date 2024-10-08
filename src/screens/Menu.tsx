import { Alert, Box, Grid, IconButton, Link, ListItemButton, ListItemText, MenuItem, Select, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useState } from "react";
import CategoriaGetDto from "../types/CategoriaGetDto";
import { CategoriaByEcommerce } from "../services/CategoriaService";
import ProductoCard from "../components/iu/Producto/ProductoCard";
import ArticuloInsumo from "../types/ArticuloInsumo";
import { ArticuloInsumoFindByEcommerce } from "../services/ArticuloInsumoService";
import ArticuloManufacturado from "../types/ArticuloManufacturado";
import { ArticuloManufacturadosFindByEcommerce } from "../services/ArticuloManufacturadoService";
import HomeIcon from '@mui/icons-material/Home';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import Carrito from "../components/iu/Carrito/Carrito";
import colorConfigs from "../configs/colorConfig";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { SucursalGetByEmpresaId } from "../services/SucursalService";
import { setSucursal } from "../redux/slices/sucursalSlice";

const Menu = () => {
    const [categorias, setCategorias] = useState<CategoriaGetDto[]>([]);
    const [insumos, setInsumos] = useState<ArticuloInsumo[]>([]);
    const [manufacturados, setManufacturado] = useState<ArticuloManufacturado[]>([]);
    const [currentCategoria, setCurrentCategoria] = useState("Todas");
    const [priceOrder, setPriceOrder] = useState("asc");
    const { isAuthenticated } = useAuth0();
    const sucursalRedux = useAppSelector((state) => state.sucursal.sucursal);
    const clienteRedux = useAppSelector((state) => state.cliente.cliente);
    const dispatch = useAppDispatch();

    const getAllCategorias = async () => {
        if (sucursalRedux) {
            const categorias: CategoriaGetDto[] = await CategoriaByEcommerce(sucursalRedux.id);
            if (categorias.length === 0) setCurrentCategoria("");
            setCategorias(categorias);
        }
    };

    const getAllInsumos = async () => {
        const insumos: ArticuloInsumo[] = await ArticuloInsumoFindByEcommerce();
        setInsumos(insumos);
    };

    const getAllManufacturados = async () => {
        const manufacturados: ArticuloManufacturado[] = await ArticuloManufacturadosFindByEcommerce();
        setManufacturado(manufacturados);
    };

    const setCategoria = (denominacion: string) => {
        localStorage.setItem('categoria', denominacion);
        setCurrentCategoria(denominacion);
    };

    const handlePriceOrderChange = (event: any) => {
        setPriceOrder(event.target.value);
    };

    const sortItemsByPrice = (items: any[]) => {
        return items.sort((a, b) =>
            priceOrder === "asc" ? a.precioVenta - b.precioVenta : b.precioVenta - a.precioVenta
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

        getAllCategorias();
        getAllInsumos();
        getAllManufacturados();
        let categoria = localStorage.getItem('categoria');
        if (categoria) {
            setCurrentCategoria(categoria);
        }
    }, [sucursalRedux]);

    return (
        <>
            <Box mt={3} ml={3} borderRadius={2} bgcolor="#f5f5f5" boxShadow={2}>
                <Typography variant="h5" sx={{ ...colorConfigs.textStyles }} display="flex" alignItems="center" gutterBottom>
                    <HomeIcon style={{ marginRight: '8px' }} />{sucursalRedux?.nombre}
                </Typography>
                <Typography variant="body2" color="textSecondary" display="flex" alignItems="center">
                    <QueryBuilderIcon style={{ marginRight: '8px' }} /> {sucursalRedux?.horarioApertura} - {sucursalRedux?.horarioCierre}
                </Typography>
            </Box>
            <Box mt={3} ml={3} mr={3} display="flex" alignItems="flex-start">
                <Box padding={2} mr={2} flexBasis="18%" flexGrow={0} sx={{ border: "1px solid #c5c5c5", borderRadius: "15px" }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Categorías {<IconButton><KeyboardArrowDownIcon /></IconButton>}</Typography>
                    <ListItemButton
                        component="a"
                        href="#simple-list"
                        hidden={categorias.length === 0}
                        onClick={() => setCategoria("Todas")}
                        sx={{ fontSize: "14px", color: currentCategoria === "Todas" ? "#415a81" : "defaultColor" }}
                    >
                        <ListItemText primary="Todas" />
                    </ListItemButton>
                    {categorias.filter(categoria => !categoria.eliminado)
                        .map((categoria) => (
                            <ListItemButton
                                component="a"
                                key={categoria.id}
                                onClick={() => setCategoria(categoria.denominacion)}
                                selected={currentCategoria === categoria.denominacion}
                                sx={{ fontSize: "14px", color: currentCategoria === categoria.denominacion ? "#415a81" : "defaultColor" }}
                            >
                                <ListItemText primary={categoria.denominacion} />
                            </ListItemButton>
                        ))
                    }
                </Box>
                <Box padding={2} flexBasis="50%" flexGrow={1} mx={2} sx={{ border: "1px solid #c5c5c5", borderRadius: "20px" }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{currentCategoria}</Typography>
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
                        {categorias.length === 0 && (
                            <Grid item xs={12}>
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    height="80px"
                                >
                                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>No hay productos disponibles</Typography>
                                </Box>
                            </Grid>
                        )}
                        {sortItemsByPrice(manufacturados
                            .filter(manufacturado => currentCategoria === "Todas" || manufacturado.categoria.denominacion === currentCategoria))
                            .map((manufacturado) => (
                                <Grid item xs={12} sm={6} key={manufacturado.id}>
                                    <ProductoCard articulo={manufacturado} cliente={clienteRedux} />
                                </Grid>
                            ))}
                        {sortItemsByPrice(insumos
                            .filter(insumo => currentCategoria === "Todas" || insumo.categoria.denominacion === currentCategoria))
                            .map((insumo) => (
                                <Grid item xs={12} sm={6} key={insumo.id}>
                                    <ProductoCard articulo={insumo} cliente={clienteRedux} />
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

    );
}

export default Menu;