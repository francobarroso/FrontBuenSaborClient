import { AppBar, Toolbar, Typography, Box, Avatar, Stack, ListItemButton, ListItemText } from "@mui/material";
import colorConfigs from "../../configs/colorConfig";
import sizeConfigs from "../../configs/sizeConfig";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import avatarImage from '../../assets/images/logo.png';

const Topbar = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - 0)`,
        ml: sizeConfigs.sidebar.width,
        boxShadow: "unset",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color,
        borderBottomLeftRadius: '20px',
        borderBottomRightRadius: '20px'
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative"
        }}
      >
        <Stack
          sx={{ width: "250px" }}
          direction="row"
          justifyContent="center"
        >
          <Avatar src={avatarImage} sx={{ width: 70, height: 70 }} onClick={() => window.location.href = '/'}/>
        </Stack>
        <Typography variant="h6"></Typography>
        <Toolbar sx={{ marginBottom: "7px", marginTop: "5px" }}>
          <Stack
            sx={{ width: "100%" }}
            direction="row"
            justifyContent="right"
          >
            <Typography variant="h5" noWrap style={{ cursor: 'pointer', marginLeft: '20px', alignContent: 'center', color: '#EEEEEE', fontWeight: 'bold', letterSpacing: '3px', fontFamily: 'Cascadia code, sans-serif' }} onClick={() => window.location.href = '/'}>
              El Buen Sabor |
            </Typography>
          </Stack>
          <ListItemButton onClick={() => window.location.href = '/menu'}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            <ListItemText
              primary="MENÚ"
              primaryTypographyProps={{
                style: {
                  fontSize: '15px',
                  fontWeight: 'bold',
                  fontFamily: 'century, sans-serif',
                  marginRight: '5px'
                }
              }}
            />
          </ListItemButton>
        </Toolbar>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%"
          }}
        >
          {isAuthenticated ? (
            <LogoutButton />
          ) : (
            <LoginButton />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;