import { React, useState } from "react";
import { Container, Grid, Button, Box, TextField, Select } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import MaterialButtonTheme from "./../themes/MaterialButtonTheme";
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import Axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InputMask from "react-input-mask";
import ThemeComponent from "../components/ThemeComponent";

function UserRegister() {

    const themeComponent = new ThemeComponent();
    const theme = themeComponent.getActualTheme();

    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [ongName, setOngName] = useState("");
    const [password, setPassword] = useState("");
    const [retryPassword, setRetryPassword] = useState("");

    function addUser() {
        let nonce = "HelpFood#sha256#420"
        let hashPassword = Base64.stringify(sha256(nonce + password));

        Axios.post(window.url+"/user/add", {
            name: name,
            cpf: cpf,
            email: email,
            ongName: ongName,
            password: hashPassword,
            retryPassword: retryPassword
        });
    }

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

    return (
        <div style={{ height: "100%" }}>

            <Header theme={theme} />

            <Container align="center" style={{marginTop: "6rem"}}>

                <div>
                    <Box style={BoxStyle}>
                        <div>
                            <TextField variant="outlined" type="text" label="Nome"
                                style={{ ...TextFieldSytle, ...{ marginTop: "2rem" } }}
                                onChange={(e) => { setName(e.target.value) }}
                            />
                            <InputMask
                                mask="999.999.999-99"
                                value={cpf}
                                disabled={false}
                                onChange={(e) => setCpf(e.target.value)}
                            >
                                {() => <TextField variant="outlined" label="CPF" style={TextFieldSytle} />}
                            </InputMask>
                            <TextField variant="outlined" label="Email" type="EMAIL"
                                style={TextFieldSytle}
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                            <TextField variant="outlined" label="Nome da ONG" type="text"
                                style={TextFieldSytle}
                                onChange={(e) => { setOngName(e.target.value) }}
                            />
                            <TextField variant="outlined" label="Senha" type="password"
                                style={TextFieldSytle}
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                            <TextField variant="outlined" label="Confirme a senha" type="password"
                                style={TextFieldSytle}
                                onChange={(e) => { setRetryPassword(e.target.value) }}
                            />
                        </div>
                        <div>
                            <Button variant="contained" color="primary" style={RegisterButtonStyle} onClick={addUser}>Cadastrar</Button>
                        </div>
                    </Box>
                </div>

            </Container>

            <Footer theme={theme} />

        </div>
    )
}

export default UserRegister;
