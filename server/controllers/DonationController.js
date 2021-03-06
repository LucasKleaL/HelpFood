const DonationModel = require("../models/DonationModel");

class DonationController {
    constructor(app) {

        const donation = new DonationModel();

        app.get('/donation/getAll', (req, res) => {
            donation.getAllDonation(function (error, result) {
                if (error) {
                    res.send(error);
                } else {
                    res.status(200).send(result);
                }
            });
        });
        app.get('/donation/getAllActiveAndInactiveDonations', (req, res) => {
            donation.getAllActiveAndInactiveDonations(function (error, result) {
                if (error) {
                    res.send(error);
                } else {
                    res.status(200).send(result);
                }
            });
        });

        app.get('/donation/getDonationById/:id', (req, res) => {
            const itemId = req.params.id;
            donation.getDonationById(itemId, function (error, result) {
                if (error) {
                    res.send(error);
                } else {
                    res.status(200).send(result);
                }
            });
        });

        app.get('/donation/getActiveDonationsByCompanyId/:id', (req, res) => {
            const itemId = req.params.id;
            donation.getActiveDonationsByCompanyId(itemId, function (error, result) {
                if (error) {
                    res.send(error);
                } else {
                    res.status(200).send(result);
                }
            });
        });

        app.get('/donation/getDisabledDonationsByCompanyId/:id', (req, res) => {
            const itemId = req.params.id;
            donation.getDisabledDonationsByCompanyId(itemId, function (error, result) {
                if (error) {
                    res.send(error);
                } else {
                    res.status(200).send(result);
                }
            });
        });

        app.post('/donation/add', (req, res) => {
            var result = donation.addDonation(
                req.body.name,
                req.body.description,
                req.body.businessDonor,
                req.body.nameDonor,
                req.body.emailDonor,
                req.body.district,
                req.body.weight,
                req.body.quantity,
                req.body.typeFood,
                req.body.shelfLife,
                req.body.street,
                req.body.number,
                req.body.phone
            );
            if (result) {
                res.sendStatus(200)
            }
            else {
                res.sendStatus(500);
            }
        });

        app.post('/donation/reserve', (req, res) => {
            var result = donation.reserveDonation(
                req.body.donationId,
                req.body.receiverId,
                req.body.receiverName,
                req.body.receiverEmail
            );
            if (result) {
                res.sendStatus(200)
            }
            else {
                res.sendStatus(500);
            }
        });

        app.post('/donation/UpdateDonation', (req, res) => {
            var result = donation.updateDonation(
                req.body.donationId,
                req.body.description,
                req.body.businessDonor,
                req.body.address,
                req.body.weight,
                req.body.quantity,
                req.body.typeFood,
                req.body.shelfLife
            );
            if (result) {
                res.sendStatus(200)
            }
            else {
                res.sendStatus(500);
            }
        });

        app.post('/donation/RemoveDonationById/:id', (req, res) => {
            var result = donation.removeDonationById(
                req.params.id
            );
            if (result) {
                res.sendStatus(200)
            }
            else {
                res.sendStatus(500);
            }
        });
    }
}

module.exports = DonationController;