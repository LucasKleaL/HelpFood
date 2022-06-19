import { React, useState, useEffect, useLayoutEffect } from "react";
import { Container, Grid, Button, Box, Select, Typography, Switch } from "@material-ui/core";
import Axios from "axios";
import { Chart, PieSeries, Title, Legend } from '@devexpress/dx-react-chart-material-ui';
import { Animation, Palette } from '@devexpress/dx-react-chart';
import "./../styles/admin.css";
import LoginForm from "../components/LoginForm";

import ThemeComponent from "../components/ThemeComponent";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ThemeSwitchComponent from "../components/ThemeSwitchComponent";

function Admin() {

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
    const [isAuth, setIsAuth] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const response = fetch(window.url + "/donation/getAllActiveAndInactiveDonations", {
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
        Axios.get(window.url + "/user/getUserAuth")
            .then((result) => {
                setIsAuth(result.data);
                Axios.get(window.url + "/user/getCurrentUserId")
                    .then((result) => {
                        var url = window.url + "/user/isAdmin/" + result.data
                        Axios.get(url)
                            .then((result) => {
                                if (result.data === true) {
                                    setIsAdmin(true);
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            })

                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error);
            })

    }, []);

    useLayoutEffect(() => {
        if (theme != "dark") {
            setThemeSwitch(true);
        }
    }, [themeSwitch]);

    function teste(result) {
        var comidaFilter = result.filter(function (item) {
            var type = item.TypeFood === "Comida";
            return type
        });
        setCountComidas(comidaFilter.length)

        var lancheFilter = result.filter(function (item) {
            var type = item.TypeFood === "Lanche";
            return type
        });
        setCountLanches(lancheFilter.length)

        var bebidaFilter = result.filter(function (item) {
            var type = item.TypeFood === "Bebida";
            return type
        });
        setCountBebidas(bebidaFilter.length)

        var verduraFilter = result.filter(function (item) {
            var type = item.TypeFood === "Verdura";
            return type
        });
        setCountVerduras(verduraFilter.length)

        var legumeFilter = result.filter(function (item) {
            var type = item.TypeFood === "Legume";
            return type
        });
        setCountLegumes(legumeFilter.length)

        var frutaFilter = result.filter(function (item) {
            var type = item.TypeFood === "Fruta";
            return type
        });
        setCountFrutas(frutaFilter.length)

        console.log(frutaFilter.length)
    }

    function getThemeSwitch() {
        if (theme != "dark") {
            return <div style={{ marginTop: "0.5rem", marginLeft: "0.5rem" }} ><ThemeSwitchComponent defaultChecked onChange={() => { handleThemeSwitch() }} /></div>;
        }
        else {
            return <div style={{ marginTop: "0.5rem", marginLeft: "0.5rem" }} ><ThemeSwitchComponent onChange={() => { handleThemeSwitch() }} /></div>;
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

    const data = [
        { argument: 'Lanche: ' + countLanches, value: countLanches },
        { argument: 'Comida: ' + countComidas, value: countComidas },
        { argument: 'Bebida: ' + countBebidas, value: countBebidas },
        { argument: 'Verdura: ' + countVerduras, value: countVerduras },
        { argument: 'Legume: ' + countLegumes, value: countLegumes },
        { argument: 'Fruta: ' + countFrutas, value: countFrutas },
    ];
    function renderChart(isAdmin) {
        if (isAdmin) {
            return <Container align="center" maxWidth="lg">
                <div style={{ backgroundColor: themeComponent.getBackgroundColor(theme) }}>
                    <div className="chartContainer" style={{ color: themeComponent.getTypographyColor(theme), backgroundColor: themeComponent.getBackgroundColor(theme) }}>
                        <Chart data={data} label={"test"} >
                            <PieSeries valueField="value" argumentField="argument" />
                            <Title text="Doações recebidas" className="white-typography" />
                            <Legend />
                        </Chart>
                    </div>
                </div>
            </Container>
        } else if(isAuth && isAdmin === false) {
            return <Container align="center" maxWidth="lg">
                <Grid container justifyContent="center" paddingTop={15}>
                    <h1 style={{ color: themeComponent.getTypographyContrastColor(theme) }}>Você não tem permissão para acessar essa página!</h1>
                </Grid>
            </Container>
        }else{
            return <LoginForm redirectCompany={false}/>
        }

    }

    return (

        <div style={{ backgroundColor: themeComponent.getBackgroundColor(theme) }}>

            <Header isAuth={isAuth} isAdmin={isAdmin} theme={theme} />

            {
                getThemeSwitch()
            }
            {
                renderChart(isAdmin)
            }


            <Footer theme={themeComponent.getActualTheme()} />
        </div>
    )
}

export default Admin;