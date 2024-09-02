import Cliente from "../types/Cliente";
const apiUrl = import.meta.env.VITE_API_SERVER_URL;

export async function ClienteCreate(cliente: Cliente){
	const urlServer = `${apiUrl}/cliente`;
	const response = await fetch(urlServer, {
		method: 'POST',
		body: JSON.stringify(cliente),
        headers: {
			'Content-type': 'application/json'
		},
        mode: 'cors'
	});
	const responseData = await response.json();

	return {
		status: response.status,
		data: responseData as Cliente
	};
}

export async function ClienteGetByEmail(email: string){
	const urlServer = `${apiUrl}/cliente/findByEmail?email=${email}`;
	const response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json'
		},
        mode: 'cors'
	});

    return await response.json() as Cliente;
}

export async function ClienteExist(email: string){
	const urlServer = `${apiUrl}/cliente/exist?email=${email}`;
	const response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json'
		},
        mode: 'cors'
	});

    return await response.json() as boolean;
}