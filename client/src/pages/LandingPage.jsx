import { React, useState, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Button, Box, Select, Typography, Switch } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import WhiteButtonTheme from "./../themes/WhiteButtonTheme";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import "./../styles/landingpage.css";
import LoginForm from "../components/LoginForm";
import DonationForm from "../components/DonationForm";
import Footer from "../components/Footer";
import ThemeComponent from "../components/ThemeComponent";

function LandingPage() {

    const themeComponent = new ThemeComponent();

    const [themeSwitch, setThemeSwitch] = useState(false);

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

    return (
        <div>
            <div className="header-wallpaper">

                <header>
                    <div style={{float: "left", marginTop: "0.5"}}>
                        <Typography className="nunito-text" style={HeaderTitleStyle}>HelpFoods</Typography>
                    </div>

                    <div style={{float: "right", marginTop: "0.5rem"}}>
                        <ThemeProvider theme={WhiteButtonTheme}>

                            <Switch onChange={(e) => { setThemeSwitch(e.target.value); alert(e.target.value) }}/>
                          
                            <Button variant="text" color="primary" style={HeaderButtonStyle}>About</Button>

                            <Link to="/donate" style={{textDecoration: "none"}}>
                                <Button variant="text" color="primary" style={HeaderButtonStyle}>Doar</Button>
                            </Link>

                            <Button variant="text" color="primary" style={HeaderButtonStyle}>Receber</Button>  

                        </ThemeProvider>
                    </div>
                </header>

                <div>
                    <Container align="center" style={{marginTop: "25vh"}}>
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