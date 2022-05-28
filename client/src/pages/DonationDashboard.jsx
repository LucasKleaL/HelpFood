import React, { useState, useEffect, useLayoutEffect } from 'react'


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

        <html>
            <body>
                <div>
                    <p>data {JSON.stringify(items)}</p>
                    {items.map((item) => (
                        <div>{item.name}</div>
                    ))}
                </div>
            </body>
        </html>
    )
}
export default DonationDashboard;


