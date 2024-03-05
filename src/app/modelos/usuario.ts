export interface Usuario {
    id?: string,
    nombre: string,
    movil: string,
    email: string,
    clave: string,
    rol: 'Usuario'| 'Administrador'
}
