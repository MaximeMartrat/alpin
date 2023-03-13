const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const { request } = require('express');


//constants
const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./views");

let pool = mysql.createConnection(
    {
        host:"172.17.0.2",
        user:"maximem",
        password:"maxm2023",
        database: "NeoNess",
        multipleStatements: true
    }
);

pool.connect(function (err){
    if(err) throw err ;
    console.log("DB Sport connected !")
})

app.get("/", (req,res) =>{
    res.redirect('/login.html');
});



app.listen(PORT, HOST);
console.log(`running on http://${HOST}:${PORT}`);
        