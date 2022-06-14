import { React, useState, useEffect, useLayoutEffect } from "react";
import { Container, Grid, Button, Box, Select, Typography, Switch } from "@material-ui/core";
import {Chart, PieSeries, Title, Legend } from '@devexpress/dx-react-chart-material-ui';
import { Animation, Palette } from '@devexpress/dx-react-chart';
import "./../styles/admin.css";

import ThemeComponent from "../components/ThemeComponent";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ThemeSwitchComponent from "../components/ThemeSwitchComponent";

function LandingPage() {

    const themeComponent = new ThemeComponent();
    const theme = themeComponent.getActualTheme();

    const [themeSwitch, setThemeSwitch] = useState(false);
    const [items, setItems] = useState([]);
    const [countLanches, setCountLanches] = useState(0);
    const [countComidas, setCountComidas] = useState(0);
    const [countBebidas, setCountBebidas] = useState(0);
    const [countVerduras, setCountVerduras] = useState(0);
    const [countLegumes, setCountLegumes] = useState(0);
    const [countFrutas, setCountFrutas] = useState(0);

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

    useLayoutEffect(() => {
        if (theme != "dark") {
            setThemeSwitch(true);
        }
    }, [themeSwitch]);

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

    function getThemeSwitch() {
        if (theme != "dark") {
            return <div style={{ marginTop: "0.5rem", marginLeft: "0.5rem" }} ><ThemeSwitchComponent defaultChecked onChange={ () => { handleThemeSwitch() } } /></div>;
        }
        else {
            return <div style={{ marginTop: "0.5rem", marginLeft: "0.5rem" }} ><ThemeSwitchComponent onChange={ () => { handleThemeSwitch() } } /></div>;
        }
    }

    function handleThemeSwitch() {
        if (!themeSwitch) {
            setThemeSwitch(true);
            themeComponent.setThemeSwitch("light");
        }
        else {
            setThemeSwitch(false);
            themeComponent.setThemeSwitch("dark");
        }
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
        
        <div style={{ backgroundColor: themeComponent.getBackgroundColor(theme) }}>

            <Header theme={theme} />

            {
                getThemeSwitch()
            }

            <Container align="center">
            <div style={{ backgroundColor: themeComponent.getBackgroundColor(theme) }}>
                <div className="chartContainer" style={{ color: themeComponent.getTypographyColor(theme), backgroundColor: themeComponent.getBackgroundColor(theme) }}>
                    <Chart data={data} label={"test"} >
                        <PieSeries valueField="value" argumentField="argument" />
                        <Title text="Doações recebidas" className="white-typography" />
                        <Legend />
                        <Animation />
                    </Chart>
                </div>
            </div>
            </Container>
            
            <Footer theme={themeComponent.getActualTheme()} />
        </div>
    )
}



export default LandingPage;