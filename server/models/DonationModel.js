const { admin, db } = require("../util/admin");
const { firebase, storage } = require("../util/firebase");
const { getStorage, ref, uploadBytes } = require("firebase/storage")
const { getAuth } = require("firebase-admin/auth");
const { v4: uuidv4 } = require('uuid');
const storageRef = admin.storage().bucket(`gs://helpfood-29ce0.appspot.com`);
db.settings({ ignoreUndefinedProperties: true })

class DonationModel {

    constructor() {

    }
    async getAllDonation(result) {
        const snapshot = await db.collection('Donation').get();
        let resultGetAllDonation = snapshot.docs.map(doc => doc.data());
        result(null, resultGetAllDonation);  
    }

    async getDonationById(donationId, result) {
        db.collection('Donation').doc(donationId).get().then((doc) => {
            if (!doc.exists) {
                let resultGetUserById = { message: 'No such document!' };
                result(null, resultGetUserById);
            } else {
                result(null, doc.data());
            }
        }).catch(error => {
            result(null, error);
        });
    };

    async addDonation(name, description, businessDonor, address, weight, quantity, typeFood, shelfLife, donationImage) {
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
        .then((docRef)=> {
            let donationIdList = [];
            const donationId = docRef.id;
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
            const destination = `donations/${docRef.id}.png`;
            const storage = getStorage();
            const storageRef = ref(storage, 'some-child');

            //'file' comes from the Blob or File API
            // uploadBytes(storageRef, donationImage).then((snapshot) => {
           // console.log('Uploaded a blob or file!');
           // });
            
            console.log("Successfully created a new donation");

            return true;
        }).catch((error)=>{
            console.log("Error creating a new donation ", error);
            return false;
        });   
    }

    async uploadImage(destination){

    }

    async removeDonationById(donationId) {
        console.log(donationId)
        db.collection('Donation').doc(donationId).get().then((snapshot) => {
            if (snapshot.exists) {
                let docRef = db.collection('Donation').doc(donationId);
                docRef.delete().then(()=> {
                    console.log("Successfully removed donation");
                    return true;
                }).catch(()=>{
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
                }).then(()=> {
                    console.log("Successfully updated donation");
                    return true;
                }).catch(()=>{
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