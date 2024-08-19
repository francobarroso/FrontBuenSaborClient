import { Route, Routes } from "react-router-dom";
import PreLayout from "../components/layout/PreLayout";
import VistaCiudadano from "../screens/VistaCiudadano";
import Sucursales from "../screens/Sucursales";
import Promociones from "../screens/Promociones";
import Menu from "../screens/Menu";
import Pedido from "../screens/Pedido";
import Registro from "../screens/Registro";

export const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route element={<PreLayout />}>
                <Route path="/" element={<VistaCiudadano />} />
                <Route path="/sucursales" element={<Sucursales />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/promociones" element={<Promociones />} />
                <Route path="/pedido" element={<Pedido />}/>
                <Route path="/registro" element={<Registro />} />
            </Route>
        </Routes>
    );
}