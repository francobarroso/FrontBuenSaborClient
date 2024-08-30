import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cliente from "../../types/Cliente";

const DEFAULT_STATE = {
    user: null
}

export interface initialStateEntity {
    user: Cliente | null
};

const initialState: initialStateEntity = (()=>{
    const persistedState = localStorage.getItem("user");
    if(persistedState){
        return { user: JSON.parse(persistedState).user };
    }
    return DEFAULT_STATE;
})();

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<Cliente>) => {
            const user = action.payload;
            state.user = user;
        }
    }
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;