import { Box, Grid, IconButton, ListItemButton, ListItemText, MenuItem, Select, Stack, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useState } from "react";
import CategoriaGetDto from "../types/CategoriaGetDto";
import { CategoriaByEcommerce } from "../services/CategoriaService";
import ProductoCard from "../components/iu/Producto/ProductoCard";
import ArticuloInsumo from "../types/ArticuloInsumo";
import { ArticuloInsumoFindByEcommerce } from "../services/ArticuloInsumoService";
import ArticuloManufacturado from "../types/ArticuloManufacturado";
import { ArticuloManufacturadosFindByEcommerce } from "../services/ArticuloManufacturadoService";
import { SucursalGetByEmpresaId } from "../services/SucursalService";
import Sucursal from "../types/Sucursal";
import HomeIcon from '@mui/icons-material/Home';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';

const Menu = () => {
    const [sucursales, setSucursales] = useState<Sucursal[]>([]);
    const [categorias, setCategorias] = useState<CategoriaGetDto[]>([]);
    const [insumos, setInsumos] = useState<ArticuloInsumo[]>([]);
    const [manufacturados, setManufacturado] = useState<ArticuloManufacturado[]>([]);
    const [currentCategoria, setCurrentCategoria] = useState("Todas");
    const [priceOrder, setPriceOrder] = useState("asc");
    const [sucursalNombre, setCurrentSucursalNombre] = useState("");
    const [sucursalHorario, setCurrentSucursalHorario] = useState("");

    const getAllSucursal = async () => {
        const sucursales: Sucursal[] = await SucursalGetByEmpresaId(1);
        setSucursales(sucursales);
    };

    const getAllCategorias = async () => {
        const categorias: CategoriaGetDto[] = await CategoriaByEcommerce();
        setCategorias(categorias);
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
        getAllCategorias();
        getAllInsumos();
        getAllManufacturados();
        getAllSucursal();
        const categoria = localStorage.getItem('categoria');
        if (categoria) {
            setCurrentCategoria(categoria);
        }

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
                            <Typography variant="h5" sx={{color: "#415a81"}} display="flex" alignItems="center" gutterBottom>
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
                                    <Typography variant="h5" sx={{color: "#415a81"}} display="flex" alignItems="center" gutterBottom>
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
                <Box padding={2} mr={2} flexBasis="18%" flexGrow={0} sx={{ border: "1px solid #c5c5c5", borderRadius: "15px" }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Categorías {<IconButton><KeyboardArrowDownIcon /></IconButton>}</Typography>
                    <ListItemButton
                        component="a"
                        href="#simple-list"
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
                        {sortItemsByPrice(manufacturados
                            .filter(manufacturado => currentCategoria === "Todas" || manufacturado.categoria.denominacion === currentCategoria))
                            .map((manufacturado) => (
                                <Grid item xs={12} sm={6} key={manufacturado.id}>
                                    <ProductoCard articulo={manufacturado} />
                                </Grid>
                            ))}
                        {sortItemsByPrice(insumos
                            .filter(insumo => currentCategoria === "Todas" || insumo.categoria.denominacion === currentCategoria))
                            .map((insumo) => (
                                <Grid item xs={12} sm={6} key={insumo.id}>
                                    <ProductoCard articulo={insumo} />
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

    );
}

export default Menu;