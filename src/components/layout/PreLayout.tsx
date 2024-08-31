import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import Topbar from "../common/Topbar";

const PreLayout = () => {
  return (
    <Box sx={{ display: "flex", lexDirection: "column", height: "100vh" }}>
      <Topbar />
      <Box
        component="pre"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%", // Ocupa todo el ancho
          minHeight: "100%", // Asegura que ocupe toda la altura
          backgroundColor: "#ffffff" // Asegúrate de usar el color correcto
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default PreLayout;