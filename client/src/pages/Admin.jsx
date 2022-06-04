import { React, useState } from "react";
import { Container, Grid, Button, Box, Select, Typography } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    PieSeries,
    Title,
    Legend
} from '@devexpress/dx-react-chart-material-ui';
import {
    Animation
} from '@devexpress/dx-react-chart';
import "./../styles/admin.css";

import Footer from "../components/Footer";
import PieChartComponent from "../components/Chart";

function LandingPage() {

    const HeaderTitleStyle = {
        color: "var(--white)",
        fontSize: "2rem",
        fontWeight: "900",
        marginLeft: "1rem",
    }
    const data = [
        { argument: 'Lanche', value: 10 },
        { argument: 'Comida', value: 25 },
        { argument: 'Bebida', value: 10 },
        { argument: 'Verdura', value: 20 },
        { argument: 'Legume', value: 15 },
        { argument: 'Fruta', value: 20 },
    ];

    return (
        <div style={{ backgroundColor: "white" }}>
            <div style={{ backgroundColor: "white" }}>

                <header>
                    <div style={{ float: "left", marginTop: "0.5" }}>
                        <Typography className="nunito-text" style={HeaderTitleStyle}>HelpFoods</Typography>
                    </div>
                </header>

                <div className="chartContainer" style={{ backgroundColor: "white" }}>
                        <Chart
                            data={data}
                            label={"test"}
                        >
                            <PieSeries valueField="value" argumentField="argument" />
                            <Title text="Doações recebidas" />
                            <Animation></Animation>
                            <Legend></Legend>
                        </Chart>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default LandingPage;