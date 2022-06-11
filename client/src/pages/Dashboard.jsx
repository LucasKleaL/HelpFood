import { React, useState, useEffect, useLayoutEffect } from "react";
import { Button, Grid, Container, DataGrid } from '@mui/material';
import  { Redirect } from 'react-router-dom'
import Axios from "axios";

import LoginModal from "../components/LoginModal";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ThemeComponent from "../components/ThemeComponent";
import DonationDashboard from "../components/DonationDashboard";
import ThemeSwitchComponent from "../components/ThemeSwitchComponent";

function Dashboard() {

    const themeComponent = new ThemeComponent();
    const theme = themeComponent.getActualTheme();

    const [isAuth, setIsAuth] = useState(false);
    const [isBusiness, setIsBusiness] = useState(false);
    const [themeSwitch, setThemeSwitch] = useState(false);

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

    useLayoutEffect(() => {
        Axios.get("http://localhost:3001/user/getUserAuth")
            .then((result) => {
                console.log("useEffect " + result.data)
                setIsAuth(result.data);
                
            })
            .catch((error) => {
                console.log(error);
            })

    }, []);

    useEffect(() => {
        
        
    }, [isAuth]);
    return (
        <div>

            <Header theme={theme} />

            {
                getThemeSwitch()
            }

            {
                isAuth ? <div /> : <LoginModal />
            }
            {
                isBusiness ?
                    <Container maxWidth="lg" >
                        <Grid container justifyContent="center" paddingTop={15}>
                            <h1 style={{ color: "white" }}>TODO Dashboard empresa</h1>
                        </Grid>
                    </Container>
                    :
                    <DonationDashboard />
            }
            <Footer theme={theme} />
        </div>
    )
}
export default Dashboard;