import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "@mui/material";

const RegisterButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Button
            onClick={() => {
                loginWithRedirect({
                    appState: {
                        returnTo: '/registro'
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
                    backgroundColor: "#334767",
                    borderColor: "#334767"
                }
            }}
        >
            Registrarse
        </Button>
    )
}

export default RegisterButton;