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
        <div>
            {items.map((item) => (
                <div>{
                    item.Address + ", " +
                    item.BusinessDonor + ", " +
                    item.Description + ", " +
                    item.Name + ", " +
                    item.Quantity + ", " +
                    item.ShelfLife + ", " +
                    item.TypeFood + ", " +
                    item.Weight
                }</div>

            ))}
        </div>
    )
}
export default DonationDashboard;


