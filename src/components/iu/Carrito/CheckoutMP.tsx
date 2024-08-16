import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useEffect, useState } from 'react';

interface Props {
    idPreference: string
}
function CheckoutMP({ idPreference }: Props) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        initMercadoPago("TEST-749c0c7b-de56-4f89-ab1d-7caca80541f1", {
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
                    initialization={{ preferenceId: idPreference, redirectMode: "blank" }}
                    customization={{ texts: { valueProp: "smart_option" } }}
                ></Wallet>
            </div>
        </>
    )
}

export default CheckoutMP