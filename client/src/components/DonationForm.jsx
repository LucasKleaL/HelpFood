import React, { useState, useEffect } from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, ThemeProvider } from '@material-ui/core'
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
import InputMask from "react-input-mask";

function DonationForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [businessDonor, setBusinessDonor] = useState("");
  const [nameDonor, setNameDonor] = useState("");
  const [emailDonor, setEmailDonor] = useState("");

  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [weight, setWeight] = useState("");
  const [quantity, setQuantity] = useState("");
  const [typeFood, setTypeFood] = useState("");
  const [shelfLife, setShelfLife] = useState("");

  const MySwal = withReactContent(Swal)

  useEffect(() => {
    Axios.get(window.url+'/user/getCurrentUserId').then(resp => {
      setBusinessDonor(resp.data)
    });
    Axios.get(window.url+'/user/getCurrentUserEmail').then(resp => {
      setEmailDonor(resp.data)
    });
    Axios.get(window.url+'/user/getCurrentUserName').then(resp => {
      setNameDonor(resp.data)
    });
    
  }, [])

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
  function alertEmptyInput() {
    MySwal.fire({
      title: <strong>Todos os campos devem ser preenchidos!</strong>,
      html: <i>Preencha todas as informações e tente novamente.</i>,
      icon: 'error'
    })
  }

  //Consulta o id do usuário que é o mesmo da empresa e em seguida cria a doação no banco
  function addDonation() {
    if (businessDonor === "" | businessDonor === undefined) {
      alertErrorDonation();
    } else {
      postDonation();
    }
  }
  function postDonation() {
    if(name === "" || description === "" || district === "" || weight === "" 
    || quantity === "" || typeFood === "" || shelfLife === "" || street === "" || phone === "" || number === ""){
      alertEmptyInput()
    }else{
    Axios.post(window.url+"/donation/add", {
      name: name,
      description: description,
      businessDonor: businessDonor,
      nameDonor: nameDonor,
      emailDonor: emailDonor,
      district: district,
      weight: weight,
      quantity: quantity,
      typeFood: typeFood,
      shelfLife: shelfLife,
      street: street,
      phone: phone,
      number: number
    }).then((response) => {
      if (response.status === 200) {
        Swal.fire(
          'Sua doação foi registrada com sucesso!',
          'Em breve alguém irá retirá-la.',
          'success'
      ).then((result) => {
         window.location.href = "/myDonations"
      })
      } else {
      }
    });
  }
  }

  const paperStyle = { padding: 20, width: 500, margin: "0 auto"}
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const btnstyle = { margin: '8px 0', }

  const TextFieldSytle = {
    marginTop: "0.5rem"
}

  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}><FastfoodIcon /></Avatar>
          <Typography variant='caption' gutterBottom>Insira os dados da sua doação!</Typography>
        </Grid>
        <TextField label='Nome' placeholder='Insira o nome do alimento' onChange={(e) => { setName(e.target.value) }} fullWidth required />
        <TextField label='Descrição' placeholder='Descreva a doação' type='text' style={TextFieldSytle} onChange={(e) => { setDescription(e.target.value) }} fullWidth required />
        <TextField label='Bairro' placeholder='Insira o bairro de retirada' style={TextFieldSytle} onChange={(e) => { setDistrict(e.target.value) }} fullWidth required />
        <TextField label='Rua' placeholder='Insira a rua' style={TextFieldSytle} onChange={(e) => { setStreet(e.target.value) }} fullWidth required />
        <TextField label='Numero' placeholder='Insira o número do local' style={TextFieldSytle} onChange={(e) => { setNumber(e.target.value) }} fullWidth required />
        <InputMask
          mask="(99)99999-9999"
          value={phone}
          disabled={false}
          onChange={(e) => setPhone(e.target.value)}
        >
          {() => <TextField label='Contato' placeholder='Insira um número de contato' style={TextFieldSytle} fullWidth required />}
        </InputMask>
        <TextField label='Peso' placeholder='Insira o peso total aproximado' style={TextFieldSytle} onChange={(e) => { setWeight(e.target.value) }} fullWidth required />
        <TextField label='Quantidade' placeholder='Insira o total de unidades' style={TextFieldSytle} onChange={(e) => { setQuantity(e.target.value) }} fullWidth required />
        <FormControl variant="standard" style={TextFieldSytle} fullWidth required>
          <InputLabel id="demo-simple-select-standard-label">Tipo de alimento</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={typeFood} label="Tipo de alimento" onChange={(e) => { setTypeFood(e.target.value) }} fullWidth required
          >
            <MenuItem value={"Lanche"}>Lanche</MenuItem>
            <MenuItem value={"Comida"}>Comida</MenuItem>
            <MenuItem value={"Bebida"}>Bebida</MenuItem>
            <MenuItem value={"Verdura"}>Verdura</MenuItem>
            <MenuItem value={"Legume"}>Legume</MenuItem>
            <MenuItem value={"Fruta"}>Fruta</MenuItem>
          </Select>
        </FormControl>

        <InputMask
          mask="99/99/9999"
          value={shelfLife}
          disabled={false}
          onChange={(e) => setShelfLife(e.target.value)}
        >
          {() => <TextField label='Validade' placeholder='Insira a validade do alimento' style={TextFieldSytle} fullWidth required />}
        </InputMask>

        <Button type='submit' color='primary' className='sendButton' variant="contained" style={btnstyle} onClick={addDonation} fullWidth>Enviar</Button>
        
      </Paper>
    </Grid>
  )
}

export default DonationForm;