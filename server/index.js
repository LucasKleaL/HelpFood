const express = require("express");
const cors = require("cors");
const UserController = require("./controllers/UserController");
const PORT = process.env.PORT || 3001;

var app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello World HelpFood");
});

const { business } = require('../server/handlers/business')
app.get('/business', business);

const { donation } = require('../server/handlers/donation')
app.get('/donation', donation);

app.listen(PORT, function () {
    console.log(`HelpFood server listening at: ${PORT}`);
});

const userController = new UserController(app);