const express = require("express");
const cors = require("cors");
const UserController = require("./controllers/UserController");
const DonationController = require("./controllers/DonationController");
const PORT = process.env.PORT || 3001;

var app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello World HelpFood");
});


app.listen(PORT, function () {
    console.log(`HelpFood server listening at: localhost:${PORT}`);
});

const userController = new UserController(app);
const donationController = new DonationController(app);