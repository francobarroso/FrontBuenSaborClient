import Provincia from "../types/Provincia";

export async function ProvinciaGetAll(){
	const urlServer = 'http://localhost:8080/provincia';
	const response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json'
		},
        mode: 'cors'
	});
	return await response.json() as Provincia[];
}