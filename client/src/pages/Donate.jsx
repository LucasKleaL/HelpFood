import { React, useState, useEffect, useLayoutEffect  } from "react";
import Axios from "axios";

import LoginModal from "../components/LoginModal";

function Donate() {

    const [isAuth, setIsAuth] = useState(false);

    useLayoutEffect(() => {
        Axios.get("http://localhost:3001/user/getUserAuth")
        .then((result) => {
            console.log("useEffect "+result.data)
            setIsAuth(result.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    return(
        <div>
            {
                isAuth ? <div /> : <LoginModal />
            }
        </div>
    )
}
export default Donate;