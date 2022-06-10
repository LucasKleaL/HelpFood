import { React, Component } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Grid,
    Link,
    Icon,
    Container
} from "@material-ui/core";

import AccountCircle from '@mui/icons-material/AccountCircle';
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
        }

        const HeaderIconStyle = {
            color: fontColor,
            fontSize: "2rem",
            cursor: "pointer",
            marginTop: "0.5rem"
        }

        return (
            <header style={HeaderStyle}>
                <div style={HeaderContainerStyle}>
                    <div style={{ width: "10rem", float: "left" }}>
                        <Typography style={HeaderTitleStyle} >HelpFood</Typography>
                    </div>
                    <div style={{ float: "right" }}>
                        <AccountCircle style={HeaderIconStyle} />
                    </div>
                </div>
            </header>
        )

    }

}

export default Header;