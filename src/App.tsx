import { Route, Routes } from "react-router-dom";
import PreLayout from "./components/layout/PreLayout";
import VistaCiudadano from "./screens/VistaCiudadano";
import Menu from "./screens/Menu";

function App() {

  return (
    <>
      <Routes>
        <Route element={<PreLayout />}>
          <Route path="/" element={<VistaCiudadano />} />
          <Route path="/menu" element={<Menu />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
