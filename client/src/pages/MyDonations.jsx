import { React, useState, useEffect, useLayoutEffect } from "react";
import { Container, Grid, Button, Box, Select, Typography, Switch } from "@material-ui/core";
import Axios from "axios";
import {Chart, PieSeries, Title, Legend } from '@devexpress/dx-react-chart-material-ui';
import { Animation, Palette } from '@devexpress/dx-react-chart';
import "./../styles/admin.css";

import ThemeComponent from "../components/ThemeComponent";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ThemeSwitchComponent from "../components/ThemeSwitchComponent";

function MyDonations() {

    const themeComponent = new ThemeComponent();
    const theme = themeComponent.getActualTheme();

    const [themeSwitch, setThemeSwitch] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isBusiness, setIsBusiness] = useState(false);
 
    useLayoutEffect(() => {
        Axios.get(window.url+"/user/getUserAuth")
            .then((result) => {
                setIsAuth(result.data);
                Axios.get(window.url+"/user/getCurrentUserId")
                    .then((result) => {
                        var url = window.url+"/user/isBusiness/" + result.data
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
            return <div style={{ marginTop: "0.5rem", marginLeft: "0.5rem" }} ><ThemeSwitchComponent defaultChecked onChange={ () => { handleThemeSwitch() } } /></div>;
        }
        else {
            return <div style={{ marginTop: "0.5rem", marginLeft: "0.5rem" }} ><ThemeSwitchComponent onChange={ () => { handleThemeSwitch() } } /></div>;
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


    
    return (
        
        <div style={{ backgroundColor: themeComponent.getBackgroundColor(theme) }}>
            <Header theme={theme} isAuth={isAuth} isBusiness={isBusiness}/>
            {
                getThemeSwitch()
            }
            <Container align="center" maxWidth="lg">
                <Typography>Listar doações da empresa</Typography>
            </Container>
            <Footer theme={themeComponent.getActualTheme()} />
        </div>
    )
}

export default MyDonations;