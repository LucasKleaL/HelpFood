// import React, { useState, useEffect } from 'react'
// import { useHistory } from "react-router-dom";
// import { Redirect } from 'react-router'
// import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
// import FastfoodIcon from '@mui/icons-material/Fastfood';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Axios from "axios";
//
// const axios = require('axios');
//
// async function getDonations() {
//
//     let res = await axios.get('http://localhost:3001/donation/getAll');
//
//     let name = res.data.name;
//     let description = res.data.description;
//     let bsinessDonor = res.data.businessDonor;
//     let address = res.data.address;
//     let weight = res.data.weight;
//     let quantity = res.data.quantity;
//     let typeFood = res.data.typeFood;
//     let shelfLife = res.data.shelfLife;
//
//     let nOfFollowers = res.data.followers;
//     let location = res.data.location;
//
//     console.log(`# of followers: ${nOfFollowers}`)
//     console.log(`Location: ${location}`)
// }
//
// getNumberOfFollowers();
//
// function DonationForm(){
//     const [name, getName] = useState("");
//     const [description, getDescription] = useState("");
//     const [businessDonor, getBusinessDonor] = useState("");
//     const [address, getAddress] = useState("");
//     const [weight, getWeight] = useState("");
//     const [quantity, getQuantity] = useState("");
//     const [typeFood, getTypeFood] = useState("");
//     const [shelfLife, getShelfLife] = useState("");
//
//     //Consulta o id do usuário que é o mesmo da empresa e em seguida cria a doação no banco
//     function getDonation() {
//       Axios.get('http://localhost:3001/donation/getAll').then(resp => {
//           shelfLife
//           typeFood
//           quantity
//           name
//           weight
//           address
//           description
//
//         getBusinessDonor(resp.data)
//       });
//       if(businessDonor === "" | businessDonor === undefined){
//         return;
//       }else{
//         postDonation();
//       }
//   }
//
//
// export default DonationForm;