import { React, useState, useEffect, useLayoutEffect } from "react";
import { Container, Grid, Button, Box, Select, Typography, Switch } from '@mui/material';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Axios from "axios";
import "./../styles/myDonations.css";
import ThemeComponent from "../components/ThemeComponent";
import ThemeSwitchComponent from "../components/ThemeSwitchComponent";
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function MyDonations() {

    const themeComponent = new ThemeComponent();
    const theme = themeComponent.getActualTheme();

    const [themeSwitch, setThemeSwitch] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isBusiness, setIsBusiness] = useState(false);
    const [companyId, setCompanyId] = useState("");
    const [activeDonations, setActiveDonations] = useState([]);
    const [disabledDonations, setDisabledDonations] = useState([]);

    useEffect(() => {
        Axios.get(window.url + "/user/getUserAuth")
            .then((result) => {
                setIsAuth(result.data);
                Axios.get(window.url + "/user/getCurrentUserId")
                    .then((result) => {
                        getActiveDonations(result.data)
                        getDisabledDonations(result.data)
                        var url = window.url + "/user/isBusiness/" + result.data
                        Axios.get(url)
                            .then((result) => {
                                if (result.data === true) {
                                    setIsBusiness(true);
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

    function getActiveDonations(companyId) {
        fetch(window.url + "/donation/getActiveDonationsByCompanyId/" + companyId, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    setActiveDonations(result)
                }
            );
    }
    function getDisabledDonations(companyId) {
        fetch(window.url + "/donation/getDisabledDonationsByCompanyId/" + companyId, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    setDisabledDonations(result)
                }
            );
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
    function renderDisabledDonations(disabledDonations) {
        if (disabledDonations.length > 0)
            return <div><Grid>
                <Grid container spacing={1.3} justifyContent="center" padding={3} style={{}}>
                    <Grid item>
                        <h3 style={{ fontSize: "40px", color: themeComponent.getTypographyColor(theme) }}>Doações finalizadas</h3>
                    </Grid>
                </Grid>
            </Grid>
                <Divider style={{ backgroundColor: themeComponent.getTypographyContrastColor(theme), opacity: "25%" }} />
                <Grid container spacing={1.3} padding={3} justifyContent="center">
                    {disabledDonations.map((item) => (
                        <Grid item key={item.Id}>
                            <Card sx={{ maxWidth: 315, minWidth: 315, backgroundColor: themeComponent.getCardBackgroundColor(theme) }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="https://static.vecteezy.com/ti/vetor-gratis/p1/2554852-seamless-pattern-with-food-on-dark-blue-background-gr%C3%A1tis-vetor.jpg"
                                    alt="HelpFood img"
                                />
                                <CardContent>
                                    <Typography className="nameCard" gutterBottom variant="h6" component="div" sx={{ color: themeComponent.getTypographyColor(theme) }} >
                                        {item.Name}
                                    </Typography>
                                    <Typography className="description" variant="body2" sx={{ color: themeComponent.getTypographyColor(theme) }} >
                                        {item.Description}
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography variant="body2" sx={{ float: "right", paddingRight: "4px", color: themeComponent.getTypographyColor(theme) }}>
                                        {item.Quantity} un.
                                    </Typography>

                                    <input type={"hidden"} id={item.Id} value={item.Id}></input>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
    }
    function renderActiveDonations(activeDonations) {
        if (activeDonations.length > 0){
            return <Grid container spacing={1.3} padding={3} justifyContent="center">
                {activeDonations.map((item) => (
                    <Grid item key={item.Id}>
                        <Card sx={{ maxWidth: 315, minWidth: 315, backgroundColor: themeComponent.getCardBackgroundColor(theme) }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://static.vecteezy.com/ti/vetor-gratis/p1/2554852-seamless-pattern-with-food-on-dark-blue-background-gr%C3%A1tis-vetor.jpg"
                                alt="HelpFood img"
                            />
                            <CardContent>
                                <Typography className="nameCard" gutterBottom variant="h6" component="div" sx={{ color: themeComponent.getTypographyColor(theme) }} >
                                    {item.Name}
                                </Typography>
                                <Typography className="description" variant="body2" sx={{ color: themeComponent.getTypographyColor(theme) }} >
                                    {item.Description}
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography variant="body2" sx={{ float: "left", paddingRight: "4px", color: themeComponent.getTypographyColor(theme) }}>
                                    <DeleteIcon className="deleteIcon" onClick={() => alertDeleteDonation()} sx={{ cursor: "pointer" }}></DeleteIcon>
                                </Typography>
                                <Typography variant="body2" sx={{ float: "right", paddingRight: "4px", color: themeComponent.getTypographyColor(theme) }}>
                                    {item.Quantity} un.
                                </Typography>

                                <input type={"hidden"} id={item.Id} value={item.Id}></input>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        }
        
    }
    function renderZeroActives(activeDonations){
        if(activeDonations.length < 0){
            return <Container maxWidth="lg" >
            <Grid container justifyContent="center" paddingTop={5}>
                <h1 style={{ color: themeComponent.getTypographyColor(theme) }}>Você não possui nenhuma doação ativa. </h1>
            </Grid>
            <Grid container justifyContent="center" paddingTop={3}>
                <Button style={{ color: themeComponent.getTypographyColor(theme) }}>Clique aqui para doar agora!</Button>
            </Grid>
        </Container>
        }
    }

    function alertDeleteDonation(donationId) {
        Swal.fire({
            title: 'Você tem certeza??',
            text: "Essa doação será removida permanentemente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sim'
        }).then((result) => {
            if (result.isConfirmed) {
            }
        })
    }

    return (
        <div >
            <Container maxWidth="lg">
                <Grid>
                    <Grid container spacing={1.3} justifyContent="center" padding={3} style={{}}>
                        <Grid item>
                            <h3 style={{ fontSize: "40px", color: themeComponent.getTypographyColor(theme) }}>Doações ativas</h3>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider style={{ backgroundColor: themeComponent.getTypographyContrastColor(theme), opacity: "25%" }} />
                {
                    renderZeroActives(activeDonations)
                }
                {
                    renderActiveDonations(activeDonations)
                }
                {
                    renderDisabledDonations(disabledDonations)
                }
                

            </Container>
        </div>
    )
}

export default MyDonations;