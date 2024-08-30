import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import sucursalSlice from "./slices/sucursalSlice";
import clienteSlice from "./slices/clienteSlice";

const persistanceMiddleware = (store: any) => (next: any) => (action: any) => {
  next(action);
  if (action.type.startsWith("sucursal/")) {
    localStorage.setItem("sucursal", JSON.stringify(store.getState().sucursal));
  }
  if (action.type.startsWith("user/")) {
    localStorage.setItem("user", JSON.stringify(store.getState().user));
  }
  if (action.type.startsWith("cliente/")) {
    localStorage.setItem("cliente", JSON.stringify(store.getState().cliente));
  }
}

export const store = configureStore({
  reducer: {
    sucursal: sucursalSlice,
    user: userSlice,
    cliente: clienteSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistanceMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;