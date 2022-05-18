import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import FastfoodIcon from '@mui/icons-material/Fastfood';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Axios from "axios";

const axios = require('axios');

async function DonationDashboard() {

    let res = await axios.get('http://localhost:3001/donation/getAll');

    let name          = res.data.name;
    let description   = res.data.description;
    let businessDonor = res.data.businessDonor;
    let address       = res.data.address;
    let weight        = res.data.weight;
    let quantity      = res.data.quantity;
    let typeFood      = res.data.typeFood;
    let shelfLife     = res.data.shelfLife;


    const [donation, setDonation] = useState({
        name          : name,
        description   : description,
        businessDonor : businessDonor,
        address       : address,
        weight        : weight,
        quantity      : quantity,
        typeFood      : typeFood,
        shelfLife     : shelfLife,
    });

    return (
        <>
            <div>Doações</div>
            <div>{donation.name        }</div>
            <div>{donation.description }</div>
            <div>{donation.bsinessDonor}</div>
            <div>{donation.address     }</div>
            <div>{donation.weight      }</div>
            <div>{donation.quantity    }</div>
            <div>{donation.typeFood    }</div>
            <div>{donation.shelfLife   }</div>
        </>
    );

}

export default DonationDashboard;


