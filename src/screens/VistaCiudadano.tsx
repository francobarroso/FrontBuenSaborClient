import 'bootstrap/dist/css/bootstrap.min.css';
import './VistaCiudadano.css';
import fondoNegro from '../assets/images/fondoNegroCarrousel.jpg';
import fondoMarron from '../assets/images/maderamarron.jpg';
import portada from '../assets/images/imgPortada.png';
import { useEffect, useState } from 'react';
import Sucursal from '../types/Sucursal';
import { SucursalGetByEmpresaId } from '../services/SucursalService';
import CategoriaGetDto from '../types/CategoriaGetDto';
import { CategoriaByEcommerce } from '../services/CategoriaService';
import SucursalCard from '../components/iu/Sucursal/SucursalCard';

const VistaCiudadano = () => {
    const [sucursales, setSucursales] = useState<Sucursal[]>([]);
    const [categorias, setCategorias] = useState<CategoriaGetDto[]>([]);
    
    const getAllCategorias = async () => {
        const categorias: CategoriaGetDto[] = await CategoriaByEcommerce();
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
        localStorage.removeItem('sucursal');
    }, []);

    const handleClick = (denominacion: string) => {
        localStorage.setItem('categoria', denominacion);
        window.location.href = '/sucursales';
        window.scrollTo(0, 0);
    };

    return (
        <>
            {//IMAGEN PRINCIPAL
            }
            <div style={{ position: 'relative', width: '100%' }}>
                <img src={portada} alt="Imagen principal" style={{ height: 'auto', width: '100%' }} />
                {//banner de CATEGORIAS
                }
                <div style={{
                    position: 'absolute',
                    bottom: '-20px',
                    height: '80px',
                    width: '100%',
                    backgroundColor: '#233044',
                    borderTopLeftRadius: '20px',
                    borderTopRightRadius: '20px'
                }}>

                    <h1 style={{ marginTop: '20px', marginLeft: '30px', color: 'white', fontSize: '1.7rem', textAlign: 'left' }}>Categorías</h1>
                </div>
            </div>
            {//APARTADO DE CARROUSEL
            }
            <div style={{ backgroundImage: `url(${fondoNegro})`, backgroundSize: 'cover', width: '100%', height: '500px', display: 'flex', alignItems: 'center' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left', fontFamily: 'Arial Black' }}>
                    <h1 style={{ lineHeight: '2.0', letterSpacing: '0.15em', color: 'white', fontSize: '3rem', textAlign: 'center' }}>¡ NUESTRAS<br /> VARIEDADES !</h1>
                </div>

                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    marginTop: '20px',
                    padding: '20px',
                    gap: '10px',
                }}>
                    {categorias.map((categoria) => (
                        <button
                            key={categoria.id}
                            style={{
                                backgroundColor: '#3498db', // Color azulado
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
            {//banner de SUCURSALES
            }
            <div style={{
                bottom: '-30px',
                height: '80px',
                width: '100%',
                backgroundColor: '#233044',

                paddingTop: '25px', /* Espacio a la izquierda del texto */
                zIndex: 100 /* Asegura que el banner esté sobre el carrousel */

            }}>
                <h1 style={{ marginLeft: '30px', color: 'white', fontSize: '1.7rem', textAlign: 'left' }}>Sucursales</h1>
            </div>
            <div style={{backgroundImage: `url(${fondoMarron})`}}>

                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px',
                    justifyContent: 'center',
                    marginTop: '16px',
                    padding: '10px',
                }}>
                    {sucursales.map((sucursal) => (
                        <SucursalCard key={sucursal.id} sucursal={sucursal} />
                    ))}

                </div>

            </div>

        </>
    );
};

export default VistaCiudadano;