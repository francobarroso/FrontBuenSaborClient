import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Pedido from "../../types/Pedido";

const DEFAULT_STATE = {
    pedido: null
}

export interface initialStateEntity {
    pedido: Pedido | null
};

const initialState: initialStateEntity = (()=>{
    const persistedState = localStorage.getItem("pedido");
    if(persistedState){
        return { pedido: JSON.parse(persistedState).pedido };
    }
    return DEFAULT_STATE;
})();

export const pedidoSlice = createSlice({
    name: "pedido",
    initialState,
    reducers: {
        setPedidoDetalle: (state, action: PayloadAction<Pedido>) => {
            const pedido = action.payload;
            state.pedido = pedido;
        }
    }
});

export const {setPedidoDetalle} = pedidoSlice.actions;
export default pedidoSlice.reducer;