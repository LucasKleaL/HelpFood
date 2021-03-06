import { React, useEffect, useState } from "react";
import { Container, Grid, Button, Box, TextField, Select, Avatar, Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import MaterialButtonTheme from "./../themes/MaterialButtonTheme";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Axios from "axios";
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import Header from "../components/Header";
import Footer from "../components/Footer";
import ThemeComponent from "./../components/ThemeComponent";

function CompanyRegister () {

    const themeComponent = new ThemeComponent();
    const theme = themeComponent.getActualTheme();

    // company register values
    const [name, setName] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [retryPassword, setRetryPassword] = useState("");

    // company register verify values
    const [isName, setIsName] = useState(false);
    const [isCnpj, setIsCnpj] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isRetryPassword, setIsRetryPassword] = useState(false);

    // inputs states
    const [errorName, setErrorName] = useState(false);
    const [errorNameText, setErrorNameText] = useState("");
    const [errorCnpj, setErrorCnpj] = useState(false);
    const [errorCnpjText, setErrorCnpjText] = useState("");
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorEmailText, setErrorEmailText] = useState("");
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorPasswordText, setErrorPasswordText] = useState("");
    const [errorRetryPassword, setErrorRetryPassword] = useState(false);
    const [errorRetryPasswordText, setErrorRetryPasswordText] = useState("");

    function addCompany() {

        let nonce = "HelpFood#sha256#420"
        let hashPassword = Base64.stringify(sha256(nonce + password));
        
        if (isName && isCnpj && isEmail && isPassword && isRetryPassword) {
            Axios.post(window.url+"/company/add", {
                name: name,
                cnpj: cnpj,
                email: email,
                donations: [""],
                allowed: false,
                password: hashPassword,
            });
        }
        else {
            alert("Por favor preencha os campos cadastrais corretamente.")
        }
    }

    function handleName(event) {
        if (event.length <= 3) {
            setIsName(false);
            setErrorName(true);
            setErrorNameText("O nome deve ter mais de 3 d??gitos.");
        }
        else {
            setErrorName(false);
            setIsName(true);
            setErrorNameText("");
        }
    }

    function handleEmail(event) {
        if (event.length <= 3) {
            setIsEmail(false);
            setErrorEmail(true);
            setErrorEmailText("O email inserido ?? inv??lido.")
        }
        else {
            setIsEmail(true);
            setErrorEmail(false);
            setErrorEmailText("");
        }
    }

    function handleCnpj(event) {
        if (event.length === 14) {
            setIsCnpj(true);
            setErrorCnpj(false);
            setErrorCnpjText("");
        }
        else {
            setIsCnpj(false);
            setErrorCnpj(true);
            setErrorCnpjText("O CNPJ inserido ?? inv??lido");
        }
    }

    function handlePassword (event) {
        if (event.length <= 5) {
            setIsPassword(false);
            setErrorPassword(true);
            setErrorPasswordText("A senha deve ter pelo menos 6 dig??tos.");
        }
        else {
            setIsPassword(true);
            setErrorPassword(false);
            setErrorPasswordText("");
        }
    }

    function handleRetryPassword(event) {
        if (event === password) {
            setIsRetryPassword(true);
            setErrorRetryPassword(false);
            setErrorRetryPasswordText("");
        }
        else {
            setIsRetryPassword(false);
            setErrorRetryPassword(true);
            setErrorRetryPasswordText("A senha inserida n??o confere com a verifica????o.")
        }
    }
    const avatarStyle = { backgroundColor: '#1bbd7e' }

    const BoxStyle = {
        backgroundColor: "var(--white-background)",
        width: "30rem",
        paddingTop: "1.5rem",
        paddingBottom: "1.5rem",
        marginBottom: "5rem",
        borderRadius: "10px",
    }

    const TextFieldSytle = {
        width: "20rem",
        marginTop: "0.5rem"
    }

    const RegisterButtonStyle = {
        width: "5rem",
        height: "2.5rem",
        marginTop: "1rem",
        textTransform: "capitalize"
    }

    const HeaderTitleStyle = {
        color: "var(--white)",
        fontSize: "2rem",
        fontWeight: "900",
        marginLeft: "1rem",
    }

    return (
        <div style={{height: "100%"}}>

            <Header theme={theme} />

            <Container align="center" style={{marginTop: "6rem"}}>

                <div>
                    <Box style={BoxStyle}>
                    <Grid align='center'>
                            <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                            <Typography variant='caption' gutterBottom>Cadastre a sua empresa!</Typography>
                        </Grid>
                            <TextField variant="outlined" type="text" label="Nome da Empresa" 
                            style={{...TextFieldSytle,...{marginTop: "2rem"}}}
                            onChange={(e) => {setName(e.target.value); handleName(e.target.value)}}
                            error={errorName}
                            helperText={errorNameText}
                            />
                            <TextField variant="outlined" label="CNPJ" type="text" 
                            style={TextFieldSytle}
                            onChange={(e) => {setCnpj(e.target.value); handleCnpj(e.target.value)}}
                            error={errorCnpj}
                            helperText={errorCnpjText}
                            />
                            <TextField variant="outlined" label="Email" type="EMAIL" 
                            style={TextFieldSytle}
                            onChange={(e) => {setEmail(e.target.value); handleEmail(e.target.value)}}
                            error={errorEmail}
                            helperText={errorEmailText}
                            />
                            <TextField variant="outlined" label="Senha" type="password" 
                            style={TextFieldSytle}
                            onChange={(e) => {setPassword(e.target.value); handlePassword(e.target.value)}}
                            error={errorPassword}
                            helperText={errorPasswordText}
                            />
                            <TextField variant="outlined" label="Confirme a senha" type="password" 
                            style={TextFieldSytle}
                            onChange={(e) => {setRetryPassword(e.target.value); handleRetryPassword(e.target.value)}}
                            error={errorRetryPassword}
                            helperText={errorRetryPasswordText}
                            />
                        <div>
                            <Button variant="contained" color="primary" style={RegisterButtonStyle} onClick={addCompany}>Cadastrar</Button>
                        </div> 
                    </Box>
                </div>

            </Container>

            <Footer theme={theme} /> 

        </div>
    )
}

export default CompanyRegister;
