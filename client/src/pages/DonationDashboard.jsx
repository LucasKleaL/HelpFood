import { Button } from '@mui/material';
import React, { useState, useEffect, useLayoutEffect } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import "./../styles/dashboard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLemon } from '@fortawesome/free-solid-svg-icons'
function DonationDashboard() {

    const [items, setItems] = useState([]);

    useEffect(() => {
        debugger;
        const response = fetch("http://localhost:3001/donation/getAll", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    setItems(result)
                }
            );
    }, [])

    return (
        <div className="center" style={{ borderRadius: "1px" }}>
            {items.map((item) => (

                <Card sx={{ maxWidth: 315, minWidth: 315, float: "left", margin: 1 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image="https://static.vecteezy.com/ti/vetor-gratis/p1/2554852-seamless-pattern-with-food-on-dark-blue-background-gr%C3%A1tis-vetor.jpg"
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {item.Name}
                        </Typography>
                        <Typography variant="body2" >
                            {item.Description}
                        </Typography>

                    </CardContent>
                    <Divider />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {item.TypeFood + " "}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Validade: {item.ShelfLife}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Solicitar</Button>
                        <Button size="small">Detalhes</Button>
                    </CardActions>
                </Card>
            ))}
        </div>

    )
}
export default DonationDashboard;


