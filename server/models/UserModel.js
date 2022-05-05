const { admin, db } = require("../util/admin");
const { getAuth } = require("firebase-admin/auth");

class UserModel {

    constructor() {

    }

    async add(name, cpf, email, password, ongName) {
        await admin.auth()
        .createUser({
            email: email,
            password: password,
            displayName: name,
        })
        .then(async (userRecord) => {
            console.log("Successfully created a new user.", userRecord.uid);
            //creating the user doc in firestore
            await db.collection("Users").doc(userRecord.uid).set({
                Cpf: cpf,
                OngName: ongName,
            })
            return true;
        })
        .catch((error) => {
            console.log("Error creating a new user. ", error);
            return false;
        })
    }

}

module.exports = UserModel;