import React, {useEffect, useState} from "react";
import {Container, Grid} from "@mui/material";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import ThemeComponent from "../components/ThemeComponent";

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
                                    <h3 style={{
                                        fontSize: "60px",
                                        color: themeComponent.getTypographyColor(theme)
                                    }}>Detalhes da Doação</h3>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider style={{
                            backgroundColor: themeComponent.getTypographyContrastColor(theme),
                            opacity: "25%"
                        }}/>
                        <Grid container spacing={1.3} padding={3} justifyContent="center">
                            {donations.map((donation) => (
                                <Grid item key={donation.Id}>
                                    <Card sx={{
                                        maxWidth: 515,
                                        minWidth: 515,
                                        backgroundColor: themeComponent.getCardBackgroundColor(theme)
                                    }}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image="https://static.vecteezy.com/ti/vetor-gratis/p1/2554852-seamless-pattern-with-food-on-dark-blue-background-gr%C3%A1tis-vetor.jpg"
                                            alt="HelpFood img"
                                        />
                                        <div>
                                            <Typography variant="body2" sx={{
                                                color: themeComponent.getTypographyColor(theme),
                                                float: "right",
                                                paddingRight: "4px"
                                            }}>
                                                Validade: {donation.ShelfLife}
                                            </Typography>
                                        </div>
                                        <CardContent>
                                            <Typography className="nameCard" gutterBottom variant="h6" component="div">
                                                Dados da Doação
                                            </Typography>

                                            <CardContent>
                                                <Typography className="description" variant="body2">
                                                    Nome: {donation.Name}
                                                </Typography>
                                                <Typography className="description" variant="body2">
                                                    Tipo: {donation.TypeFood}
                                                </Typography>
                                                <Typography className="description" variant="body2">
                                                    Quantia doada: {donation.Weight}
                                                </Typography>
                                                <Typography className="description" variant="body2">
                                                    Número da Doação: {donation.Number}
                                                </Typography>
                                                <Typography className="description" variant="body2">
                                                    Descrição: {donation.Description}
                                                </Typography>
                                            </CardContent>

                                            <Typography className="nameCard" gutterBottom variant="h6" component="div">
                                                Dados do Doador
                                            </Typography>

                                            <CardContent>
                                                <Typography className="description" variant="body2">
                                                    Nome: {donation.NameDonor}
                                                </Typography>
                                                <Typography className="description" variant="body2">
                                                    Email: {donation.EmailDonor}
                                                </Typography>
                                                <Typography className="description" variant="body2">
                                                    Telefone: {donation.Phone}
                                                </Typography>
                                            </CardContent>
                                        </CardContent>

                                        <CardContent>
                                            <Typography variant="body2" sx={{
                                                float: "right",
                                                paddingRight: "4px",
                                                color: themeComponent.getTypographyColor(theme)
                                            }}>
                                                {donation.Quantity} un.
                                            </Typography>
                                            <Typography variant="body2"
                                                        sx={{color: themeComponent.getTypographyColor(theme)}}>
                                                Bairro: {donation.District}
                                            </Typography>
                                            <input type={"hidden"} id={donation.Id} value={donation.Id}></input>
                                        </CardContent>
                                        <Divider/>
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