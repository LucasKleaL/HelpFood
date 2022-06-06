import { React, useState, useEffect } from "react";
import { Container, Grid, Button, Box, Select, Typography } from "@material-ui/core";
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
import TopMenu from "../components/TopMenu";

function LandingPage() {

    const [items, setItems] = useState([]);
    let [countLanches, setCountLanches] = useState(0);
    let [countComidas, setCountComidas] = useState(0);
    let [countBebidas, setCountBebidas] = useState(0);
    let [countVerduras, setCountVerduras] = useState(0);
    let [countLegumes, setCountLegumes] = useState(0);
    let [countFrutas, setCountFrutas] = useState(0);
    useEffect(() => {
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
                    teste(result)
                }
            );
        console.log(items)
    }, [])

    function teste(result) {
        var comidaFilter = result.filter(function(item){
            var type = item.TypeFood === "Comida";     
            return type   
        });
        setCountComidas(comidaFilter.length)

        var lancheFilter = result.filter(function(item){
            var type = item.TypeFood === "Lanche";     
            return type   
        });
        setCountLanches(lancheFilter.length)

        var bebidaFilter = result.filter(function(item){
            var type = item.TypeFood === "Bebida";     
            return type   
        });
        setCountBebidas(bebidaFilter.length)

        var verduraFilter = result.filter(function(item){
            var type = item.TypeFood === "Verdura";     
            return type   
        });
        setCountVerduras(verduraFilter.length)

        var legumeFilter = result.filter(function(item){
            var type = item.TypeFood === "Legume";     
            return type   
        });
        setCountLegumes(legumeFilter.length)

        var frutaFilter = result.filter(function(item){
            var type = item.TypeFood === "Fruta";     
            return type   
        });
        setCountFrutas(frutaFilter.length)

        console.log(frutaFilter.length)
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
            <TopMenu/>

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
                        <Legend></Legend>
                        <Animation/>
                    </Chart>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default LandingPage;