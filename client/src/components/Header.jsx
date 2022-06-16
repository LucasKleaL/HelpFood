import { React, Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    Grid,
    Icon,
    Container
} from "@material-ui/core";

import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ThemeComponent from "./ThemeComponent";

class Header extends Component {

    constructor(props) {
        super(props);
        
    }

    render() {

        const themeComponent = new ThemeComponent();
        const theme = themeComponent.getActualTheme();

        let headerColor;
        let fontColor;

        if (this.props.theme == "dark") {
            headerColor = "var(--black-background)";
            fontColor = "var(--white)";
        }
        else {
            headerColor = "var(--gray-dark-background)";
            fontColor = "var(--white)";
        }

        const HeaderStyle = {
            width: "100%",
            height: "5rem",
            backgroundColor: headerColor,
            display: "flex",
        }

        const HeaderContainerStyle = {
            marginTop: "1rem",
            marginLeft: "1rem",
            marginRight: "1rem",
            width: "100%"
        }

        const HeaderTitleStyle = {
            color: fontColor,
            fontSize: "2rem",
            cursor: "pointer",
        }

        const HeaderIconStyle = {
            color: fontColor,
            fontSize: "2rem",
            cursor: "pointer",
            marginTop: "0.5rem",
            marginRight: "1rem"
        }

        function logout() {
            Axios.get(window.url+"/user/logout")
            .then((result) => {
                console.log("logout");
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            })
        }

        return (
            <header style={HeaderStyle}>
                <div style={HeaderContainerStyle}>
                    <div style={{ width: "10rem", float: "left" }}>
                        <Link to="/" style={{ textDecoration: "none" }} >
                            <Typography style={HeaderTitleStyle} >HelpFood</Typography>
                        </Link>
                    </div>
                    <div style={{ float: "right" }}>
                        {
                            this.props.isAuth ?
                            <div>
                                <AccountCircle style={HeaderIconStyle} />
                                <LogoutIcon style={HeaderIconStyle} onClick={logout} />
                            </div>
                            :
                            <div />
                        }
                    </div>
                </div>
            </header>
        )

    }

}

export default Header;