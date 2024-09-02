import Pedido from "../types/Pedido";
import PreferenceMP from "../types/PreferenceMP";
const apiUrl = import.meta.env.VITE_API_SERVER_URL;

export async function createPreferenceMP(pedido?:Pedido){
	let urlServer = `${apiUrl}/mercadoPago/crearPreferenceMp`;
	let method:string = "POST";
    const response = await fetch(urlServer, {
	  "method": method,
	  "body": JSON.stringify(pedido),
	  "headers": {
		"Content-Type": 'application/json'
	  }
	});
    return await response.json() as PreferenceMP;   
}

export async function PedidoSave(pedido: Pedido){
	const urlServer = `${apiUrl}/pedido`;
	const response = await fetch(urlServer, {
		method: 'POST',
		body: JSON.stringify(pedido),
        headers: {
			'Content-type': 'application/json'
		},
        mode: 'cors'
	});
	const responseData = await response.json();

	return {
		status: response.status,
		data: responseData as Pedido
	};
}