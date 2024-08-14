import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "@mui/material";

const RegisterButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Button
            onClick={() => {
                loginWithRedirect({
                    appState: {
                        returnTo: window.location.pathname
                    },
                    authorizationParams: {
                        screen_hint: "signup"
                    }
                })
            }}
            sx={{
                backgroundColor: "#415a81",
                color: "#eeeeee",
                border: "1px solid #415a81",
                '&:hover': {
                    backgroundColor: "#344a61",
                    borderColor: "#344a61"
                }
            }}
        >
            Registrarse
        </Button>
    )
}

export default RegisterButton;