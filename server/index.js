var express = require("express");
const cors = require("cors");
var app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World HelpFood");
});

const { business } = require('../server/handlers/business')
app.get('/business', business);

app.post('/user/add', (req, res) => {
    const name = req.body.name;
    console.log("Recebeu o nome: "+name);
})

app.listen(PORT, function () {
    console.log(`HelpFood server listening at: ${PORT}`);
});
