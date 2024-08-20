import Usuario from "../types/Usuario";

export async function UsuarioGetByEmail(email: string){
	const urlServer = 'http://localhost:8080/usuario/' + email;
	const response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json'
		},
        mode: 'cors'
	});

    return await response.json() as Usuario;
}