import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import DetallePedido from "../../types/DetallePedido";

const DEFAULT_STATE = {
    carrito: []
}

export interface initialStateEntity {
    carrito: DetallePedido[]
};

const initialState: initialStateEntity = (()=>{
    const persistedState = localStorage.getItem("carrito");
    if(persistedState){
        return { carrito: JSON.parse(persistedState).carrito };
    }
    return DEFAULT_STATE;
})();

export const carritoSlice = createSlice({
    name: "carrito",
    initialState,
    reducers: {
        setCarritoRedux: (state, action: PayloadAction<DetallePedido[]>) => {
            const carrito = action.payload;
            state.carrito = carrito;
        }
    }
});

export const {setCarritoRedux} = carritoSlice.actions;
export default carritoSlice.reducer;