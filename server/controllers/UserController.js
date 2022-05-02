const UserModel = require("../models/UserModel");

class UserController {
    constructor(app) {

        const user = new UserModel();

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

    }
}

module.exports = UserController;