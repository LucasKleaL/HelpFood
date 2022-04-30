import { React, useState } from "react";
import { Container, Grid, Button, Box, Select, Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import WhiteButtonTheme from "./../themes/WhiteButtonTheme";
import "./../styles/landingpage.css";

function LandingPage() {

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
        fontWeight: "900"
    }

    const WallpaperTitleStyle = {
        color: "var(--white)",
        fontSize: "2rem",
        fontWeight: "900",
        width: "40%", 
        textAlign: "center"
    }

    const WallpaperSecondTitleStyle = {
        color: "var(--white)",
        fontSize: "1.5rem",
        fontWeight: "900",
        width: "40%", 
        textAlign: "center"
    }

    return (
        <div>
            <div className="header-wallpaper">

                <header>
                    <div style={{float: "right", marginTop: "0.5rem"}}>
                        <ThemeProvider theme={WhiteButtonTheme}>
                            <Button variant="text" color="primary" style={HeaderButtonStyle}>About</Button>
                            <Button variant="text" color="primary" style={HeaderButtonStyle}>Doar</Button>
                            <Button variant="text" color="primary" style={HeaderButtonStyle}>Receber</Button>
                        </ThemeProvider>
                    </div>
                </header>

                <div>
                    <Container align="center" style={{marginTop: "25vh"}}>
                        <Typography style={WallpaperTitleStyle}>VOCÊ FAZ PARTE DE UMA EMPRESA QUE DESEJA DOAR?</Typography>
                        <Typography style={WallpaperSecondTitleStyle}>OU DE UMA ONG QUE DESEJA RECEBER</Typography>
                    </Container>
                </div>

            </div>
        </div>
    )
}

export default LandingPage;