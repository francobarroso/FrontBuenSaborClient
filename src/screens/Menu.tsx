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

const Menu = () => {
    const [categorias, setCategorias] = useState<CategoriaGetDto[]>([]);
    const [insumos, setInsumos] = useState<ArticuloInsumo[]>([]);
    const [manufacturados, setManufacturado] = useState<ArticuloManufacturado[]>([]);
    const [currentCategoria, setCurrentCategoria] = useState("Todas");
    const [priceOrder, setPriceOrder] = useState("asc"); // Estado para el orden de precios

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
        const storedData = localStorage.getItem('categoria');
        if (storedData) {
            setCurrentCategoria(storedData);
            localStorage.removeItem('categoria');
        }
    }, []);

    return (
        <Box mt={3} ml={3} mr={3} display="flex" alignItems="flex-start">
            <Box padding={2} mr={2} flexBasis="18%" flexGrow={0} sx={{ border: "1px solid #c5c5c5", borderRadius: "15px" }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Categorías {<IconButton><KeyboardArrowDownIcon /></IconButton>}</Typography>
                <ListItemButton
                    component="a"
                    href="#simple-list"
                    onClick={() => setCategoria("Todas")}
                    selected={currentCategoria === "Todas"}
                    sx={{ fontSize: "14px" }}
                >
                    <ListItemText primary="Todas" />
                </ListItemButton>
                {categorias.filter(categoria => !categoria.eliminado)
                    .map((categoria) => (
                        <ListItemButton
                            component="a"
                            href="#simple-list"
                            key={categoria.id}
                            onClick={() => setCategoria(categoria.denominacion)}
                            selected={currentCategoria === categoria.denominacion}
                            sx={{ fontSize: "14px" }}
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
    );
}

export default Menu;
