import { Box, Button, FormControl, FormHelperText, Grid, MenuItem, Select, SelectChangeEvent, TextField, Tooltip, Typography } from "@mui/material";
import { PaisGetAll } from "../services/PaisService";
import { LocalidadGetAll } from "../services/LocalidadService";
import { ProvinciaGetAll } from "../services/ProvinciaService";
import Pais from "../types/Pais";
import Provincia from "../types/Provincia";
import Localidad from "../types/Localidad";
import { useEffect, useState } from "react";
import { Rol } from "../types/enums/Rol";
import Cliente from "../types/Cliente";
import Domicilio from "../types/Domicilio";
import { useAuth0 } from "@auth0/auth0-react";
import { ClienteCreate } from "../services/ClienteService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import colorConfigs from "../configs/colorConfig";
import { useNavigate } from "react-router-dom";
import RegistroModal from "../components/iu/Registro/RegistroModal";

const domicilioEmpty = { id: 0, eliminado: false, calle: '', numero: null, cp: null, piso: null, nroDpto: null, localidad: { id: 0, eliminado: false, nombre: '', provincia: { id: 0, eliminado: false, nombre: '', pais: { id: 0, eliminado: false, nombre: '' } } } };
const usuarioEmpty = { id: null, eliminado: false, auth0Id: '', email: '', rol: Rol.CLIENTE }
const clienteEmpty = { id: null, eliminado: false, nombre: null, apellido: null, telefono: null, fechaNacimiento: null, usuario: usuarioEmpty, domicilios: [] }

