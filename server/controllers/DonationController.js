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

        app.get('/donation/getDonationById', (req, res) => {
            donation.getAllDonation(function (error, result) {
                if (error) {
                    res.send(error);
                } else {
                    res.status(200).send(result);
                }
            });
        });

        app.post('/donation/add', (req, res) => {
            console.log(req.params.description)
            var result = donation.addDonation(
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

        app.post('/donation/RemoveDonationById', (req, res) => {
            var result = donation.removeDonationById(
                req.body.donationId
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