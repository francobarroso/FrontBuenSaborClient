import Localidad from "../types/Localidad";
const apiUrl = import.meta.env.VITE_API_SERVER_URL;

export async function LocalidadGetAllByProvincia(id: number){
	const urlServer = `${apiUrl}/localidad/findByProvincia/${id}`;
	const response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json'
		},
        mode: 'cors'
	});
	return await response.json() as Localidad[];
}

export async function LocalidadGetAll(){
	const urlServer = `${apiUrl}/localidad`;
	const response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json'
		},
        mode: 'cors'
	});
	return await response.json() as Localidad[];
}