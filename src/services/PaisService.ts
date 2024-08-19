import Pais from "../types/Pais";

export async function PaisGetAll(){
	const urlServer = 'http://localhost:8080/pais';
	const response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json'
		},
        mode: 'cors'
	});
	return await response.json() as Pais[];
}