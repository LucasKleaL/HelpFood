import React, {useEffect, useState} from "react";
import {Button, Container, Grid} from "@mui/material";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import ThemeComponent from "../components/ThemeComponent";
import CardActions from "@mui/material/CardActions";
import {useHistory} from "react-router-dom";

function DetailsDonation() {
    const id = window.location.search;
    const urlParam = new URLSearchParams(id);
    const paramId = urlParam.get("donationId");

    const [donations, setDonation] = useState([]);

    const themeComponent = new ThemeComponent();
    const theme = themeComponent.getActualTheme();

    const ButtonStyle = {
        width: "50%",
        fontWeigth: "solid",
    }

    useEffect(() => {
        fetch("http://localhost:3001/donation/getDonationById/" + paramId, {
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

    const history = useHistory();
    const dashboard = () => {
        history.push("/Dashboard")
    }

    return (
        <div>
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
                                                <Typography className="nameCard" gutterBottom variant="h6" component="div" sx={{float: "right"}}>
                                                    {donation.Quantity} unidades
                                                </Typography>
                                                <Typography className="nameCard" gutterBottom variant="h6" component="div">
                                                    {donation.Name}
                                                </Typography>
                                            </div>
                                            <Typography className="description" variant="body2" sx={{float: "right"}}>
                                                Tipo: {donation.TypeFood}
                                            </Typography>
                                            <Typography className="description" variant="body2">
                                                Quantia doada: {donation.Weight}
                                            </Typography>
                                            <Typography className="description" variant="body2" sx={{float: "right"}}>
                                                Validade: {donation.ShelfLife}
                                            </Typography>
                                            <Typography className="description" variant="body2">
                                                Descrição: {donation.Description}
                                            </Typography>
                                        </CardContent>

                                        <Divider/>

                                        <CardContent>
                                            <Typography className="nameCard" gutterBottom variant="h6" component="div">
                                                Dados do Doador
                                            </Typography>
                                            <Typography className="description" variant="body2" sx={{float: "right"}}>
                                                Telefone: {donation.Phone}
                                            </Typography>
                                            <Typography className="description" variant="body2">
                                                Nome: {donation.NameDonor}
                                            </Typography>
                                            <Typography variant="body2" sx={{float: "right"}}>
                                                Endereço: <br/>
                                                R. {donation.Street}, {donation.Number} - {donation.District}
                                            </Typography>
                                            <Typography className="description" variant="body2">
                                                Email: {donation.EmailDonor}
                                            </Typography>

                                            <Divider/>
                                            <CardActions sx={{alignContent: "center"}}>
                                                <Button size="small" sx={ButtonStyle} onClick={() => dashboard()}>Voltar</Button>
                                                <Button size="small" sx={ButtonStyle}>Solicitar</Button>
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
        </div>
    )

}

export default DetailsDonation;