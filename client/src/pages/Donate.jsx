import { React, useState, useEffect, useLayoutEffect  } from "react";
import Axios from "axios";
import { Container, Grid, Button, Box, Select, Typography, } from "@material-ui/core";
import LoginModal from "../components/LoginModal";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ThemeComponent from "../components/ThemeComponent";
import DonationForm from "../components/DonationForm";

function Donate() {

    const [isAuth, setIsAuth] = useState(false);
    const themeComponent = new ThemeComponent();
    const theme = themeComponent.getActualTheme();

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

            <Header theme={theme} isAuth={isAuth} />

            {
                isAuth ? <div /> : <LoginModal isCompany={true} />
            }

            <Container style={{marginTop: "6rem"}}>
                <DonationForm />
            </Container>

            <Footer theme={theme} />
        </div>
    )
}
export default Donate;