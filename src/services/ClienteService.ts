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