import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      sx={{
        backgroundColor: "#233044",
        color: "#eeeeee",
        '&:hover': {
          backgroundColor: "#233044",
          color: "#b0b0b0"
        }
      }}
      onClick={() =>
        loginWithRedirect({
          appState: {
            returnTo: '/',
          },
        })
      }
    >
      Ingresar
    </Button>
  );
};

export default LoginButton;
