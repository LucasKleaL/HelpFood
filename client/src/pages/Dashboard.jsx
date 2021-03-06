import { React, useState, useEffect, useLayoutEffect } from "react";
import { Button, Grid, Container, DataGrid } from '@mui/material';
import { Redirect } from 'react-router-dom'
import Axios from "axios";

import LoginModal from "../components/LoginModal";
import LoginForm from "../components/LoginForm";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ThemeComponent from "../components/ThemeComponent";
import DonationDashboard from "../components/DonationDashboard";
import CompanyDashboard from "../components/CompanyDashboard";
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
    function getDashboard(){
        if (isAuth && isBusiness) 
            return <CompanyDashboard/>
        else if(isAuth && isBusiness === false)
            return <DonationDashboard />
        else
            return <LoginForm isCompany={false} />
    }

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

    return (
        <div>
            <Header theme={theme} isAuth={isAuth} isBusiness={isBusiness} />
            {
                getThemeSwitch()
            }
            {
                getDashboard()
            }
            <Footer theme={theme} />
        </div>
    )
}
export default Dashboard;