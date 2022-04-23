var express = require("express");
var app = express();
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("Hello World HelpFood");
});

app.listen(PORT, function () {
    console.log(`HelpFood server listening at: ${PORT}`);
});