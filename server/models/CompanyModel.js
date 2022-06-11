const { admin, db } = require("../util/admin");
const { getAuth } = require("firebase-admin/auth");

class CompanyModel {

    constructor() {

    }
    async getAllCompany(result) {
        const snapshot = await db.collection('Company').get();
        let resultGetAllCompany = snapshot.docs.map(doc => doc.data());
        result(null, resultGetAllCompany);  
    }

    async getCompanyById(companyId, result) {
        db.collection('Company').doc(companyId).get().then((doc) => {
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
    async getCompanyData(id, result) {
        db.collection('Company').doc(id).get().then((doc) => {
            if (!doc.exists) {
                let resultGetUserById = { message: 'No such document!' };
                result(null, resultGetUserById);
            } else {
                let donations = [];
                donations.push({
                    Id: doc.id,
                    District: doc.data().District,
                    BusinessDonor: doc.data().BusinessDonor,
                    Description: doc.data().Description,
                    Name: doc.data().Name,
                    Quantity: doc.data().Quantity,
                    ShelfLife: doc.data().ShelfLife,
                    TypeFood: doc.data().TypeFood,
                    Weight: doc.data().Weight,
                    Street: doc.data().District,
                    Number: doc.data().Number,
                    Phone: doc.data().Phone,
                    Active: doc.data().Active
                });
                result(null, donations);
            }
        }).catch(error => {
            result(null, error);
        });
    };

    async addCompany(name, cnpj, email, donations, allowed, password) {
        await admin.auth()
        .createUser({
            email: email,
            password: password,
            displayName: name,
        })
        .then(async (companyRecord) => {
            console.log("Successfully created a new company. ", companyRecord.uid);
            //creating the company doc in firestore
            await db.collection("Company").doc(companyRecord.uid).set({
                Cnpj: cnpj,
                Donations: donations,
                Allowed: allowed,
            })
            return true;
        })
        .catch((error) => {
            console.log("Error creating a new company.");
            return false;
        });
    }

    async removeCompanyById(companyId) {
        console.log(companyId)
        db.collection('Company').doc(companyId).get().then((snapshot) => {
            if (snapshot.exists) {
                let docRef = db.collection('Company').doc(companyId);
                docRef.delete().then(()=> {
                    console.log("Successfully removed company");
                    return true;
                }).catch(()=>{
                    console.log("Error removing a company ", error);
                    return false;
                });
            } else {
                console.log("Company not found", error);
                return false;
            }
        });
    };

    async updateCompany(companyId, name, cnpj, donations, allowed) {
        db.collection('Company').doc(companyId).get().then((snapshot) => {
            if (snapshot.exists) {
                let docRef = db.collection('Company').doc(companyId);
                docRef.update({
                    Name: name,
                    Cnpj: cnpj,
                    Donations: donations,
                    Allowed: allowed
                }).then(()=> {
                    console.log("Successfully updated company");
                    return true;
                }).catch(()=>{
                    console.log("Company not updated", error);
                    return false;
                });
            } else {
                console.log("Company not found", error);
                return false;
            }
        });
    };
    
}

module.exports = CompanyModel;