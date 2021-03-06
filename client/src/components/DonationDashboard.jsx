import { Button, Grid, Container, DataGrid } from '@mui/material';
import React, { useState, useEffect, useLayoutEffect } from 'react'
import Axios from "axios";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import "./../styles/dashboard.css";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ThemeComponent from './ThemeComponent';
import {useHistory} from "react-router-dom";

function DonationDashboard() {

    const themeComponent = new ThemeComponent();
    const theme = themeComponent.getActualTheme();

    const [items, setItems] = useState([]);
    const [receiverName, setReceiverName] = useState("");
    const [receiverEmail, setReceiverEmail] = useState("");
    const MySwal = withReactContent(Swal)

    useEffect(() => {
        fetch(window.url + "/donation/getAll", {
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

        Axios.get(window.url + '/user/getCurrentUserEmail').then(resp => {
            setReceiverEmail(resp.data)

        });
        Axios.get(window.url + '/user/getCurrentUserName').then(resp => {
            setReceiverName(resp.data)
        });
    }, [])


    function reserveDonation(donationId) {
        Axios.get(window.url + "/user/getCurrentUserId")
            .then((result) => {
                Axios.post(window.url + "/donation/reserve", {
                    donationId: donationId,
                    receiverId: result.data,
                    receiverName: receiverName,
                    receiverEmail: receiverEmail

                }).then((response) => {
                    if (response.status === 200) {
                        Swal.fire(
                            'Sucesso!',
                            'Seu pedido foi recebido. <br> Verifique o seu e-mail para acessar os detalhes da retirada!',
                            'success'
                        ).then((result) => {
                            if (result.isConfirmed) {
                                const atualiza = fetch(window.url + "/donation/getAll", {
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
                            }
                        })
                    } else {
                        Swal.fire(
                            'Ops!',
                            'Algo deu errado ' + response.status,
                            'error'
                        )
                    }

                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function alertRequestDonation(donationId) {
        Swal.fire({
            title: 'Voc?? tem certeza??',
            text: "Essa doa????o dever?? ser retirada em at?? 2 horas.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sim'
        }).then((result) => {
            if (result.isConfirmed) {
                reserveDonation(donationId)
            }
        })
    }

    function alertErrorDonation() {
        MySwal.fire({
            title: <strong>Erro ao registrar doa????o!</strong>,
            html: <i>Tente novamente.</i>,
            icon: 'error'
        })
    }

    const ButtonStyle = {
        width: "50%",
        fontWeigth: "solid",
    }

    const history = useHistory();
    const donation = (donationId) => {
        history.push("/Details?donationId=" + donationId)
        window.location.reload()
    }

    return (
        <div>
            {
                items.length === 0 ?
                    <Container maxWidth="lg" >
                        <Grid container justifyContent="center" paddingTop={15}>
                            <h1 style={{ color: themeComponent.getTypographyContrastColor(theme) }}>Nenhuma doa????o dispon??vel no momento. ????</h1>
                        </Grid>
                    </Container>
                    :
                    <Container maxWidth="lg" >
                        <Grid>
                            <Grid container spacing={1.3} justifyContent="center" padding={3} style={{}}>
                                <Grid item>
                                    <h3 style={{ fontSize: "60px", color: themeComponent.getTypographyColor(theme) }}>Doa????es dispon??veis</h3>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider style={{ backgroundColor: themeComponent.getTypographyContrastColor(theme), opacity: "25%" }} />
                        <Grid container spacing={1.3} padding={3} justifyContent="center">
                            {items.map((item) => (
                                <Grid item key={item.Id}>
                                    <Card sx={{ maxWidth: 315, minWidth: 315, backgroundColor: themeComponent.getCardBackgroundColor(theme) }}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image="https://static.vecteezy.com/ti/vetor-gratis/p1/2554852-seamless-pattern-with-food-on-dark-blue-background-gr%C3%A1tis-vetor.jpg"
                                            alt="HelpFood img"
                                        />
                                        <div>
                                            <Typography variant="body2" sx={{ color: themeComponent.getTypographyColor(theme), float: "right", paddingRight: "4px" }}>
                                                Validade: {item.ShelfLife}
                                            </Typography>
                                        </div>
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
                                            <Typography variant="body2" sx={{ color: themeComponent.getTypographyColor(theme) }} >
                                                Bairro: {item.District}
                                            </Typography>
                                            <input type={"hidden"} id={item.Id} value={item.Id}></input>
                                        </CardContent>
                                        <Divider />

                                        <CardActions sx={{ alignContent: "center" }}>
                                            <Button size="small" sx={ButtonStyle} onClick={() => alertRequestDonation(item.Id)} >Solicitar</Button>
                                            <Button size="small" sx={ButtonStyle} onClick={() => donation(item.Id)}>Detalhes</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
            }
        </div>
    )
}
export default DonationDashboard;


