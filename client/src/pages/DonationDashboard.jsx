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
        <div>
            {items.map((item) => (
                <div style={{backgroundColor:"green"}}>
                    {item.BusinessDonor}
                    <div><h1>teste</h1></div>
                    <div style={{backgroundColor:"black"}}>{item.Address}</div>
                    <div>{item.Address}</div>
                    <div>{item.Address}</div>
                </div>
            ))}
        </div>

    )
}
export default DonationDashboard;


