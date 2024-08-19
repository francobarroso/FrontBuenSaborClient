import { Rol } from "./enums/Rol";

export default interface Usuario{
    id: number | null,
    eliminado: boolean
    auth0Id: string,
    email: string | null,
    rol: Rol | null
}