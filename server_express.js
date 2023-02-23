const express = require('express');
const bodyParser = require('body-parser');

//constants
const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.set("public", "./public")
app.use(bodyParser.urlencoded({
    extended:true
}));

app.get('/', (req, res) =>{
    res.send('<h2>Hello World from a DOCKER NODEJS !!</h2>');
});

app.get('/test', (req, res) =>{
    res.render("testPage", { title: "le template", subject: "c\'est chouette !"});
});

app.get('/form', (req, res)=>{
    res.sendFile(__dirname + '/public/form.html')
})

app.post('/receive', (req, res) =>{
    res.render("receive", { lastName: req.body.lastName, firstName: req.body.firstName })
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);