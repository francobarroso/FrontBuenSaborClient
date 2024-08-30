import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Stack,
  IconButton,
  Divider,
} from "@mui/material";
import colorConfigs from "../../configs/colorConfig";
import sizeConfigs from "../../configs/sizeConfig";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import avatarImage from "../../assets/images/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import RegisterButton from "./RegisterButton";
import { useNavigate } from "react-router-dom";
import { SucursalGetByEmpresaId } from "../../services/SucursalService";
import { useAppDispatch } from "../../redux/hook";
import { setSucursal } from "../../redux/slices/sucursalSlice";

const Topbar = () => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const setData = () => {
    const traerSucursales = async () => {
      const sucursales = await SucursalGetByEmpresaId(1);
      const sucursalMatriz = sucursales.find(sucursal => sucursal.esCasaMatriz);
      if (sucursalMatriz) dispatch(setSucursal(sucursalMatriz));
    }

    traerSucursales();
  }

  const handleMenu = () => {
    if (window.location.pathname.includes("menu")) {
      navigate("/menu");
      return;
    } else if(window.location.pathname.includes("promociones")){
      navigate("/menu");
      return;
    }

    localStorage.removeItem('categoria');
    setData();
    navigate("/menu");
  }

  const handlePromociones = () => {
    if (window.location.pathname.includes("promociones")) {
      navigate("/promociones");
      return;
    } else if (window.location.pathname.includes("menu")) {
      navigate("/promociones");
      return;
    }
  
    setData();
    navigate("/promociones");
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${sizeConfigs.sidebar.width}px)`,
        ml: sizeConfigs.sidebar.width,
        boxShadow: "unset",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color,
        borderBottomLeftRadius: "20px",
        borderBottomRightRadius: "20px",
        padding: "0 20px",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 0",
        }}
      >
        <Stack direction="row" alignItems="center">
          <Avatar
            src={avatarImage}
            sx={{ width: 50, height: 50, cursor: "pointer" }}
            onClick={() => window.location.href = "/"}
          />
          <Typography
            variant="h5"
            noWrap
            sx={{
              ml: 2,
              color: "#EEEEEE",
              fontWeight: "bold",
              letterSpacing: "2px",
              fontFamily: "Courier",
              cursor: "pointer",
            }}
            onClick={() => window.location.href = "/"}
          >
            El Buen Sabor
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={3}>
          <IconButton
            onClick={handleMenu}
            sx={{
              color: "#EEEEEE",
              "&:hover": { color: "#5f7faf", backgroundColor: "#233044" },
            }}
          >
            <MenuIcon />
            <Typography
              variant="body1"
              sx={{
                ml: 1,
                fontSize: "15px",
                fontWeight: "bold",
                fontFamily: "century, sans-serif",
              }}
            >
              MENÚ
            </Typography>
          </IconButton>

          <Divider orientation="vertical" flexItem sx={{ bgcolor: "#EEEEEE" }} />

          <IconButton
            onClick={handlePromociones}
            sx={{
              color: "#EEEEEE",
              "&:hover": { color: "#5f7faf", backgroundColor: "#233044" },
            }}
          >
            <LocalOfferIcon />
            <Typography
              variant="body1"
              sx={{
                ml: 1,
                fontSize: "15px",
                fontWeight: "bold",
                fontFamily: "century, sans-serif",
              }}
            >
              PROMOCIONES
            </Typography>
          </IconButton>
        </Stack>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isAuthenticated ? <LogoutButton /> : <><LoginButton /> <RegisterButton /></>}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
