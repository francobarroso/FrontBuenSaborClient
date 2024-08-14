import { Box, Typography } from "@mui/material";
import CategoriaGetDto from "../types/CategoriaGetDto";
import { useEffect, useState } from "react";
import { CategoriaByEcommerce } from "../services/CategoriaService";
import fondoNegro from '../assets/images/fondoNegroCarrousel.jpg';
import Sucursal from "../types/Sucursal";
import { SucursalGetByEmpresaId } from "../services/SucursalService";
import SucursalCard from "../components/iu/Sucursal/SucursalCard";

const Sucursales = () => {
    const [categorias, setCategorias] = useState<CategoriaGetDto[]>([]);
    const [sucursales, setSucursales] = useState<Sucursal[]>([]);
    const [currentCategoria, setCurrentCategoria] = useState("Todas");

    const getAllCategorias = async () => {
        const categorias: CategoriaGetDto[] = await CategoriaByEcommerce();
        setCategorias(categorias);
    };

    const getAllSucursal = async () => {
        const sucursales: Sucursal[] = await SucursalGetByEmpresaId(1);
        setSucursales(sucursales);
    };

    const handleClick = (denominacion: string) => {
        localStorage.setItem('categoria', denominacion);
        setCurrentCategoria(denominacion);
    };

    useEffect(() => {
        getAllCategorias();
        getAllSucursal();
        const categoria = localStorage.getItem('categoria');
        if (categoria) {
            setCurrentCategoria(categoria);
        }
    }, []);

    const filteredSucursales = currentCategoria === "Todas"
        ? sucursales
        : sucursales.filter(sucursal =>
            categorias.some(categoria =>
                categoria.denominacion === currentCategoria &&
                categoria.sucursales?.some(suc => suc.id === sucursal.id)
            )
        );

    return (
        <Box
            sx={{
                backgroundImage: `url(${fondoNegro})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                p: 3,
            }}
        >
            <Typography
                variant="h2"
                sx={{
                    color: 'white',
                    mb: 4,
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                }}
            >
                Categorías
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2, // Espacio entre botones
                    justifyContent: 'center',
                }}
            >
                {categorias.map((categoria) => (
                    <button
                        key={categoria.id}
                        style={{
                            backgroundColor: categoria.denominacion === currentCategoria ? '#2c3e50' : '#3498db',
                            border: 'none',
                            borderRadius: '20px',
                            color: 'white',
                            padding: '10px 20px',
                            fontSize: '1.2rem',
                            cursor: 'pointer',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            transition: 'background-color 0.3s ease',
                        }}
                        onClick={() => handleClick(categoria.denominacion)}
                    >
                        {categoria.denominacion}
                    </button>
                ))}
            </Box>
            <Typography
                variant="h4"
                sx={{
                    color: 'white',
                    mt: 6,
                    mb: 4,
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                }}
            >
                Sucursales
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px',
                    justifyContent: 'center',
                    padding: '10px',
                }}
            >
                {filteredSucursales.map((sucursal) => (
                    <SucursalCard key={sucursal.id} sucursal={sucursal} />
                ))}
            </Box>
        </Box>
    );
};

export default Sucursales;
