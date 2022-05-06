import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


function LoginForm(){

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    let history = useHistory();

   /* function logar() {
        firebase.auth().signInWithEmailAndPassword(email, senha)
        .then( async (usuario)=>{

          let uid = usuario.user.uid;
          window.sessionStorage.setItem("uid", uid)

          history.push("/");

        }).catch((error)=>{
          if(error.code === 'auth/weak-password'){
            alert('A senha é muito fraca!')
          }else if(error.code === 'auth/email-already-in-use'){
            alert('O e-mail já está sendo usado.')
          }
        });
      }
      function sair() {
        firebase.auth().signOut();
      }
      */

    const paperStyle={ padding: 20, width: 500, margin: "0 auto" }
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    
    return(
        <Grid>
            <Paper elevation={0} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                     <Typography variant='caption' gutterBottom>Entre com os seus dados!</Typography>
                </Grid>
                <TextField label='E-mail' placeholder='Insira o e-mail' onChange={(e) => { setEmail(e.target.value) }} fullWidth required/>
                <TextField label='Senha' placeholder='Insira a senha' type='password' onChange={(e) => { setSenha(e.target.value) }} fullWidth required/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Lembre-se de mim"
                 />
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Entrar</Button>
                <Typography >
                    <Link href="#" >
                    Esqueceu sua senha?
                    </Link>
                </Typography>
                <Typography > Não possui uma conta?
                    <Link href="#">
                        Cadastre-se
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default LoginForm;