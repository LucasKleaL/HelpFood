import React, { useState, useEffect } from 'react'

const test = []
function DonationDashboard() {

    const [items, setItems] = useState([]);

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
                setItems(result[0])
                // console.log("entrou")
                console.log(result[0])
                test.push(result[0])
            }
        );
    console.log(test[0])

    return (
        <div>
            <p>data {JSON.stringify(items)}</p>
            {items.map((item) => (
                <div>{item.name}</div>
            ))}
        </div>
    )
}
export default DonationDashboard;


