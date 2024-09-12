import { initMercadoPago, Wallet, } from '@mercadopago/sdk-react'
import { useEffect, useState } from 'react';

interface Props {
    idPreference: string;
    onVisibilityChange: (visible: boolean) => void;
}

function CheckoutMP({ idPreference, onVisibilityChange }: Props) {
    const [isVisible, setIsVisible] = useState(false);

    const handleReady = () => {
        onVisibilityChange(true);
    }

    useEffect(() => {
        initMercadoPago("APP_USR-66a62c1b-0987-4cf7-b964-01f744297c07", {
            locale: "es-AR"
        });
        if (idPreference && idPreference !== "") {
            setIsVisible(true);
        } else {
            setIsVisible(false);
            onVisibilityChange(false);
        }
    }, [idPreference, onVisibilityChange]);

    return (
        <>
            <div className={isVisible ? "divVisible" : "divInvisible"}>
                <Wallet
                    initialization={{ preferenceId: idPreference, redirectMode: "self" }}
                    customization={{ texts: { valueProp: "smart_option" } }}
                    onReady={handleReady}
                ></Wallet>
            </div>
        </>
    )
}

export default CheckoutMP