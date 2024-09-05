import 'bootstrap/dist/css/bootstrap.min.css';
import './VistaCiudadano.css';
import fondoNegro from '../assets/images/fondoNegroCarrousel.jpg';
import fondoMarron from '../assets/images/maderamarron.jpg';
import portada from '../assets/images/imgPortada.png';
import { useEffect, useState } from 'react';
import Sucursal from '../types/Sucursal';
import { SucursalGetByEmpresaId } from '../services/SucursalService';
import Categoria from '../types/Categoria';
import SucursalCard from '../components/iu/Sucursal/SucursalCard';
import { CategoriaAllByEcommerce } from '../services/CategoriaService';
import { useAuth0 } from '@auth0/auth0-react';
import { ClienteExist, ClienteGetByEmail } from '../services/ClienteService';
import { useAppDispatch } from '../redux/hook';
import { setCliente } from '../redux/slices/clienteSlice';
import { setUser } from '../redux/slices/userSlice';
import { Box } from '@mui/material';

const VistaCiudadano = () => {
    const [sucursales, setSucursales] = useState<Sucursal[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const { isAuthenticated, user } = useAuth0();
    const dispatch = useAppDispatch();

    const getAllCategorias = async () => {
        const categorias: Categoria[] = await CategoriaAllByEcommerce();
        setCategorias(categorias);
    };

    const getAllSucursal = async () => {
        const sucursales: Sucursal[] = await SucursalGetByEmpresaId(1);
        setSucursales(sucursales);
    };

    useEffect(() => {
        getAllSucursal();
        getAllCategorias();
        localStorage.removeItem('categoria');

        const clienteExist = async () => {
            if (user && user.email) {
                const cliente: boolean = await ClienteExist(user.email);
                dispatch(setCliente(cliente));
            }
        }

        const traerUser = async () => {
            if (user && user.email) {
                const usuario = await ClienteGetByEmail(user.email);
                dispatch(setUser(usuario));
            }
        }

        if (isAuthenticated && user) {
            clienteExist();
            traerUser();
        }
    }, []);

    const handleClick = (denominacion: string) => {
        localStorage.setItem('categoria', denominacion);
        window.location.href = '/sucursales';
        window.scrollTo(0, 0);
    };

    return (
        <>
            {/* Contenedor Principal */}
            <div style={{ width: '100%' }}>

                {/* Imagen Principal */}
                <div style={{ position: 'relative', width: '100%' }}>
                <img src={portada} alt="Imagen principal" style={{ width: '100%', height: 'auto' }} />
                    {/* Banner de Categorías */}
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: '-20px',
                            height: '80px',
                            width: '100%',
                            backgroundColor: '#233044',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            paddingLeft: '16px',
                            fontSize: '24px',
                            color: 'white',
                            fontWeight: 'bold',
                        }}
                    >
                        Categorías
                    </Box>
                </div>

                {/* Apartado de Carrusel */}
                <div
                    style={{
                        backgroundImage: `url(${fondoNegro})`,
                        backgroundSize: 'cover',
                        width: '100%',
                        height: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '20px',
                    }}
                >
                    <div
                        style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontFamily: 'Arial Black',
                        }}
                    >
                        <h1
                            style={{
                                lineHeight: '2.0',
                                letterSpacing: '0.15em',
                                color: 'white',
                                fontSize: '3rem',
                                textAlign: 'center',
                            }}
                        >
                            ¡ NUESTRAS<br /> VARIEDADES !
                        </h1>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            marginTop: '20px',
                            padding: '20px',
                            gap: '10px',
                        }}
                    >
                        {categorias.map((categoria) => (
                            <button
                                key={categoria.id}
                                style={{
                                    backgroundColor: '#3498db',
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
                    </div>
                </div>

                {/* Banner de Sucursales */}
                <Box sx={{
                    position: 'relative',
                    height: '80px',
                    width: '100%',
                    backgroundColor: '#233044',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingLeft: '16px',
                    zIndex: 100,
                    fontSize: '24px',
                    color: 'white',
                    fontWeight: 'bold',
                }}>
                    Sucursales
                </Box>
                {/* Tarjetas de Sucursales */}
                <div style={{ backgroundImage: `url(${fondoMarron})`, padding: '20px', height: 'auto' }}>
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '16px',
                            justifyContent: 'center',
                            marginTop: '16px',
                        }}
                    >
                        {sucursales.map((sucursal) => (
                            <SucursalCard key={sucursal.id} sucursal={sucursal} />
                        ))}
                    </div>
                </div>

            </div>


        </>
    );
};

export default VistaCiudadano;