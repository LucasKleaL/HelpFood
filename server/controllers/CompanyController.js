const CompanyModel = require("../models/CompanyModel");

class CompanyController {
    constructor(app) {

        const company = new CompanyModel();

        app.get('/company/getAll', (req, res) => {
            company.getAllCompany(function (error, result) {
                if (error) {
                    res.send(error);
                } else {
                    res.status(200).send(result);
                }
            });
        });

        app.get('/company/getCompanyById', (req, res) => {
            company.getCompanyById(function (error, result) {
                if (error) {
                    res.send(error);
                } else {
                    res.status(200).send(result);
                }
            });
        });

        app.post('/company/add', (req, res) => {
            var result = company.addCompany(
                req.body.name,
                req.body.cnpj,
                req.body.email,
                req.body.donations,
                req.body.allowed,
                req.body.password
            );
            if (result) {
                res.sendStatus(200)
            }
            else {
                res.sendStatus(500);
            }
        });

        app.post('/company/UpdateCompany', (req, res) => {
            var result = company.updateCompany(
                req.body.name,
                req.body.cnpj,
                req.body.donations,
                req.body.allowed
            );
            if (result) {
                res.sendStatus(200)
            }
            else {
                res.sendStatus(500);
            }
        });

        app.post('/company/RemoveCompanyById', (req, res) => {
            var result = company.removeCompanyById(
                req.body.companyId
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

module.exports = CompanyController;