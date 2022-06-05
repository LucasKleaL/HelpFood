import { React, useState, useEffect } from "react";
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

    const [items, setItems] = useState([]);
    let [countLanches, setCountLanches] = useState(0);
    let [countComidas, setCountComidas] = useState(0);
    let [countBebidas, setCountBebidas] = useState(0);
    let [countVerduras, setCountVerduras] = useState(0);
    let [countLegumes, setCountLegumes] = useState(0);
    let [countFrutas, setCountFrutas] = useState(0);
    useEffect(() => {
        
    }, [])

    function teste() {
        const response = fetch("http://localhost:3001/donation/getAll", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    setItems(result)
                }
            );
        var comidaFilter = items.filter(function(item){
            var type = item.TypeFood === "Comida";     
            return type   
        });
        setCountComidas(comidaFilter.length)

        var lancheFilter = items.filter(function(item){
            var type = item.TypeFood === "Lanche";     
            return type   
        });
        setCountLanches(lancheFilter.length)

        var bebidaFilter = items.filter(function(item){
            var type = item.TypeFood === "Bebida";     
            return type   
        });
        setCountBebidas(bebidaFilter.length)

        var verduraFilter = items.filter(function(item){
            var type = item.TypeFood === "Verdura";     
            return type   
        });
        setCountVerduras(verduraFilter.length)

        var legumeFilter = items.filter(function(item){
            var type = item.TypeFood === "Legume";     
            return type   
        });
        setCountLegumes(legumeFilter.length)

        var frutaFilter = items.filter(function(item){
            var type = item.TypeFood === "Fruta";     
            return type   
        });
        setCountFrutas(frutaFilter.length)

    }


    const HeaderTitleStyle = {
        color: "var(--white)",
        fontSize: "2rem",
        fontWeight: "900",
        marginLeft: "1rem",
    }
    const data = [
        { argument: 'Lanche', value: countLanches },
        { argument: 'Comida', value: countComidas },
        { argument: 'Bebida', value: countBebidas },
        { argument: 'Verdura', value: countVerduras },
        { argument: 'Legume', value: countLegumes },
        { argument: 'Fruta', value: countFrutas },
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
                    <Button onClick={teste}>Mostrar dados</Button>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default LandingPage;