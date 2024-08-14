import { Route, Routes } from "react-router-dom";
import PreLayout from "./components/layout/PreLayout";
import VistaCiudadano from "./screens/VistaCiudadano";
import Menu from "./screens/Menu";
import Sucursales from "./screens/Sucursales";
import Promociones from "./screens/Promociones";

function App() {

  return (
    <>
      <Routes>
        <Route element={<PreLayout />}>
          <Route path="/" element={<VistaCiudadano />} />
          <Route path="/sucursales" element={<Sucursales /> }/>
          <Route path="/menu" element={<Menu />} />
          <Route path="/promociones" element={<Promociones />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
