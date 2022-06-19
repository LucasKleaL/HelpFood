import { React, useState, useEffect, useLayoutEffect } from "react";
import Axios from "axios";
import "./../styles/dashboard.css";
import ThemeComponent from "../components/ThemeComponent";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ThemeSwitchComponent from "../components/ThemeSwitchComponent";
import MyDonationsComponent from "../components/MyDonations";
import LoginForm from "../components/LoginForm";

function MyDonations() {

    const themeComponent = new ThemeComponent();
    const theme = themeComponent.getActualTheme();

    const [themeSwitch, setThemeSwitch] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isBusiness, setIsBusiness] = useState(false);


    useEffect(() => {
        Axios.get(window.url + "/user/getUserAuth")
            .then((result) => {
                setIsAuth(result.data);
                Axios.get(window.url + "/user/getCurrentUserId")
                    .then((result) => {
                        var url = window.url + "/user/isBusiness/" + result.data
                        Axios.get(url)
                            .then((result) => {
                                if (result.data === true) {
                                    setIsBusiness(true);
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error);
            })

    }, []);

    useLayoutEffect(() => {
        if (theme != "dark") {
            setThemeSwitch(true);
        }
    }, [themeSwitch]);

    

    function getThemeSwitch() {
        if (theme != "dark") {
            return <div style={{ marginTop: "0.5rem", marginLeft: "0.5rem" }} ><ThemeSwitchComponent defaultChecked onChange={() => { handleThemeSwitch() }} /></div>;
        }
        else {
            return <div style={{ marginTop: "0.5rem", marginLeft: "0.5rem" }} ><ThemeSwitchComponent onChange={() => { handleThemeSwitch() }} /></div>;
        }
    }

    function handleThemeSwitch() {
        if (!themeSwitch) {
            setThemeSwitch(true);
            themeComponent.setThemeSwitch("light");
        }
        else {
            setThemeSwitch(false);
            themeComponent.setThemeSwitch("dark");
        }
    }
    function renderMyDonations(isBusiness, isAuth){
        if(isBusiness && isAuth)
            return <MyDonationsComponent/>
        else    
            return <LoginForm redirectCompany={true} />
    }

    return (

        <div >
            <Header theme={theme} isAuth={isAuth} isBusiness={isBusiness} />
            {
                getThemeSwitch()
            }
            {
                renderMyDonations(isBusiness, isAuth)
            }
            <Footer theme={themeComponent.getActualTheme()} />
        </div>
    )
}

export default MyDonations;