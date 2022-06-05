const { admin, db } = require("../util/admin");
const { firebase } = require("../util/firebase");
const { getAuth, admin2 } = require("firebase-admin/auth");
db.settings({ ignoreUndefinedProperties: true })

class DonationModel {

    constructor() {

    }
    async getAllDonation(result) {
        await db.collection('Donation').get().then((data) => {
            let donations = [];
            data.forEach((doc) => {
                donations.push({
                    Id: doc.id,
                    Address: doc.data().Address,
                    BusinessDonor: doc.data().BusinessDonor,
                    Description: doc.data().Description,
                    Name: doc.data().Name,
                    Quantity: doc.data().Quantity,
                    ShelfLife: doc.data().ShelfLife,
                    TypeFood: doc.data().TypeFood,
                    Weight: doc.data().Weight
                });
            });
            result(null, donations);

        });
    }

    async getDonationById(id, result) {
        console.log(id);
        db.collection('Donation').doc(id).get().then((doc) => {
            if (!doc.exists) {
                let resultGetUserById = { message: 'No such document!' };
                result(null, resultGetUserById);
            } else {
                let donations = [];
                donations.push({
                    Id: doc.id,
                    Address: doc.data().Address,
                    BusinessDonor: doc.data().BusinessDonor,
                    Description: doc.data().Description,
                    Name: doc.data().Name,
                    Quantity: doc.data().Quantity,
                    ShelfLife: doc.data().ShelfLife,
                    TypeFood: doc.data().TypeFood,
                    Weight: doc.data().Weight
                });
                result(null, donations);
            }
        }).catch(error => {
            result(null, error);
        });
    };

    async addDonation(name, description, businessDonor, address, weight, quantity, typeFood, shelfLife) {
        await db.collection('Donation')
            .add({
                Name: name,
                Description: description,
                BusinessDonor: businessDonor,
                Address: address,
                Weight: weight,
                Quantity: quantity,
                TypeFood: typeFood,
                ShelfLife: shelfLife
            })
            .then((docRef) => {
                let donationIdList = [];

                db.collection('Company').doc(businessDonor).get().then((doc) => {
                    if (doc.exists) {
                        donationIdList = doc.donations;
                        db.collection("Company").doc(businessDonor).update({
                            Donations: admin.firestore.FieldValue.arrayUnion(docRef.id)
                        })
                    } else {
                        console.log("Error creating a new donation, company not found");
                    }
                }).catch(error => {
                    console.log("Error creating a new donation ", error);
                });

                console.log("Successfully created a new donation");

                return true;
            }).catch((error) => {
                console.log("Error creating a new donation ", error);
                return false;
            });
    }


    async removeDonationById(donationId) {
        console.log(donationId)
        db.collection('Donation').doc(donationId).get().then((snapshot) => {
            if (snapshot.exists) {
                let docRef = db.collection('Donation').doc(donationId);
                docRef.delete().then(() => {
                    console.log("Successfully removed donation");
                    return true;
                }).catch(() => {
                    console.log("Error removing a donation ", error);
                    return false;
                });
            } else {
                console.log("Donation not found", error);
                return false;
            }
        });
    };

    async updateDonation(donationId, description, businessDonor, address, weight, quantity, typeFood, shelfLife) {
        db.collection('Donation').doc(donationId).get().then((snapshot) => {
            if (snapshot.exists) {
                let docRef = db.collection('Donation').doc(donationId);
                docRef.update({
                    Description: description,
                    BusinessDonor: businessDonor,
                    Address: address,
                    Weight: weight,
                    Quantity: quantity,
                    TypeFood: typeFood,
                    ShelfLife: shelfLife
                }).then(() => {
                    console.log("Successfully updated donation");
                    return true;
                }).catch(() => {
                    console.log("Donation not updated", error);
                    return false;
                });
            } else {
                console.log("Donation not found", error);
                return false;
            }
        });
    };

}

module.exports = DonationModel;