const DonationModel = require("../models/DonationModel");

class DonationController {
    constructor(app) {

        const donation = new DonationModel();

        app.post('/donation/add', (req, res) => {
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

        app.post('/donation/updateDonation', (req, res) => {
            var result = donation.updateDonation(
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

        app.get('/donation/removeDonationById', (req, res) => {
            var result = donation.removeDonationById(
                req.params.donationId
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