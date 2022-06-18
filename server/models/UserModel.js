const { admin, db } = require("../util/admin");
const { firebaseConfig } = require("../util/firebase");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const { initializeApp } = require('firebase/app')

let auth;

class UserModel {

    constructor() {
        initializeApp(firebaseConfig);
        auth = getAuth();
    }
    async authUser(email, password) {
        let isAuth = false;
        try {
            let userCredential = await signInWithEmailAndPassword(auth, email, password)
            isAuth = true;
            console.log("Successful login");
        } catch (error) {
            console.log("Email ou senha incorretos." + error.message)
        }
        return isAuth;
    }

    async getUserAuth() {
        let isAuth = false;
        await getAuth().onAuthStateChanged((user) => {
            if (user) {
                const uid = user.uid;
                isAuth = true;
            }
        });
        return isAuth;
    }

    getCurrentUserId(result) {
        initializeApp(firebaseConfig)
        const auth = getAuth();
        if (auth.currentUser !== null)
            result(null, auth.currentUser.uid);
    }

    getCurrentUserName(result) {
        initializeApp(firebaseConfig)
        const auth = getAuth();
        if (auth.currentUser !== null)
            result(null, auth.currentUser.displayName);
    }
    getCurrentUserEmail(result) {
        initializeApp(firebaseConfig)
        const auth = getAuth();
        if (auth.currentUser !== null)
            result(null, auth.currentUser.email);
    }

    getCurrentCompanyData(result) {
        initializeApp(firebaseConfig)
        const auth = getAuth();
        if (auth.currentUser == null) {
            let resultGetUserData = { message: 'No such document!' };
            result(null, resultGetUserData);
        } else {
            db.collection('Company').doc(auth.currentUser.uid).get().then((doc) => {
                if (!doc.exists) {
                    let resultGetUserById = { message: 'No such document!' };
                    result(null, resultGetUserById);
                } else {
                    let companyData = [];
                    companyData.push({
                        Id: auth.currentUser.uid,
                        Email: auth.currentUser.email,
                        EmailVerified: auth.currentUser.emailVerified,
                        Name: auth.currentUser.displayName,
                        Allowed: doc.data().allowed,
                        Cnpj: doc.data().cnpj,
                        Donations: doc.data().Donations,
                    });
                    result(null, companyData);
                }
            }).catch(error => {
                result(null, error);
            });
        }
    }

    async getAllUsers(result) {
        const snapshot = await db.collection('Users').get();
        let resultGetAllUsers = snapshot.docs.map(doc => doc.data());
        result(null, resultGetAllUsers);
    }

    async getAllOngs(result) {
        const snapshot = await db.collection('Users').get();
        let resultGetAllUsers = snapshot.docs.map(doc => doc.data().ongName);
        var unique = resultGetAllUsers.filter((v, i, a) => a.indexOf(v) === i);
        result(null, unique);
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

    async isBusiness(userId, result) {
        db.collection('Company').doc(userId).get().then((doc) => {
            if (!doc.exists) {
                let resultGetUserById = { message: 'No such document!' };
                result(null, false);
            } else {
                result(null, true);
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

    async logout() {
        getAuth().signOut()
            .then((result) => {
                console.log("Sucessful signout.")
                return true;
            })
            .catch((error) => {
                console.log("Error on signout " + error);
                return false;
            })
    }

}

module.exports = UserModel;