const { admin, db } = require("../util/admin");
const { getAuth } = require("firebase-admin/auth");

class UserModel {

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
            console.log("Successfully created a new user.", userRecord.uid);
            //creating the user doc in firestore
            await db.collection("Users").doc(userRecord.uid).set({
                cpf: cpf,
                ongName: ongName,
            })
            return true;
        })
        .catch((error) => {
            console.log("Error creating a new donation. ", error);
            return false;
        })
    }

}

module.exports = UserModel;