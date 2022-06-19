import { React, Component } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Grid,
    Link,
    Icon
} from "@material-ui/core";
import GitHubIcon from '@mui/icons-material/GitHub';


class Footer extends Component {
    
    constructor(props) {
        super(props)
    }

    render() {

        let footerColor;
        let fontColor;

        if (this.props.theme == "dark") {
            footerColor = "var(--black-background)";
            fontColor = "var(--white)";
        }
        else {
            footerColor = "var(--gray-dark-background)";
            fontColor = "var(--white)";
        }

        return (
            <AppBar position="static" elevation={0} component="footer" style={{backgroundColor: footerColor}}>
                <Toolbar style={{ justifyContent: "center" }}>
                    <Typography variant="caption" style={{color: {fontColor}}} >Lucas Kusman, Tiago Felipe e Vitor Felix ©2022</Typography>
                    <a href="https://github.com/LucasKleaL/HelpFood" rel="noreferrer" target="_blank">
                        <GitHubIcon style={{marginLeft: "0.5rem", color: "white"}} />
                    </a>
                </Toolbar>
            </AppBar>
        )

    }

}

export default Footer;