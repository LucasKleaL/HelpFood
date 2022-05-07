const { admin, db } = require("../util/admin");
const { firebaseConfig } = require("../util/firebase");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const { initializeApp } = require('firebase/app')
class UserModel {

    constructor() {

    }
    async authUser(email, password) {
        initializeApp(firebaseConfig)
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            const user = userCredential.user;

            console.log("Logado com sucesso" + user.name)

        }).catch((error)=>{
          console.log("Email ou senha incorretos." + error.message)
        });
    }

    async getAllUsers(result) {
        const snapshot = await db.collection('Users').get();
        let resultGetAllUsers = snapshot.docs.map(doc => doc.data());
        result(null, resultGetAllUsers);
    }

    async getUserById(userId, result) {
        db.collection('Users').doc(userId).get().then((doc) => {
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

    async removeUserById(userId) {
        getAuth()
            .deleteUser(userId)
            .then(() => {
                db.collection('Users').doc(userId).get().then((snapshot) => {
                    if (snapshot.exists) {
                        let docRef = db.collection('Users').doc(userId);
                        docRef.delete().then(() => {
                            console.log("Successfully removed user from firestore");
                            return true;
                        }).catch(() => {
                            console.log("Error removing a user from firestore", error);
                            return false;
                        });
                    } else {
                        console.log("User not found", error);
                        return false;
                    }
                });
            })
            .catch((error) => {
                console.log('Error deleting user:', error);
            });

    };

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
                    cpf: cpf,
                    ongName: ongName,
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