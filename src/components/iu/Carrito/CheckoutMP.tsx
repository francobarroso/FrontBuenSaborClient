import { initMercadoPago, Wallet, } from '@mercadopago/sdk-react'
import { useEffect, useState } from 'react';

interface Props {
    idPreference: string
}

function CheckoutMP({ idPreference }: Props) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        initMercadoPago("APP_USR-66a62c1b-0987-4cf7-b964-01f744297c07", {
            locale: "es-AR"
        });
        if (idPreference && idPreference !== "") {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [idPreference]);

    return (
        <>
            <div className={isVisible ? "divVisible" : "divInvisible"}>
                <Wallet
                    initialization={{ preferenceId: idPreference, redirectMode: "self" }}
                    customization={{ texts: { valueProp: "smart_option" } }}
                ></Wallet>
            </div>
        </>
    )
}

export default CheckoutMP