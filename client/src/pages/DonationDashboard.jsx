import React, { useState, useEffect, useLayoutEffect } from 'react'

const teste = []
function DonationDashboard() {

    const [items, setItems] = useState([]);

    useLayoutEffect(() => {
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
                    debugger;
                }
            );
    })

    //console.log(test[0])
    console.log(teste)
    debugger
    return (

        <html>
            <body>
                 <div>
                    <p id="demo"></p>

                    <script>
                        const txt = {teste}
                        const obj = JSON.parse(txt);
                        document.getElementById("demo").innerHTML = obj.ShelfLife + ", " + obj.Name;
                    </script>

                    <p>data {JSON.stringify(items)}</p>
                    {items.map((item) => (
                        <div>{item.name}</div>
                    ))}
                </div>
            </body>
        </html>


    )
    debugger
}
export default DonationDashboard;


