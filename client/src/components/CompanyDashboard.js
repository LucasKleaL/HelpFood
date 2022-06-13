import { Button, Grid, Container, DataGrid } from '@mui/material';
import React, { useState, useEffect, useLayoutEffect } from 'react'
import Axios from "axios";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import "./../styles/companyDashboard.css";
import Footer from "../components/Footer";
import TopMenu from "../components/TopMenu";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


function CompanyDashboard() {
    const [companyData, setCompanyData] = useState([]);
    const [allOngs, setAllOngs] = useState([]);
    useLayoutEffect(() => {
        fetch("http://localhost:3001/user/getCurrentCompanyData", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    setCompanyData(result)
                }
            );
            fetch("http://localhost:3001/user/getAllOngs", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    setAllOngs(result)
                }
            );

    }, []);

    return (
        <div>
            <Container maxWidth="lg"  >
                
                {companyData.map((item) => (
                    <Grid key={item.Id}>
                        <Grid container spacing={1.3} justifyContent="center" padding={3} style={{}}>
                            <Grid item>
                                <h1 style={{ fontSize: "80px", color: "white" }}>{item.Name}</h1>
                            </Grid>
                        </Grid>
                        <Divider style={{backgroundColor: "white", opacity: "25%"}}/>
                        <Grid container spacing={1.3} justifyContent="center" padding={3} style={{}}>
                            <Grid item justifyContent="center">
                                <h1 className='titleCard' >Suas doações</h1>
                                <br />
                                <br />
                                <Grid item className='cardDashboard'>
                                    <h1 style={{ fontSize: "80px" }}>{item.Donations.length < 10 ? "0"+ item.Donations.length : item.Donations.length}</h1>
                                </Grid>
                            </Grid>
                            <Grid item justifyContent="center">
                                <h1 className='titleCard'>ONG's que precisam <br />da sua ajuda</h1>
                                <Grid item className='cardDashboard'>
                                    <h1 style={{ fontSize: "80px" }}>{allOngs.length < 10 ? "0"+ allOngs.length : allOngs.length}</h1>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}

            </Container>
        </div>
    )
}
export default CompanyDashboard;


