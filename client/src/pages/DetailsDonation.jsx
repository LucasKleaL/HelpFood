import {useEffect, useState} from "react";


const id = window.location.search;

const urlParam = new URLSearchParams(id);

const paramId = urlParam.get("donationId");

console.log(paramId);
console.log("caiu")


function DetailsDonation(){
    // const [donations, setDonation] = useState([]);

    // useEffect(() => {
    //     fetch("http://localhost:3001/donation/getDonationById/:" + donationId, {
    //         method: "GET",
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json"
    //         }
    //     })
    //         .then((res) => res.json())
    //         .then(
    //             (result) => {
    //                 setDonation(result)
    //             }
    //         );
    // }, [])

    // return (
    //     <div>
    //         {/*{donations.map((donation) => (*/}
    //         {/*    <div>{*/}
    //         {/*        donation.Address + ", " +*/}
    //         {/*        donation.BusinessDonor + ", " +*/}
    //         {/*        donation.Description + ", " +*/}
    //         {/*        donation.Name + ", " +*/}
    //         {/*        donation.Quantity + ", " +*/}
    //         {/*        donation.ShelfLife + ", " +*/}
    //         {/*        donation.TypeFood + ", " +*/}
    //         {/*        donation.Weight*/}
    //         {/*    }</div>*/}
    //
    //         {/*))}*/}
    //
    //         <h1>teste</h1>
    //     </div>
    // )

}

export default DetailsDonation;