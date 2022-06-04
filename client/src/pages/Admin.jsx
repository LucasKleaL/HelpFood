import { React, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Button, Box, Select, Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import WhiteButtonTheme from "./../themes/WhiteButtonTheme";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import "./../styles/landingpage.css";
import LoginForm from "../components/LoginForm";
import DonationForm from "../components/DonationForm";
import Footer from "../components/Footer";

function LandingPage() {

    const HeaderTitleStyle = {
        color: "var(--white)",
        fontSize: "2rem",
        fontWeight: "900",
        marginLeft: "1rem",
    }

    return (
        <div style={{backgroundColor: "white"}}>
            <div style={{backgroundColor: "white"}}>

                <header>
                    <div style={{float: "left", marginTop: "0.5"}}>
                        <Typography className="nunito-text" style={HeaderTitleStyle}>HelpFoods</Typography>
                    </div>

                   
                </header>

                <div style={{backgroundColor: "white"}}>
                    Teste
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default LandingPage;