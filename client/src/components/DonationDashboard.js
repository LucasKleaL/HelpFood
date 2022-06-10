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
import Footer from "../components/Footer";
import TopMenu from "../components/TopMenu";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function DonationDashboard() {

    const [items, setItems] = useState([]);
    const [donationId, setDonationId] = useState("");
    const [receiverId, setReceiverId] = useState("");
    const MySwal = withReactContent(Swal)
    useEffect(() => {
        fetch("http://localhost:3001/donation/getAll", {
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
    }, [])


    function reserveDonation(donationId) {
        Axios.get("http://localhost:3001/user/getCurrentUserId")
            .then((result) => {
                setReceiverId("atualiza")
                Axios.post("http://localhost:3001/donation/reserve", {
                    donationId: donationId,
                    receiverId: result.data
                }).then((response) => {
                    if (response.status === 200) {
                        Swal.fire(
                            'Sucesso!',
                            'Seu pedido foi recebido.',
                            'success'
                        ).then((result) => {
                            if (result.isConfirmed) {
                                const atualiza = fetch("http://localhost:3001/donation/getAll", {
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
            title: 'Você tem certeza??',
            text: "Essa doação deverá ser retirada em até 2 horas.",
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
            title: <strong>Erro ao registrar doação!</strong>,
            html: <i>Tente novamente.</i>,
            icon: 'error'
        })
    }

    return (
        <div>
            {
                items.length === 0 ?
                    <Container maxWidth="lg" >
                        <Grid container justifyContent="center" paddingTop={15}>
                            <h1>Nenhuma doação disponível no momento. 🙁</h1>
                        </Grid>
                    </Container>
                    :
                    <Container maxWidth="lg" >
                        <Grid container spacing={1.3} padding={3}>

                            {items.map((item) => (
                                <Grid item key={item.Id}>
                                    <Card sx={{ maxWidth: 315, minWidth: 315 }}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image="https://static.vecteezy.com/ti/vetor-gratis/p1/2554852-seamless-pattern-with-food-on-dark-blue-background-gr%C3%A1tis-vetor.jpg"
                                            alt="green iguana"
                                        />
                                        <div>
                                            <Typography variant="body2" color="text.secondary" sx={{ float: "right", paddingRight: "4px" }}>
                                                Validade: {item.ShelfLife}
                                            </Typography>
                                        </div>
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div">
                                                {item.Name}
                                            </Typography>
                                            <Typography variant="body2" >
                                                {item.Description}
                                            </Typography>

                                        </CardContent>

                                        <CardContent>
                                            <Typography variant="body2" color="text.secondary" sx={{ float: "right", paddingRight: "4px" }}>
                                                {item.Quantity} un.
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" >
                                                Bairro: {item.District}
                                            </Typography>
                                            <input type={"hidden"} id={item.Id} value={item.Id}></input>
                                        </CardContent>
                                        <Divider />

                                        <CardActions sx={{ alignContent: "center" }}>
                                            <Button size="small" sx={{ width: "50%" }} onClick={() => alertRequestDonation(item.Id)}>Solicitar</Button>
                                            <Button size="small" sx={{ width: "50%" }}>Detalhes</Button>
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


