import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegisterButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/registro');
        }
    }, [isAuthenticated, navigate]);
    
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