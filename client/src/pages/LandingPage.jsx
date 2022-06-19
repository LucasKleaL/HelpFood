import { React, useState, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Button, Box, Select, Typography, } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import WhiteButtonTheme from "./../themes/WhiteButtonTheme";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import "./../styles/landingpage.css";
import Footer from "../components/Footer";
import ThemeComponent from "../components/ThemeComponent";
import CustomizedDialogs from "../components/Dialog";
import LoginForm from "../components/LoginForm";

function LandingPage() {

    const themeComponent = new ThemeComponent();
    const [redirectCompany, setRedirectCompany] = useState(false);

    const HeaderWallpaperStyle = {
        width: "100%",
        heigth: "100vh",
        backgroundColor: "linear-gradient(to bottom, transparent 0%, #121212 100%)",
        backgroundRepeat: "no-repeat"
    }

    const HeaderButtonStyle = {
        width: "8rem",
        heigth: "3rem",
        fontSize: "2rem",
        marginRight: "0.5rem",
        textTransform: "capitalize",
        fontWeight: "900",
    }

    const HeaderTitleStyle = {
        color: "var(--white)",
        fontSize: "2rem",
        fontWeight: "900",
        marginLeft: "1rem",
    }

    const WallpaperTitleStyle = {
        color: "var(--white)",
        fontSize: "2rem",
        fontWeight: "900",
        width: "40%",
        textAlign: "center",
    }

    const WallpaperSecondTitleStyle = {
        color: "var(--white)",
        fontSize: "1.5rem",
        fontWeight: "900",
        width: "40%",
        textAlign: "center",
    }

    const BodyDropDownArrowStyle = {
        color: "var(--white)",
        fontSize: "3rem",
        marginTop: "1rem",
        cursor: "pointer"
    }

    function changeRedirectCompany(isCompany) {
        setRedirectCompany(isCompany)
    }

    return (
        <div>
            <div className="header-wallpaper">

                <header>
                    <div style={{ float: "left", marginTop: "0.5" }}>
                        <Typography className="nunito-text" style={HeaderTitleStyle}>HelpFoods</Typography>
                    </div>

                    <div style={{ float: "right", marginTop: "0.5rem" }}>
                        <ThemeProvider theme={WhiteButtonTheme}>

                            <Button variant="text" color="primary" style={HeaderButtonStyle}>About</Button>

                            <Button onClick={() => changeRedirectCompany(false)}>
                                <CustomizedDialogs title="Entrar na rede" titleButton="Receber" variant="text" color="primary" style={HeaderButtonStyle}>
                                    <LoginForm redirectCompany={redirectCompany} />
                                </CustomizedDialogs>
                            </Button>
                            <Button onClick={() => changeRedirectCompany(true)}>
                                <CustomizedDialogs title="Entrar na rede" titleButton="Doar" variant="text" color="primary" style={HeaderButtonStyle}>
                                    <LoginForm redirectCompany={redirectCompany} />
                                </CustomizedDialogs>
                            </Button>
                            
                        </ThemeProvider>
                    </div>
                </header>

                <div>
                    <Container align="center" style={{ marginTop: "25vh" }}>
                        <Typography className="nunito-text" style={WallpaperTitleStyle}>VOCÊ FAZ PARTE DE UMA EMPRESA QUE DESEJA DOAR?</Typography>
                        <Typography className="nunito-text" style={WallpaperSecondTitleStyle}>OU DE UMA ONG QUE DESEJA RECEBER</Typography>
                        <ArrowDropDownCircleIcon style={BodyDropDownArrowStyle} />
                    </Container>
                </div>
            </div>

            <Footer theme={themeComponent.getActualTheme()} />
        </div>
    )
}

export default LandingPage;