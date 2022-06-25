import { Button, Grid, Container, DataGrid } from '@mui/material';
import React, { useState, useEffect, useLayoutEffect } from 'react'
import Divider from '@mui/material/Divider';
import "./../styles/companyDashboard.css";
import ThemeComponent from './ThemeComponent';


function CompanyDashboard() {

    const themeComponent = new ThemeComponent();
    const theme = themeComponent.getActualTheme();

    const [companyData, setCompanyData] = useState([]);
    const [allOngs, setAllOngs] = useState([]);
    useLayoutEffect(() => {
        fetch(window.url+"/user/getCurrentCompanyData", {
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
            fetch(window.url+"/user/getAllOngs", {
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
                                <h1 style={{ fontSize: "80px", color: themeComponent.getTypographyColor(theme) }}>{item.Name}</h1>
                            </Grid>
                        </Grid>
                        <Divider style={{ backgroundColor: themeComponent.getTypographyContrastColor(theme), opacity: "25%" }} />
                        <Grid container spacing={1.3} justifyContent="center" padding={3} style={{}}>
                            <Grid item justifyContent="center">
                                <h1 className='titleCard' style={{ color: themeComponent.getTypographyColor(theme)}}>Suas doações</h1>
                                <br />
                                <br />
                                <Grid item className='cardDashboard' sx={{ backgroundColor: themeComponent.getCardBackgroundColor(theme) }}>
                                    <h1 style={{ fontSize: "80px", color: themeComponent.getTypographyContrastColor(theme) }}>{item.Donations.length < 10 ? "0"+ item.Donations.length : item.Donations.length}</h1>
                                </Grid>
                            </Grid>
                            <Grid item justifyContent="center">
                                <h1 className='titleCard' style={{ color: themeComponent.getTypographyColor(theme)}}>ONG's que precisam <br />da sua ajuda</h1>
                                <Grid item className='cardDashboard' sx={{ backgroundColor: themeComponent.getCardBackgroundColor(theme) }}>
                                    <h1 style={{ fontSize: "80px", color: themeComponent.getTypographyContrastColor(theme) }}>{allOngs.length < 10 ? "0"+ allOngs.length : allOngs.length}</h1>
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


