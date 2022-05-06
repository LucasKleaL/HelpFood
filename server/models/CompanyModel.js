const { admin, db } = require("../util/admin");
const { getAuth } = require("firebase-admin/auth");
db.settings({ ignoreUndefinedProperties: true })

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

    async addCompany() {
        await db.collection('Company').doc()
        .set({
            //TODO
        })
        .then(()=> {
            console.log("Successfully created a new company");

            return true;
        }).catch((error)=>{
            console.log("Error creating a new company ", error);
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

    async updateCompany(companyId) {
        db.collection('Company').doc(companyId).get().then((snapshot) => {
            if (snapshot.exists) {
                let docRef = db.collection('Company').doc(companyId);
                docRef.update({
                    //TODO
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