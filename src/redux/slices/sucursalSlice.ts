import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Sucursal from "../../types/Sucursal";

const DEFAULT_STATE = {
    sucursal: null
}

export interface initialStateEntity {
    sucursal: Sucursal | null;
};

const initialState: initialStateEntity = (() => {
    const persistedState = localStorage.getItem("sucursal");
    if (persistedState) {
        return { sucursal: JSON.parse(persistedState).sucursal };
    }
    return DEFAULT_STATE;
})();

export const sucursalSlice = createSlice({
    name: "sucursal",
    initialState,
    reducers: {
        setSucursal: (state, action: PayloadAction<Sucursal>) => {
            const sucursal = action.payload;
            state.sucursal = sucursal;
        }
    }
});

export default sucursalSlice.reducer;
export const { setSucursal } = sucursalSlice.actions;