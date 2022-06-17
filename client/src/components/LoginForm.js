import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Axios from "axios";
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

function LoginForm(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let nonce = "HelpFood#sha256#420"
    let hashPassword = Base64.stringify(sha256(nonce + password));

    function authUser() {
        console.log(hashPassword)
        Axios.post(window.url+"/user/authUser", {
            email: email,
            password: hashPassword
        }).then((response) => {
            console.log("Login response " + response.data);
            if (response.data) {
                window.location.href = window.url+"/dashboard";
            }
        })
            .catch((error) => {
                console.log("Error on login response " + error);
            });

    }

    const paperStyle = { padding: 20, width: 500, margin: "0 auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0', backgroundColor: '#1bbd7e' }

    return (
        <Grid>
            <Paper elevation={0} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <Typography variant='caption' gutterBottom>Entre com os seus dados!</Typography>
                </Grid>
                <TextField label='E-mail' placeholder='Insira o e-mail' onChange={(e) => { setEmail(e.target.value) }} fullWidth required />
                <TextField label='Senha' placeholder='Insira a senha' type='password' onChange={(e) => { setPassword(e.target.value) }} fullWidth required />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Lembre-se de mim"
                />
                <Button type='submit' color='primary' className='sendButton' variant="contained" style={btnstyle} onClick={authUser} fullWidth>Entrar</Button>
                <Typography >
                    <Link href="#" >
                        Esqueceu sua senha?
                    </Link>
                </Typography>
                <Typography > Não possui uma conta?
                    <br />
                    {props.redirectCompany ?
                        <Link href="/company/add" color='blue'>
                            Cadastre-se
                        </Link>
                        :
                        <Link href="/user/add" color='blue'>
                            Cadastre-se
                        </Link>
                    }
                </Typography>
            </Paper>
        </Grid>
    )
}

export default LoginForm;