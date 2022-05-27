import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Grid,
    Link,
    Icon
} from "@material-ui/core";
import GitHubIcon from '@mui/icons-material/GitHub';


const Footer = () => <>
       
        <AppBar position="static" elevation={0} component="footer" color="default">
            <Toolbar style={{ justifyContent: "center" }}>
                <Typography variant="caption">Lucas Kusman, Tiago Felipe e Vitor Felix ©2022</Typography>
                <a href="https://github.com/LucasKleaL/HelpFood" rel="noreferrer" target="_blank">
                    <GitHubIcon ></GitHubIcon>
                </a>

            </Toolbar>
        </AppBar>
    </>

export default Footer;