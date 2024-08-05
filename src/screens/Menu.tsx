import { Box, IconButton, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useState } from "react";
import CategoriaGetDto from "../types/CategoriaGetDto";
import { CategoriaByEmpresaGetAll } from "../services/CategoriaService";
import { useAuth0 } from "@auth0/auth0-react";

const Menu = () => {
    const [categorias, setCategorias] = useState<CategoriaGetDto[]>([]);
    const { getAccessTokenSilently } = useAuth0();

    const getAllCategoriaBySucursal = async () => {
        const token = await getAccessTokenSilently({
            authorizationParams: {
                audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            },
        });
        const categorias: CategoriaGetDto[] = await CategoriaByEmpresaGetAll(1, token);
        setCategorias(categorias);
    };

    useEffect(() => {
        getAllCategoriaBySucursal();
    },);

    return (
        <Box mt={3} ml={3} mr={3} display="flex" alignItems="center">
            <Box padding={2} mr={2} flexBasis="15%" flexGrow={1} sx={{ border: "1px solid #c5c5c5", borderRadius: "15px" }}>
                <Typography variant="h6">Categorías {<IconButton><KeyboardArrowDownIcon /></IconButton>}</Typography>
                {
                    categorias.filter(categoria => !categoria.eliminado)
                        .map((categoria) => (
                            <ListItemButton component="a" href="#simple-list">
                                <ListItemText primary={categoria.denominacion} />
                            </ListItemButton>
                        ))
                }
            </Box>
            <Box padding={2} flexBasis="60%" flexGrow={2} mx={2} sx={{ border: "1px solid #c5c5c5", borderRadius: "20px" }}>
                <Typography variant="h6">Nombre de la Categoría</Typography>
            </Box>
            <Box padding={2} ml={2} flexBasis="25%" flexGrow={1} sx={{ border: "1px solid #c5c5c5", borderRadius: "20px" }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Mi pedido</Typography>
                <Stack direction="column" alignItems="center">
                    <SearchIcon sx={{ color: "grey", fontSize: 100 }} />
                    <Typography variant="body2">Tu pedido está vacio.</Typography>
                </Stack>
            </Box>
        </Box>
    );
}

export default Menu;