const Registro = () => {
    const [cliente, setCliente] = useState<Cliente>(clienteEmpty);
    const [domicilios, setDomicilios] = useState<Domicilio[]>([domicilioEmpty]);
    const [paises, setPaises] = useState<Pais[]>([]);
    const [provincias, setProvincias] = useState<Provincia[]>([]);
    const [localidades, setLocalidades] = useState<Localidad[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const { user, isAuthenticated } = useAuth0();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const createCliente = async () => {
        return await ClienteCreate(cliente);
    }

    const getAllPaises = async () => {
        const paises: Pais[] = await PaisGetAll();
        setPaises(paises);
    }

    const getAllProvincias = async () => {
        const provincias: Provincia[] = await ProvinciaGetAll();
        setProvincias(provincias);
    }

    const getAllLocalidades = async () => {
        const localidades: Localidad[] = await LocalidadGetAll();
        setLocalidades(localidades);
    }

    const validate = (): boolean => {
        const newErrors: { [key: string]: string } = {};
        if (!cliente.nombre) {
            newErrors.nombre = 'El nombre es obligatorio';
        }
        if (!cliente.apellido) {
            newErrors.apellido = 'El apellido es obligatorio';
        }
        if (!cliente.telefono) {
            newErrors.telefono = 'El telefono es obligatorio';
        }
        if (!cliente.fechaNacimiento) {
            newErrors.fechaNacimiento = 'La fecha de nacimiento es obligatoria';
        }
        if (cliente.domicilios.some(domicilio => domicilio.localidad.id === 0)) {
            newErrors.localidad = "Seleccione una localidad";
        }
        if (cliente.domicilios.some(domicilio => domicilio.localidad.provincia.id === 0)) {
            newErrors.provincia = "Seleccione una provincia";
        }
        if (cliente.domicilios.some(domicilio => domicilio.localidad.provincia.pais.id === 0)) {
            newErrors.pais = "Seleccione un país";
        }
        if (cliente.domicilios.some(domicilio => !domicilio.calle)) {
            newErrors.calle = "La calle es obligatoria";
        }
        if (cliente.domicilios.some(domicilio => !domicilio.numero)) {
            newErrors.numero = "El número es obligatorio";
        }
        if (cliente.domicilios.some(domicilio => !domicilio.cp)) {
            newErrors.cp = "El código postal es obligatorio";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numericFields = ["telefono"];
        const maxLength: Record<string, number> = {
            nombre: 25,
            apellido: 25,
            telefono: 10,
        };

        if (value.length > maxLength[name]) {
            return;
        }

        if (numericFields.includes(name) && !/^[0-9]*$/.test(value)) {
            return;
        }

        setCliente(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleDomiciliosChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const numericFields = ["numero", "cp", "piso", "nroDpto"];
        const maxLength: Record<string, number> = {
            calle: 25,
            numero: 5,
            cp: 5,
            piso: 3,
            nroDpto: 3
        };

        if (value.length > maxLength[name]) {
            return;
        }

        if (numericFields.includes(name) && !/^[0-9]*$/.test(value)) {
            return;
        }

        const newDomicilios = [...domicilios];
        newDomicilios[index] = { ...newDomicilios[index], [name]: value };
        setDomicilios(newDomicilios);

        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleQuitarDomicilio = (index: number) => {
        const domiciliosExistentes = [...domicilios];
        domiciliosExistentes.splice(index, 1);
        setDomicilios(domiciliosExistentes);
    }

    const agregarDomicilio = () => {
        setDomicilios([...domicilios, domicilioEmpty]);
    };

    const handlePaisChange = (index: number, e: SelectChangeEvent<number>) => {
        const paisId = e.target.value as number;

        setDomicilios(prevDomicilios => {
            const newDomicilios = [...prevDomicilios];
            newDomicilios[index] = {
                ...newDomicilios[index],
                localidad: {
                    ...newDomicilios[index].localidad,
                    provincia: {
                        ...newDomicilios[index].localidad.provincia,
                        pais: {
                            ...newDomicilios[index].localidad.provincia.pais,
                            id: paisId
                        }
                    }
                }
            };
            return newDomicilios;
        });

        if (errors.pais) {
            setErrors(prev => ({
                ...prev,
                pais: ''
            }));
        }
    }

    const handleProvinciaChange = async (index: number, e: SelectChangeEvent<number>) => {
        const provinciaId = e.target.value as number;
        setDomicilios(prevDomicilios => {
            const newDomicilios = [...prevDomicilios];
            newDomicilios[index] = {
                ...newDomicilios[index],
                localidad: {
                    ...newDomicilios[index].localidad,
                    provincia: {
                        ...newDomicilios[index].localidad.provincia,
                        id: provinciaId
                    }
                }
            };
            return newDomicilios;
        });

        if (errors.provincia) {
            setErrors(prev => ({
                ...prev,
                provincia: ''
            }));
        }
    }

    const handleLocalidadChange = (index: number, e: SelectChangeEvent<number>) => {
        const localidadId = e.target.value as number;
        setDomicilios(prevDomicilios => {
            const newDomicilios = [...prevDomicilios];
            newDomicilios[index] = {
                ...newDomicilios[index],
                localidad: {
                    ...newDomicilios[index].localidad,
                    id: localidadId
                }
            };
            return newDomicilios;
        });

        if (errors.localidad) {
            setErrors(prev => ({
                ...prev,
                localidad: ''
            }));
        }
    }

    const handleSubmit = async () => {
        cliente.domicilios = domicilios;

        if (!validate()) {
            return;
        }

        if (user && cliente.usuario) {
            cliente.usuario.email = user.name ?? null;
            const auth0Id = isAuthenticated && user?.sub ? user.sub.replace("auth0|", "") : "";
            cliente.usuario.auth0Id = auth0Id;
        }

        const data = await createCliente();
        if (data.status !== 200) {
            toast.error("Error al registrar, intete más tarde", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
            return;
        }else{
            setOpen(true);
        }
    }

    const handleClose = () => {
        navigate("/");
    }

    useEffect(() => {
        getAllPaises();
        getAllProvincias();
        getAllLocalidades();
    }, []);

    return (
        <>
            <Box mt={3} ml={3} mr={3}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }} mb={3}>Formulario de Registro</Typography>
                <Box padding={2} borderRadius={3} bgcolor="#f5f5f5" sx={{ border: "1px solid #c5c5c5" }} mb={2}>
                    <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
                        Información Personal
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <FormControl fullWidth error={!!errors.nombre}>
                                <TextField
                                    label="Nombre"
                                    name="nombre"
                                    value={cliente.nombre}
                                    fullWidth
                                    onChange={handleChange}
                                />
                                {errors.nombre && <FormHelperText>{errors.nombre}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth error={!!errors.apellido}>
                                <TextField
                                    label="Apellido"
                                    name="apellido"
                                    value={cliente.apellido}
                                    fullWidth
                                    onChange={handleChange}
                                />
                                {errors.apellido && <FormHelperText>{errors.apellido}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth error={!!errors.telefono}>
                                <TextField
                                    label="Teléfono"
                                    name="telefono"
                                    value={cliente.telefono}
                                    fullWidth
                                    onChange={handleChange}
                                    onInput={(e) => {
                                        const input = e.target as HTMLInputElement;
                                        input.value = input.value.replace(/[^0-9]/g, '');
                                    }}
                                    inputProps={{
                                        inputMode: 'numeric',
                                        pattern: '[0-9]*',
                                        min: 0
                                    }}
                                />
                                {errors.telefono && <FormHelperText>{errors.telefono}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth error={!!errors.fechaNacimiento}>
                                <TextField
                                    type="date"
                                    label="Fecha Nacimiento"
                                    name="fechaNacimiento"
                                    value={cliente.fechaNacimiento}
                                    fullWidth
                                    variant="outlined"
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                {errors.fechaNacimiento && <FormHelperText>{errors.fechaNacimiento}</FormHelperText>}
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
                <Box padding={2} pt={0} borderRadius={3} bgcolor="#f5f5f5" sx={{ border: "1px solid #c5c5c5" }}>
                    <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
                        <Typography mr={2} variant="h6">Agregar Domicilio/s</Typography>
                        <Button variant="contained" onClick={agregarDomicilio} sx={{ ...colorConfigs.buttonStyles }}>
                            <DataSaverOnIcon /> Nuevo
                        </Button>
                    </Box>
                    {domicilios.map((domicilio, index) => (
                        <Box key={index}>
                            <Grid container spacing={2} mt={2}>
                                <Grid item xs={4}>
                                    <FormControl fullWidth error={!!errors.pais}>
                                        <Select
                                            fullWidth
                                            value={domicilio.localidad?.provincia.pais.id || ''}
                                            onChange={(e) => handlePaisChange(index, e)}
                                            displayEmpty
                                        >
                                            <MenuItem value="" disabled>Seleccione un País</MenuItem>
                                            {paises.map(pais => (
                                                <MenuItem key={pais.id} value={pais.id}>
                                                    {pais.nombre}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.pais && domicilio.localidad.provincia.pais.id === 0 && <FormHelperText>{errors.pais}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl fullWidth error={!!errors.provincia}>
                                        <Select
                                            fullWidth
                                            value={domicilio.localidad?.provincia.id || ''}
                                            onChange={(e) => handleProvinciaChange(index, e)}
                                            displayEmpty
                                            disabled={!domicilio.localidad?.provincia.pais.id}
                                        >
                                            <MenuItem value="" disabled>Seleccione una Provincia</MenuItem>
                                            {provincias.map(provincia => (
                                                <MenuItem key={provincia.id} value={provincia.id}>
                                                    {provincia.nombre}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.provincia && domicilio.localidad.provincia.id === 0 && <FormHelperText>{errors.provincia}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl fullWidth error={!!errors.localidad}>
                                        <Select
                                            fullWidth
                                            value={domicilio.localidad?.id || ''}
                                            onChange={(e) => handleLocalidadChange(index, e)}
                                            displayEmpty
                                            disabled={!domicilio.localidad?.provincia.id}
                                        >
                                            <MenuItem value="" disabled>Seleccione una Localidad</MenuItem>
                                            {localidades
                                                .filter((localidad) => localidad.provincia.id === domicilio.localidad.provincia.id)
                                                .map(localidad => (
                                                    <MenuItem key={localidad.id} value={localidad.id}>
                                                        {localidad.nombre}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                        {errors.localidad && domicilio.localidad.id === 0 && <FormHelperText>{errors.localidad}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} mt={2} key={index} alignItems="center">
                                <Grid item xs={3}>
                                    <FormControl fullWidth error={!!errors.calle}>
                                        <TextField
                                            label="Calle"
                                            name="calle"
                                            fullWidth
                                            value={domicilio.calle}
                                            onChange={(e) => handleDomiciliosChange(index, e)}
                                        />
                                        {errors.calle && domicilio.calle === '' && <FormHelperText>{errors.calle}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={2}>
                                    <FormControl error={!!errors.numero}>
                                        <TextField
                                            label="Número"
                                            name="numero"
                                            fullWidth
                                            value={domicilio.numero}
                                            onChange={(e) => handleDomiciliosChange(index, e)}
                                            onInput={(e) => {
                                                const input = e.target as HTMLInputElement;
                                                input.value = input.value.replace(/[^0-9]/g, '');
                                            }}
                                            inputProps={{
                                                inputMode: 'numeric',
                                                pattern: '[0-9]*',
                                                min: 0
                                            }}
                                        />
                                        {errors.numero && domicilio.numero === null && <FormHelperText>{errors.numero}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={2}>
                                    <FormControl error={!!errors.cp}>
                                        <TextField
                                            label="Código Postal"
                                            name="cp"
                                            fullWidth
                                            value={domicilio.cp}
                                            onChange={(e) => handleDomiciliosChange(index, e)}
                                            onInput={(e) => {
                                                const input = e.target as HTMLInputElement;
                                                input.value = input.value.replace(/[^0-9]/g, '');
                                            }}
                                            inputProps={{
                                                inputMode: 'numeric',
                                                pattern: '[0-9]*',
                                                min: 0
                                            }}
                                        />
                                        {errors.cp && domicilio.cp === null && <FormHelperText>{errors.cp}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        label="Piso (opcional)"
                                        name="piso"
                                        fullWidth
                                        value={domicilio.piso}
                                        onChange={(e) => handleDomiciliosChange(index, e)}
                                        onInput={(e) => {
                                            const input = e.target as HTMLInputElement;
                                            input.value = input.value.replace(/[^0-9]/g, '');
                                        }}
                                        inputProps={{
                                            inputMode: 'numeric',
                                            pattern: '[0-9]*',
                                            min: 0
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        label="Número Depto (opcional)"
                                        name="nroDpto"
                                        fullWidth
                                        value={domicilio.nroDpto}
                                        onChange={(e) => handleDomiciliosChange(index, e)}
                                        onInput={(e) => {
                                            const input = e.target as HTMLInputElement;
                                            input.value = input.value.replace(/[^0-9]/g, '');
                                        }}
                                        inputProps={{
                                            inputMode: 'numeric',
                                            pattern: '[0-9]*',
                                            min: 0
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={1} style={{ height: '100%' }}>
                                    <Tooltip title="Quitar Domicilio" arrow>
                                        <Button
                                            color="error"
                                            variant="contained"
                                            onClick={() => handleQuitarDomicilio(index)}
                                            disabled={index === 0}
                                            style={{ height: '100%' }}
                                        >
                                            <DeleteOutlineIcon />
                                        </Button>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Box>
                    ))}
                </Box>
                <Box mt={2} display="flex" justifyContent={"flex-end"}>
                    <Button variant="contained" onClick={handleSubmit} sx={{ ...colorConfigs.buttonStyles }}>
                        Registrarse
                    </Button>
                </Box>
            </Box >
            <RegistroModal cliente={cliente} open={open} onClose={handleClose}/>
            <ToastContainer />
        </>
    )
}

export default Registro;