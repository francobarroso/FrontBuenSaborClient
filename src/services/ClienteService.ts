import Cliente from "../types/Cliente";

export async function ClienteCreate(cliente: Cliente){
	const urlServer = 'http://localhost:8080/cliente';
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
	const urlServer = 'http://localhost:8080/cliente/findByEmail?email=' + email;
	const response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json'
		},
        mode: 'cors'
	});

    return await response.json() as Cliente;
}