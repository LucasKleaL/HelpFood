import { React, useState, useEffect, useLayoutEffect  } from "react";
import Axios from "axios";

import LoginModal from "../components/LoginModal";
import Footer from "../components/Footer";
import ThemeComponent from "../components/ThemeComponent";

function Donate() {

    const [isAuth, setIsAuth] = useState(false);
    const themeComponent = new ThemeComponent();

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
            <Footer theme={themeComponent.getActualTheme()} />
        </div>
    )
}
export default Donate;