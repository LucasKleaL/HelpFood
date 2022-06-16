import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Box, Typography, TextField, Modal } from "@material-ui/core";
import Axios from "axios";

import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

function LoginModal(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(true);

    useEffect(() => {
        handleOpen()
    });

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    async function login() {
        let nonce = "HelpFood#sha256#420"
        let hashPassword = Base64.stringify(sha256(nonce + password));
        await Axios.post("http://localhost:3001/user/authUser", {
          email: email,
          password: hashPassword
        }).then((response) => {
            console.log("Login response "+response.data);
            debugger
            if (response.data) {
                handleClose();
                window.location.reload();
            }
        })
        .catch((error) => {
            console.log("Error on login response "+error);
        });
    }

    const ModalBoxStyle = {
        width: "30rem",
        backgroundColor: "var(--white-background)",
        borderRadius: "10px"
    }

    const ModalTextFieldStyle = {
        width: "20rem",
        marginTop: "1rem",
    }

    const LoginButtonStyle = {
        width: "5rem",
        height: "2.5rem",
        marginTop: "1rem",
        textTransform: "capitalize"
    }

    return (
        <div>
                <Modal open={open} onClose={handleClose} style={{"marginTop": "10%"}}>

                    <Container align="center" maxwidth="lg" style={{"border": "none"}}>
                        <Box style={ModalBoxStyle}>

                            <div>
                                <TextField label="Email" type="email" placeholder="Insira seu email" style={ModalTextFieldStyle} onChange={ (e) => { setEmail(e.target.value) } } />
                                <TextField label="Senha" type="password" placeholder="Insira sua senha" style={ModalTextFieldStyle} onChange={ (e) => { setPassword(e.target.value) } } />
                            </div>
                            
                            <div>
                                <Button color="primary" variant="contained" style={LoginButtonStyle} onClick={login} >Login</Button>
                            </div>

                            <div style={{"paddingTop": "1rem", "paddingBottom": "1rem"}}>
                                <Typography >Não possui cadastro?
                                    {
                                        props.isCompany ? 
                                        <Link to="/company/add" style={{"textDecoration": "none"}} onClick={handleClose}> <b className="b-signup"> Criar conta</b></Link> 
                                        : 
                                        <Link to="/user/add" style={{"textDecoration": "none"}} onClick={handleClose}> <b className="b-signup"> Criar conta</b></Link> 
                                    }
                                    
                                </Typography>
                            </div>

                        </Box>
                    </Container>

                </Modal>
        </div>
    )

}

export default LoginModal;