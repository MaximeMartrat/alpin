const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');

//constants
const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();

app.use(bodyParser.json());
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
    console.log("DB NeoNess connected !")
})

app.get("/", (req,res) =>{
    res.redirect('/login.html');
});

app.post("/check", (req,res)=>{
    // console.log(req.body)
    let user_pseudo = req.body.userpseudo
    let user_password = req.body.userpassword
    let myquery = `SELECT * FROM user WHERE user_pseudo = ? AND user_password = ?`;
    pool.connect((err)=>{
        if (err) throw err
        pool.query(myquery, [user_pseudo, user_password], (err,results)=>{
            if(err)throw err
            // console.log(results);
            if(results.length == 1) {
                //console.log(user_pseudo);
                let resultats = (results[0].is_admin);
                // console.log(resultats);
                // console.log(results);
                if (resultats != 1) {
                    res.render('user', {'message':`Bienvenue ${user_pseudo}`, 'display':results})
                } else {
                    res.render('admin', {'message':`Bienvenue administrateur ${user_pseudo}`,'display':results})
                }
            } 
            if(results.length != 1) {
                // console.log('bad request')
                res.redirect('/')
            }
        });
    });
});

app.get('/signIn', (req, res)=>{
    res.redirect('/')
});

app.post('/create.html', (req,res)=>{
    // console.log(req.body);
    let user_name = req.body.user_name;
    let user_lastname = req.body.user_lastname;
    let user_pseudo = req.body.user_pseudo;
    let user_tel = req.body.user_tel;
    let user_age = req.body.user_age;
    let user_taille = req.body.user_taille;
    let user_poids = req.body.user_poids;
    let user_objectif = req.body.user_objectif;
    let user_password = req.body.user_password;
    let myquery = `INSERT INTO user (user_name, user_lastname, user_pseudo, user_tel, user_age, user_taille, user_poids, user_objectif, user_password) VALUES (?,?,?,?,?,?,?,?,?)`
    pool.connect((err)=>{
        if(err) throw err;
        pool.query(myquery, [user_name, user_lastname, user_pseudo, user_tel, user_age, user_taille, user_poids, user_objectif, user_password], (err, results)=>{
            if(err) throw err;
            res.redirect('/');
        });
    });
});

app.post('/activite', (req, res)=>{
    const today = new Date();
    const dateToday = today.toISOString().slice(0, 10);
    let activite_id = req.body.activite;
    let seance_date = dateToday;
    let seance_time = req.body.seance_time;
    let user_id = req.body.userId
    let myquery = `INSERT INTO seance (user_id, activite_id, seance_date, seance_duree) VALUES(?,?,?,?)`;
    pool.connect((err)=>{
        if (err) throw err;
        pool.query(myquery, [user_id, activite_id, seance_date, seance_time], (err, results)=>{
            if(err) throw err;
            console.log(results);
        });
    });
});

app.get('/activiteSelect', (req,res)=>{
    let allResults = {};
    let myquery = "SELECT * FROM activite";
    pool.connect((err)=>{
        if(err) throw err
        pool.query(myquery, function(err, results, fields) {
            if (err) throw err;
            allResults.activite = results;
            res.send(allResults);
        });
    })
});

app.get('/seance', (req, res)=>{
    const today = new Date();
    const dateToday = today.toISOString().slice(0, 10);
    let myquery = `SELECT * FROM sceance WHERE seance_date = ${dateToday}`
    pool.connect((err)=>{
        if(err)throw err
        pool.query(myquery, (err, results)=>{
            console.log(results);
        })
    })
});

app.listen(PORT, HOST);
console.log(`running on http://${HOST}:${PORT}`);
        