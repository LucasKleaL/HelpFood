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

    return (
        <div>
            <Container maxWidth="lg"  >
                <Grid container spacing={1.3} justifyContent="center" padding={3} style={{}}>
                    <Grid item>
                        <h1 style={{ fontSize: "80px", color: "white" }}>COMPANY</h1>
                    </Grid>
                </Grid>
                <Grid container spacing={1.3} justifyContent="center" padding={3} style={{}}>
                    <Grid item justifyContent="center">
                        <h1 style={{paddingLeft: "30px", color: "white", fontSize: "30px" }}>Suas doações</h1>
                        <br/>
                        <br/>
                        <Grid item style={{ backgroundColor: "white", padding: "65px", float: "left", margin: "40px", cursor: "pointer" }}>
                            <h1 style={{ fontSize: "80px" }}>10</h1>
                        </Grid>
                    </Grid>
                    <Grid item justifyContent="center">
                        <h1 style={{paddingLeft: "30px", color: "white", fontSize: "30px" }}>ONG's que precisam <br/>da sua ajuda</h1>
                        <Grid item style={{ backgroundColor: "white", padding: "65px", float: "left", margin: "40px", cursor: "pointer" }}>
                            <h1 style={{ fontSize: "80px" }}>20</h1>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
export default CompanyDashboard;


