const { admin, db } = require("../util/admin");
const { getAuth } = require("firebase-admin/auth");

class DonationModel {

    constructor() {

    }

    async addDonation(body, result) {
        await db.collection('Donation')
        .set({
            Description: body.description,
            BusinessDonor: body.businessDonor,
            Address: body.address,
            Weight: body.weight,
            Quantity: body.quantity,
            TypeFood: body.typeFood,
            ShelfLife: body.shelfLife
        })
        .then(()=> {
            let resultAddDonation = { message: 'Donation Inserted Successfully' };
            result(null, resultAddDonation);
        }).catch((error)=>{
            console.log(error); 
            let resultAddDonation = { message: 'Donation not inserted' };
            result(null, resultAddDonation);
        });   
    }

    async removeDonationById(donationId, result) {
        db.collection('Donation').doc(donationId).get().then((snapshot) => {
            if (snapshot.exists) {
                let docRef = db.collection('Donation').doc(donationId);
                docRef.delete().then(()=> {
                    let resultDeleteDonationById = { message: 'Donation Deleted Successfully' };
                    result(null, resultDeleteDonationById);
                }).catch(()=>{
                    let resultDeleteDonationById = { message: 'Donation Not Deleted' };
                    result(null, resultDeleteDonationById);
                });
            } else {
                let resultDeleteDonationById = { message: 'Donation Not Found' };
                result(null, resultDeleteDonationById);
            }
        });
    };

    async updateDonation(body, result) {
        dbFirestore.collection('Donation').doc(body.donationId).get().then((snapshot) => {
            if (snapshot.exists) {
                let docRef = dbFirestore.collection('Donation').doc(body.donationId);
                docRef.update({
                    Description: body.description,
                    BusinessDonor: body.businessDonor,
                    Address: body.address,
                    Weight: body.weight,
                    Quantity: body.quantity,
                    TypeFood: body.typeFood,
                    ShelfLife: body.shelfLife
                }).then(()=> {
                    let resultUpdateDonation = { message: 'DonationInfo Updated Successfully' };
                    result(null, resultUpdateDonation);
                }).catch(()=>{
                    let resultUpdateDonation = { message: 'DonationInfo Not Updated' };
                    result(null, resultUpdateDonation); 
                });
            } else {
                let resultUpdateDonation = { message: 'Donation Not Found' };
                result(null, resultUpdateDonation);
            }
        });
    };
    
}

module.exports = DonationModel;