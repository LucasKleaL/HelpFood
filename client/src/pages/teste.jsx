import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import FastfoodIcon from '@mui/icons-material/Fastfood';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Axios from "axios";

const axios = require('axios');
    const test = []
function DonationDashboard() {

    //let res = axios.get('http://localhost:3001/donation/getAll');
    //console.log(res.data)

    // let Name          = res.data.Name;
    // let Description   = res.data.Description;
    // let BusinessDonor = res.data.BusinessDonor;
    // let Address       = res.data.Address;
    // let Weight        = res.data.Weight;
    // let Quantity      = res.data.Quantity;
    // let TypeFood      = res.data.TypeFood;
    // let ShelfLife     = res.data.ShelfLife;
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


    // return (
    //     <>
    //         <div>Doaçõsses</div>
    //         <div>{Name        }</div>
    //         <div>{Description }</div>
    //         <div>{BusinessDonor}</div>
    //         <div>{Address     }</div>
    //         <div>{Weight      }</div>
    //         <div>{Quantity    }</div>
    //         <div>{TypeFood    }</div>
    //         <div>{ShelfLife   }</div>
    //     </>
    // );


    // async function fetchData() {
    //     const data = await response.json();
    //     data.forEach(obj => {
    //         Object.entries(obj).forEach(([key, value]) => {
    //             console.log(`${key} ${value}`);
    //         });
    //         console.log('-------------------');
    //     });
    // }


    const [items, setItems] = useState([]);

    const response = fetch("http://localhost:3001/donation/getAll", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        //.then((res) => res.json())
        .then(
            (result) => {
                setItems(result[0])
                // console.log("entrou")
                console.log(result[0])
                test.push(result[0])
            }
        );
    console.log(test[0])

    return (
        <div>
            <h1>hhhhhhhhhhhhhhhh</h1>
            <p>data {JSON.stringify(items)}</p>
            {items.map((item) => (
                <div>{item.name}</div>
            ))}
        </div>
    )

    //var array = Object.keys(response).map(i => JSON.parse(response[Number(i)]));

    // var donation = array.map(entrada => {
    //     return {
    //         'valor': entrada.valor,
    //         'nosso_numero': entrada.nosso_numero,
    //         'numero_documento': entrada.documento,
    //         'cedente': entrada.cedente,
    //         'cedente_cnpj': entrada.cedente_cnpj,
    //         'agencia': entrada.agencia,
    //         'codigo_cedente': entrada.codigo_cedente,
    //     }
    // });

    //console.log(boletos);

//     const [donation, setDonation] = useState([]);
//
//     async function getAllPosts() {
//         await axios.get('http://localhost:3001/donation/getAll')
//             .then((snapshot) => {
//                 let snapshotArray = [];
//                 snapshot.docs.map((doc) => snapshotArray.push([doc.data(), doc.id]));
//                 setDonation(snapshotArray);
//             })
//
//         return (
//             getAllPosts(),
//             <div>
//                 className {
//                     donation.map(donation => {
//
//                         return (
//                             <donation
//                                 name={donation[0].name}
//                                 description={donation[0].description}
//                                 businessdonor={donation[0].businessdonor}
//                                 address={donation[0].address}
//                                 weight={donation[0].weight}
//                                 quantity={donation[0].quantity}
//                                 typefood={donation[0].typefood}
//                                 shelflife={donation[0].shelflife}
//                             />
//                         )
//                     })
//                 }
// <h1>ed2cer</h1>
//             </div>
//         )
//     }


}
export default DonationDashboard;


