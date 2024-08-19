import Usuario from "./Usuario";

export default interface Persona{
    id: number | null,
    eliminado: boolean
    nombre: string | null,
    apellido: string | null,
    telefono: string | null,
    fechaNacimiento: string | null,
    usuario: Usuario | null
}