import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import FastfoodIcon from '@mui/icons-material/Fastfood';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Axios from "axios";

const axios = require('axios');
 function DonationDashboard() {

    let res = axios.get('http://localhost:3001/donation/getAll');

     let Name          = res.data.Name;
     let Description   = res.data.Description;
     let BusinessDonor = res.data.BusinessDonor;
     let Address       = res.data.Address;
     let Weight        = res.data.Weight;
     let Quantity      = res.data.Quantity;
     let TypeFood      = res.data.TypeFood;
     let ShelfLife     = res.data.ShelfLife;
    //
    //
    // const [donation, setDonation] = useState({
    //     name          : name,
    //     description   : description,
    //     businessDonor : businessDonor,
    //     address       : address,
    //     weight        : weight,
    //     quantity      : quantity,
    //     typeFood      : typeFood,
    //     shelfLife     : shelfLife,
    // });

    // const [donation, setDonation] = useState({
    //     name          : 'name',
    //     description   : 'description',
    //     businessDonor : 'businessDonor',
    //     address       : 'address',
    //     weight        : 'weight',
    //     quantity      : 'quantity',
    //     typeFood      : 'typeFood',
    //     shelfLife     : 'shelfLife',
    // });


    return (
        <>
            <div>Doaçõsses</div>
            <div>{Name        }</div>
            <div>{Description }</div>
            <div>{BusinessDonor}</div>
            <div>{Address     }</div>
            <div>{Weight      }</div>
            <div>{Quantity    }</div>
            <div>{TypeFood    }</div>
            <div>{ShelfLife   }</div>
        </>
    );

}

export default DonationDashboard;


