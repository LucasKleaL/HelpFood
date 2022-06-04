import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import FastfoodIcon from '@mui/icons-material/Fastfood';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Select, { SelectChangeEvent } from '@mui/material/Select';

function DonationForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [businessDonor, setBusinessDonor] = useState("");
  const [address, setAddress] = useState("");
  const [weight, setWeight] = useState("");
  const [quantity, setQuantity] = useState("");
  const [typeFood, setTypeFood] = useState("");
  const [shelfLife, setShelfLife] = useState("");
  const MySwal = withReactContent(Swal)


  function alertSuccessDonation() {
    MySwal.fire({
      title: <strong>Doação foi registrada com sucesso!</strong>,
      html: <i>Em breve alguém irá retirá-la.</i>,
      icon: 'success'
    })
  }

  function alertErrorDonation() {
    MySwal.fire({
      title: <strong>Erro ao registrar doação!</strong>,
      html: <i>Tente novamente.</i>,
      icon: 'error'
    })
  }

  //Consulta o id do usuário que é o mesmo da empresa e em seguida cria a doação no banco
  function addDonation() {
    Axios.get('http://localhost:3001/user/getCurrentUserId').then(resp => {
      setBusinessDonor(resp.data)
    });
    if (businessDonor === "" | businessDonor === undefined) {
      return;
    } else {
      postDonation();
    }
  }
  function postDonation() {
    Axios.post("http://localhost:3001/donation/add", {
      name: name,
      description: description,
      businessDonor: businessDonor,
      address: address,
      weight: weight,
      quantity: quantity,
      typeFood: typeFood,
      shelfLife: shelfLife
    }).then((response) => {
      if (response.status === 200) {
        alertSuccessDonation()
      }else{
        alertErrorDonation()
      }
    });
  }

  const paperStyle = { padding: 20, width: 500, margin: "0 auto" }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const btnstyle = { margin: '8px 0', backgroundColor: '#1bbd7e' }

  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}><FastfoodIcon /></Avatar>
          <Typography variant='caption' gutterBottom>Insira os dados da sua doação!</Typography>
        </Grid>
        <TextField label='Nome' placeholder='Insira o nome do alimento' onChange={(e) => { setName(e.target.value) }} fullWidth required />
        <TextField label='Descrição' placeholder='Descreva a doação' type='text' onChange={(e) => { setDescription(e.target.value) }} fullWidth required />
        <TextField label='Endereço' placeholder='Insira o endereço de retirada' onChange={(e) => { setAddress(e.target.value) }} fullWidth required />
        <TextField label='Peso' placeholder='Insira o peso total aproximado' onChange={(e) => { setWeight(e.target.value) }} fullWidth required />
        <TextField label='Quantidade' placeholder='Insira o total de unidades' onChange={(e) => { setQuantity(e.target.value) }} fullWidth required />
        <FormControl variant="standard" fullWidth required>
        <InputLabel id="demo-simple-select-standard-label">Tipo de alimento</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={typeFood} label="Tipo de alimento" onChange={(e) => { setTypeFood(e.target.value) }} fullWidth required
        >
          <MenuItem value={"Lanche"}>Lanche</MenuItem>
          <MenuItem value={"Comida"}>Comida</MenuItem>
          <MenuItem value={"Bebida"}>Bebida</MenuItem>
          <MenuItem value={"Verduras"}>Verdura</MenuItem>
          <MenuItem value={"Legume"}>Legume</MenuItem>
          <MenuItem value={"Fruta"}>Fruta</MenuItem>

        </Select>
        </FormControl>

        <TextField label='Validade' type='date' onChange={(e) => { setShelfLife(e.target.value) }} fullWidth required />

        <Button type='submit' color='primary' className='sendButton' variant="contained" style={btnstyle} onClick={addDonation} fullWidth>Enviar</Button>

      </Paper>
    </Grid>
  )
}

export default DonationForm;