import Pedido from "../types/Pedido";
import PreferenceMP from "../types/PreferenceMP";

export async function createPreferenceMP(pedido?:Pedido){
    let urlServer = 'http://localhost:8080/mercadoPago/crearPreferenceMp';
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
	const urlServer = 'http://localhost:8080/pedido';
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