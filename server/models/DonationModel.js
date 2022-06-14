const { admin, db } = require("../util/admin");
const { firebase } = require("../util/firebase");
const nodemailer = require('nodemailer');
const { getAuth, admin2 } = require("firebase-admin/auth");
const SMTP_CONFIG = require("../util/smtp");
const { userModel } = require("./UserModel")
db.settings({ ignoreUndefinedProperties: true })
class DonationModel {

    constructor() {

    }
    async sendMailToCompany(donationName, companyName, companyEmail) {
        let transporter = nodemailer.createTransport({
            service: "hotmail",
            host: SMTP_CONFIG.host,
            port: SMTP_CONFIG.port,
            secure: false,
            auth: {
                user: SMTP_CONFIG.user,
                pass: SMTP_CONFIG.pass
            },
            tls: {
                ciphers: 'SSLv3'
            }
        });
        let info = await transporter.sendMail({
            from: '"HelpFood" <helpfoodapp@hotmail.com>', // sender address
            to: companyEmail, // list of receivers
            subject: "Você recebeu um pedido de doação!", // Subject line
            html: `<html>
            <head>
              <meta charset="utf-8">
              <title></title>
            </head>
            <body>
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                style="margin:0px auto;background:#fff;background-color:#fff;width:600px!important;max-width:600px;text-align:center"
                width="600">
                <tbody>
                  <tr>
                    <td
                      style="direction:ltr;font-size:0px;padding:0px 0;padding-bottom:0;padding-top:0px;padding-left:0px;padding-right:0px;text-align:center">
                      <div style="line-height:22px;margin:0px auto;max-width:600px">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
                          <tbody>
                            <tr>
                              <td style="direction:ltr;font-size:0px;padding:20px 0 20px 0;text-align:center">
                                <div class="m_9004413157721473316mj-column-per-100"
                                  style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                    <tbody>
                                      <tr>
                                        <td style="vertical-align:top;padding:0;text-align:center" valign="top" align="center">
                                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                            <tbody>
                                              <tr>
                                                <td align="center"
                                                  style="font-size:0px;padding:0;word-break:break-word;text-align:center">
                                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                                    style="border-collapse:collapse;border-spacing:0px">
                                                    <tbody>
                                                      <tr>
                                                        <td style="width:600px;text-align:center" width="600" align="center"><a
                                                            href="#"
                                                            style="display:inline-block;text-decoration:none;text-transform:none;vertical-align:middle"
                                                            target="_blank">
                                                            <img alt="HelpFood" height="auto"
                                                              src="../util/logo.png"
                                                              style="max-width:160px;width:160px;border:0;display:block;outline:none;text-decoration:none;height:auto;font-size:13px"
                                                              width="160" class="CToWUd"> </a></td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div>
                        <div>
                          <div style="line-height:0;background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                              style="line-height:0;background:#ffffff;background-color:#ffffff;width:100%" width="100%"
                              bgcolor="#FFFFFF">
                              <tbody>
                                <tr>
                                  <td style="direction:ltr;font-size:0px;padding:0;text-align:center">
                                    <div style="padding:0;padding:0 16px;margin:0px auto;max-width:600px">
                                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                        style="width:100%">
                                        <tbody>
                                          <tr>
                                            <td style="direction:ltr;font-size:0px;text-align:center;padding:0" align="center">
                                              <div class="m_9004413157721473316mj-column-per-100"
                                                style="font-size:0;line-height:0;text-align:left;display:inline-block;width:100%;direction:ltr">
                                                <div class="m_9004413157721473316mj-column-per-100"
                                                  style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
                                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                                    style="vertical-align:top" width="100%">
                                                    <tbody>
                                                      <tr>
                                                        <td align="left"
                                                          style="direction:ltr;font-size:0px;word-break:break-word;padding:0">
                                                          <table cellpadding="0" cellspacing="0" width="100%" border="0"
                                                            style="color:#000000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;border:none">
                                                            <tbody>
                                                              <tr>
                                                                <td style="padding:0">
                                                                  <div
                                                                    style="padding-top:12px;font-size:32px;line-height:41.6px;font-family:'Open Sans',OpenSans,Helvetica,Arial;font-weight:900;color:#333333">
                                                                    <span>Doação solicitada</span>
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td style="padding:0">
                                                                  <div
                                                                    style="margin-top:27px;font-size:24px;line-height:32px;font-family:'Open Sans',OpenSans,Helvetica,Arial;color:#000000">
                                                                    <span><span>Olá ${companyName},</span></span>
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td style="padding:0">
                                                                  <div
                                                                    style="margin-top:32px;line-height:36px;font-size:24px;font-family:'Open Sans',OpenSans,Helvetica,Arial;font-weight:500;color:#000000">
                                                                    <span>Informamos que a sua doação <a
                                                                        href="#"
                                                                        style="text-decoration:none;color:#2277ff;font-weight:800"
                                                                        target="_blank"
                                                                        data-saferedirecturl="#">${donationName}</a>
                                                                      foi solicitada. Você pode ver quem irá retirar clicando no botão abaixo.</span>
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td style="padding:0">
                                                                  <div style="display:inline-block">
                                                                    <a href="#"
                                                                      style="color:#000000;text-decoration:none" target="_blank">
                                                                      <div
                                                                        style="padding:15px 64px;margin-top:25px;line-height:30px;text-align:center;background-color:#000000">
                                                                        <span
                                                                          style="font-weight:bold;font-size:24px;color:#ffffff">Ver
                                                                          detalhes da solicitação</span>
                                                                      </div>
                                                                    </a>
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td style="padding:0">
                                                                  <div
                                                                    style="margin-top:25px;font-size:24px;font-family:'Open Sans',OpenSans,Helvetica,Arial;font-weight:500;line-height:36px;color:#222222">
                                                                    <span>Fique atento, pois a qualquer momento alguém poderá entrar em contato para combinar a retirada!</span>
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </div>
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </body>
            </html>`
        });
        console.log("Message sent: %s", info.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
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

    async reserveDonation(donationId, receiverId) {
        console.log(donationId)
        var donationName = "";
        var companyName = "";
        var companyEmail = "";

        await db.collection('Donation').doc(donationId).get().then((snapshot) => {
            if (snapshot.exists) {
                let docRef = db.collection('Donation').doc(donationId);
                donationName = snapshot.data().Name;
                companyName = snapshot.data().NameDonor;
                companyEmail = snapshot.data().EmailDonor;
                console.log(snapshot.data().Name)
                docRef.update({
                    Receiver: receiverId,
                    Active: false
                }).then(() => {
                    console.log("Successfully reserved donation");
                    this.sendMailToCompany(donationName, companyName, companyEmail);
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
                    console.log("Error removing a donation "+ e.message);
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
                    console.log("Donation not updated "+ e.message);
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