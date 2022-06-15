import {useEffect, useState} from "react";

const DetailsDonation = (donationId) => {

    const [donations, setDonation] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/donation/getDonationById/:" + donationId, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    setDonation(result)
                }
            );
    }, [])

    return (
        <div>
            {donations.map((donation) => (
                <div>{
                    donation.Address + ", " +
                    donation.BusinessDonor + ", " +
                    donation.Description + ", " +
                    donation.Name + ", " +
                    donation.Quantity + ", " +
                    donation.ShelfLife + ", " +
                    donation.TypeFood + ", " +
                    donation.Weight
                }</div>

            ))}
        </div>
    )

}

export default DetailsDonation;