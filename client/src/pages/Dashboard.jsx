import { React, useState, useEffect, useLayoutEffect } from "react";
import { Button, Grid, Container, DataGrid } from '@mui/material';
import  { Redirect } from 'react-router-dom'
import Axios from "axios";

import LoginModal from "../components/LoginModal";
import Footer from "../components/Footer";
import ThemeComponent from "../components/ThemeComponent";
import DonationDashboard from "../components/DonationDashboard";
import TopMenu from "../components/TopMenu";

function Dashboard() {

    const [isAuth, setIsAuth] = useState(false);
    const [isBusiness, setIsBusiness] = useState(false);
    const themeComponent = new ThemeComponent();

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
            <TopMenu />
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
            <Footer theme={themeComponent.getActualTheme()} />
        </div>
    )
}
export default Dashboard;