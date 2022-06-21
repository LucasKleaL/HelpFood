import React, {useEffect, useState} from "react";
import {Button, Container, Grid} from "@mui/material";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import ThemeSwitchComponent from "../components/ThemeSwitchComponent";
import CardActions from "@mui/material/CardActions";
import {useHistory} from "react-router-dom";
import ThemeComponent from "../components/ThemeComponent";
import Header from "../components/Header";
import Footer from "../components/Footer";

function DetailsDonation() {
    const id = window.location.search;
    const urlParam = new URLSearchParams(id);
    const paramId = urlParam.get("donationId");

    const [donations, setDonation] = useState([]);

    const themeComponent = new ThemeComponent();
    const theme = themeComponent.getActualTheme();
    const history = useHistory();
    const [themeSwitch, setThemeSwitch] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isBusiness, setIsBusiness] = useState(false);

    useEffect(() => {
        fetch(window.url + "/donation/getDonationById/" + paramId, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    setDonation(result)
                }
            );
    }, [])

    const ButtonStyle = {
        width: "50%",
        fontWeigth: "solid",
    }

    const dashboard = () => {
        history.push("/Dashboard")
    }

    function getThemeSwitch() {
        if (theme != "dark") {
            return <div style={{marginTop: "0.5rem", marginLeft: "0.5rem"}}><ThemeSwitchComponent defaultChecked
                                                                                                  onChange={() => {
                                                                                                      handleThemeSwitch()
                                                                                                  }}/></div>;
        } else {
            return <div style={{marginTop: "0.5rem", marginLeft: "0.5rem"}}><ThemeSwitchComponent onChange={() => {
                handleThemeSwitch()
            }}/></div>;
        }
    }

    function handleThemeSwitch() {
        if (!themeSwitch) {
            setThemeSwitch(true);
            themeComponent.setThemeSwitch("light");
        } else {
            setThemeSwitch(false);
            themeComponent.setThemeSwitch("dark");
        }
    }

    return (
        <div>
            <Header theme={theme} isAuth={isAuth}/>
            {
                getThemeSwitch()
            }
            {
                donations.length === 0 ?
                    <Container maxWidth="lg">
                        <Grid container justifyContent="center" paddingTop={15}>
                            <h1 style={{color: themeComponent.getTypographyContrastColor(theme)}}>Nenhuma doação
                                disponível no momento. 🙁</h1>
                        </Grid>
                    </Container>
                    :
                    <Container maxWidth="lg">
                        <Grid>
                            <Grid container spacing={1.3} justifyContent="center" padding={3} style={{}}>
                                <Grid item>
                                    <h3 style={{fontSize: "60px",color: themeComponent.getTypographyColor(theme)}}>
                                        Detalhes da Doação</h3>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Divider style={{backgroundColor: themeComponent.getTypographyContrastColor(theme),opacity: "25%"}}/>

                        <Grid container spacing={1.3} padding={3} justifyContent="center">
                            {donations.map((donation) => (
                                <Grid item key={donation.Id}>
                                    <Card sx={{maxWidth: 515,minWidth: 515,backgroundColor: themeComponent.getCardBackgroundColor(theme)}}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image="https://static.vecteezy.com/ti/vetor-gratis/p1/2554852-seamless-pattern-with-food-on-dark-blue-background-gr%C3%A1tis-vetor.jpg"
                                            alt="HelpFood img"
                                        />
                                        <CardContent>
                                            <div>
                                                <Typography className="nameCard" gutterBottom variant="h6" component="div" sx={{float: "right", color: themeComponent.getTypographyColor(theme)}}>
                                                    {donation.Quantity} unidades
                                                </Typography>
                                                <Typography className="nameCard" gutterBottom variant="h6" component="div" sx={{color: themeComponent.getTypographyColor(theme)}}>
                                                    {donation.Name}
                                                </Typography>
                                            </div>
                                            <Typography className="description" variant="body2" sx={{float: "right", color: themeComponent.getTypographyColor(theme)}}>
                                                Tipo: {donation.TypeFood}
                                            </Typography>
                                            <Typography className="description" variant="body2" sx={{color: themeComponent.getTypographyColor(theme)}}>
                                                Quantia doada: {donation.Weight}
                                            </Typography>
                                            <Typography className="description" variant="body2" sx={{float: "right", color: themeComponent.getTypographyColor(theme)}}>
                                                Validade: {donation.ShelfLife}
                                            </Typography>
                                            <Typography className="description" variant="body2" sx={{color: themeComponent.getTypographyColor(theme)}}>
                                                Descrição: {donation.Description}
                                            </Typography>
                                        </CardContent>

                                        <Divider/>

                                        <CardContent>
                                            <Typography className="nameCard" gutterBottom variant="h6" component="div" sx={{color: themeComponent.getTypographyColor(theme)}}>
                                                Dados do Doador
                                            </Typography>
                                            <Typography className="description" variant="body2" sx={{float: "right", color: themeComponent.getTypographyColor(theme)}}>
                                                Telefone: {donation.Phone}
                                            </Typography>
                                            <Typography className="description" variant="body2" sx={{color: themeComponent.getTypographyColor(theme)}}>
                                                Nome: {donation.NameDonor}
                                            </Typography>
                                            <Typography variant="body2" sx={{float: "right", color: themeComponent.getTypographyColor(theme)}}>
                                                Endereço: <br/>
                                                R. {donation.Street}, {donation.Number} - {donation.District}
                                            </Typography>
                                            <Typography className="description" variant="body2" sx={{color: themeComponent.getTypographyColor(theme)}}>
                                                Email: {donation.EmailDonor}
                                            </Typography>

                                            <Divider/>
                                            <CardActions sx={{alignContent: "center"}}>
                                                <Button size="small" sx={ButtonStyle} onClick={() => dashboard()}>Voltar</Button>
                                            </CardActions>
                                            <Divider/>

                                            <input type={"hidden"} id={donation.Id} value={donation.Id}></input>
                                        </CardContent>

                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
            }
            <Footer theme={theme}/>
        </div>
    )

}

export default DetailsDonation;