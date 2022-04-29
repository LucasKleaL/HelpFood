import { React, useState } from "react";
import { Container, Grid, Button, Box, TextField, Select } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import MaterialButtonTheme from "./../themes/MaterialButtonTheme";

function UserRegister () {

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
        <div style={{height: "100%"}}>
            <Container align="center">

                <header>

                </header>

                <div>
                    <Box style={BoxStyle}>
                        <div>
                            <TextField variant="outlined" type="text" label="Nome" style={{...TextFieldSytle,...{marginTop: "2rem"}}} />
                            <TextField variant="outlined" label="CPF" type="text" style={TextFieldSytle} />
                            <TextField variant="outlined" label="Email" type="EMAIL" style={TextFieldSytle} />
                            <TextField variant="outlined" label="Nome da ONG" type="text" style={TextFieldSytle} />
                            <TextField variant="outlined" label="Senha" type="password" style={TextFieldSytle} />
                            <TextField variant="outlined" label="Confirme a senha" type="password" style={TextFieldSytle} />
                        </div>
                        <div>
                            <Button variant="contained" color="primary" style={RegisterButtonStyle}>Cadastrar</Button>
                        </div> 
                    </Box>
                </div>

            </Container>
        </div>
    )
}

export default UserRegister;
