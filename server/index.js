var express = require("express");
var app = express();
const PORT = process.env.PORT || 3001;

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