const { admin, db } = require("../util/admin");
const { getAuth } = require("firebase-admin/auth");

class DonationModel {

    constructor() {

    }

    async add(description, businessDonor, address, weight, quantity, typeFood, shelfLife) {
        await db.collection('Donation')
        .set({
            Description: description,
            BusinessDonor: businessDonor,
            Address: address,
            Weight: weight,
            Quantity: quantity,
            TypeFood: typeFood,
            ShelfLife: shelfLife
        })
        .then(async (ret) => {
           
            return true;
        })
        .catch((error) => {
            console.log("Error creating a new donation. ", error);
            return false;
        })
    }

}

module.exports = DonationModel;