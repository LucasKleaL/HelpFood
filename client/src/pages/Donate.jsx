import { React, useState, useEffect, useLayoutEffect } from "react";
import Axios from "axios";
import { Container, Grid, Button, Box, Select, Typography, } from "@material-ui/core";
import LoginModal from "../components/LoginModal";
import LoginForm from "../components/LoginForm";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ThemeComponent from "../components/ThemeComponent";
import ThemeSwitchComponent from "../components/ThemeSwitchComponent";

import DonationForm from "../components/DonationForm";

function Donate() {

    const [isAuth, setIsAuth] = useState(false);
    const [isBusiness, setIsBusiness] = useState(false);
    const [themeSwitch, setThemeSwitch] = useState(false);
    const themeComponent = new ThemeComponent();
    const theme = themeComponent.getActualTheme();

    useLayoutEffect(() => {
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

    function renderDonation(isAuth) {
        if (isAuth) {
            return <Container style={{ marginTop: "3rem" }}>
                        <DonationForm />
                    </Container>
        }else
            return <Container style={{ marginTop: "3rem" }}>
                        <LoginForm isCompany={true} />
                    </Container>
    }

    return (
        <div>
            <Header theme={theme} isAuth={isAuth} isBusiness={isBusiness} />
            {
                getThemeSwitch()
            }
            {
                renderDonation(isAuth)
            }
            <Footer theme={theme} />
        </div>
    )
}
export default Donate;