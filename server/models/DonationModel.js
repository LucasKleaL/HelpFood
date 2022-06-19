const { admin, db } = require("../util/admin");
const { firebase } = require("../util/firebase");

const { getAuth, admin2 } = require("firebase-admin/auth");

const { userModel } = require("./UserModel");
const sendMail = require("../util/sendMail");
const UserModel = require("./UserModel");
db.settings({ ignoreUndefinedProperties: true })
class DonationModel {

  constructor() {
  }

  async getAllDonation(result) {
    await db.collection('Donation').get().then((data) => {
      let donations = [];
      data.forEach((doc) => {
        if (doc.data().Active) {
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
        }
      });
      result(null, donations);
    });
  }

  async getDonationById(id, result) {
    db.collection('Donation').doc(id).get().then((doc) => {
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
  async getActiveDonationsByCompanyId(companyId, result) {
    db.collection('Donation').get().then((data) => {
      let donations = [];
      data.forEach((doc) => {
        if (doc.data().BusinessDonor === companyId && doc.data().Active) {
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
        }
      });
      result(null, donations);
    }).catch(error => {
      result(null, error);
    });
  };

  async getDisabledDonationsByCompanyId(companyId, result) {
    db.collection('Donation').get().then((data) => {
      let donations = [];
      data.forEach((doc) => {
        if (doc.data().BusinessDonor === companyId && !doc.data().Active) {
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
        }
      });
      result(null, donations);
    }).catch(error => {
      result(null, error);
    });
  };

  async addDonation(name, description, businessDonor, nameDonor, emailDonor, district, weight, quantity, typeFood, shelfLife, street, number, phone) {
    await db.collection('Donation')
      .add({
        Name: name,
        Description: description,
        BusinessDonor: businessDonor,
        NameDonor: nameDonor,
        EmailDonor: emailDonor,
        District: district,
        Weight: weight,
        Quantity: quantity,
        TypeFood: typeFood,
        ShelfLife: shelfLife,
        Street: street,
        Number: number,
        Phone: phone,
        Active: true
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

  async reserveDonation(donationId, receiverId, receiverName, receiverEmail) {
    console.log(donationId)
    var donationName = "";
    var companyName = "";
    var companyEmail = "";
    var donationAddress = "";
    var userEmail = receiverEmail;
    var userName = receiverName;
    var phone = "";

    await db.collection('Donation').doc(donationId).get().then((snapshot) => {
      const sendEmail = new sendMail();
      if (snapshot.exists) {
        let docRef = db.collection('Donation').doc(donationId);
        donationName = snapshot.data().Name;
        companyName = snapshot.data().NameDonor;
        companyEmail = snapshot.data().EmailDonor;
        donationAddress = snapshot.data().Street + ", " + snapshot.data().Number + ". " + snapshot.data().District + ".";
        phone = snapshot.data().Phone;
        docRef.update({
          Receiver: receiverId,
          Active: false
        }).then(() => {

          console.log("Successfully reserved donation");
          sendEmail.sendMailToCompany(donationName, companyName, companyEmail);
          sendEmail.sendMailToUser(userName, donationName, companyName, companyEmail, userEmail, donationAddress, phone);
          return true;
        }).catch((e) => {
          console.log("Donation not reserved" + e.message);
          return false;
        });
      } else {
        console.log("Donation not found");
        return false;
      }
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
        }).catch((e) => {
          console.log("Error removing a donation " + e.message);
          return false;
        });
      } else {
        console.log("Donation not found");
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
        }).catch((e) => {
          console.log("Donation not updated " + e.message);
          return false;
        });
      } else {
        console.log("Donation not found");
        return false;
      }
    });
  };

}

module.exports = DonationModel;