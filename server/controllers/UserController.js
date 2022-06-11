const UserModel = require("../models/UserModel");

class UserController {
    constructor(app) {

        const user = new UserModel();

        app.post('/user/authUser', (req, res) => {
            let result = user.authUser(
                req.body.email,
                req.body.password
            );
            if (result) {
                result.then((response) => {
                    res.status(200).send(response);
                })
            }
            else {
                res.status(500).send(false);
            }
        });

        app.get('/user/getUserAuth', (req, res) => {
            let result = user.getUserAuth();
            if (result) {
                result.then((response) => {
                    res.status(200).send(response);
                })
            }
            else {
                res.status(500).send(false);
            }
        });

        app.get('/user/getCurrentUserId', (req, res) => {
            user.getCurrentUserId(function (error, result) {
                if (error) {
                    res.send(error);
                } else {
                    res.status(200).send(result);
                }
            });
        });

        app.get('/user/getCurrentCompanyData', (req, res) => {
            user.getCurrentCompanyData(function (error, result) {
                if (error) {
                    res.send(error);
                } else {
                    res.status(200).send(result);
                }
            });
        });

        app.get('/user/getAll', (req, res) => {
            user.getAllUsers(function (error, result) {
                if (error) {
                    res.send(error);
                } else {
                    res.status(200).send(result);
                }
            });
        });

        app.get('/user/getUserById', (req, res) => {
            user.getUserById(function (error, result) {
                if (error) {
                    res.send(error);
                } else {
                    res.status(200).send(result);
                }
            });
        });

        app.get('/user/isBusiness/:id', (req, res) => {
            var userId = req.params.id;
            user.isBusiness(userId, function (error, result) {
                if (error) {
                    res.send(error);
                } else {
                    res.status(200).send(result);
                }
            });
        });

        app.post('/user/add', (req, res) => {
            var result = user.add(
                req.body.name,
                req.body.cpf,
                req.body.email,
                req.body.password,
                req.body.ongName
            );
            if (result) {
                res.sendStatus(200)
            }
            else {
                res.sendStatus(500);
            }
        });

        app.post('/user/RemoveUserById', (req, res) => {
            var result = user.removeUserById(
                req.body.userId
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

module.exports = UserController;