import { Button } from '@mui/material';
import React, { useState, useEffect, useLayoutEffect } from 'react'
import "./../styles/dashboard.css";
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

                <div className={"containerCard"} style={{float: "left", padding: "10px" }}>
                    <div _ngcontent-rkn-c119="" style={{padding: "0px"}} className="card flex-row align-items-center m-2 ng-star-inserted">
                        <div _ngcontent-rkn-c119="" className="col-5 image-container">
                            <img _ngcontent-rkn-c119="" alt="HelpFood" src="https://app.comidainvisivel.com.br/assets/images/alimento/thum_nophoto1.jpg" /></div>
                        <div _ngcontent-rkn-c119="" className="col-7 card-container pl-2"><div _ngcontent-rkn-c119="" className="card-content-header d-flex justify-content-between align-items-center w-100 pb-2">
                            <div _ngcontent-rkn-c119="" className="card-content-title flex-1"> {item.TypeFood} </div><div _ngcontent-rkn-c119="" className="card-distancia"> 297km </div>
                        </div>
                            <div _ngcontent-rkn-c119="" className="card-content-body">
                                <h6 _ngcontent-rkn-c119="" className="text-uppercase font-weight-bold">{item.Name}</h6>
                                <p _ngcontent-rkn-c119="">{item.Weight}</p>
                                <p _ngcontent-rkn-c119="">Fracionamento: {item.Quantity} un.</p>
                                <Button variant="outlined">Solicitar</Button>
                            </div>
                        </div>
                        <div _ngcontent-rkn-c119="" className="row position-absolute pin-card">

                        </div>
                    </div>
                </div>
            ))}
        </div>

    )
}
export default DonationDashboard;


