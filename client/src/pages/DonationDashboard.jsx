import React, { useState, useEffect, useLayoutEffect } from 'react'
import Doacao from "../components/Doacao";

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
        <div className="center">
            {items.map((item) => (
                <div className={"center"}>
                    <div className={"text-align"} style={{backgroundColor:"green"}}><h1>{item.Name}</h1></div>
                    <div><h1>Endereço:</h1> {item.Address}</div>
                    <div><h1>Código doação:</h1> {item.BusinessDonor}</div>
                    <div><h1>Descrição:</h1> {item.Description}</div>
                    <div><h1>Quantidade:</h1> {item.Quantity}</div>
                    <div><h1>Validade:</h1> {item.ShelfLife}</div>
                    <div><h1>Categoria:</h1> {item.TypeFood}</div>
                    <div><h1>Quantidade:</h1> {item.Weight}</div>
                    <div className={"text-align"}><button >Botão</button></div>
                </div>
            ))}
        </div>

    )
}
export default DonationDashboard;


