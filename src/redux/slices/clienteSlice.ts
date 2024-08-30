import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_STATE = {
    cliente: null
}

export interface initialStateEntity {
    cliente: boolean | null
};

const initialState: initialStateEntity = (()=>{
    const persistedState = localStorage.getItem("cliente");
    if(persistedState){
        return { cliente: JSON.parse(persistedState).cliente };
    }
    return DEFAULT_STATE;
})();

export const clienteSlice = createSlice({
    name: "cliente",
    initialState,
    reducers: {
        setCliente: (state, action: PayloadAction<boolean>) => {
            const cliente = action.payload;
            state.cliente = cliente;
        }
    }
});

export const {setCliente} = clienteSlice.actions;
export default clienteSlice.reducer;