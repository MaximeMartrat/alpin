const MYSERVER = require('http');
const url = require('url')
const fs = require('fs')
MYSERVER.createServer(
    function(request, response) {
        // let q = url.parse(request.url, true).query;
        // let text = q.year + " " + q.month;
        // response.writeHead(200, {'Content-Type': 'text/html'});
        // response.write('<html>');
        // response.write('<body>');
        // response.write('<h1>nous sommes en ' + text + '</h1>');
        // response.write('</body>');
        // response.write('</html>');
        // response.end();
        // response.end('Hello World !');
        // console.log(rh1equest.headers);
        fs.readFile('demo.html', function(err,data){
            if(!err) {
                response.writeHead(200, { 'Content-Type': 'text/html'});
                response.write(data);
                return response.end();
            }
        })
    }
).listen(8080);

// let adr = 'http://localhost:8080/default.ht?year=2023&month=february'
// let q = url.parse(adr, true);
// console.log(q.host); //returns 'localhost:8080
// console.log(q.pathname); //returns '/default.ht'
// console.log(q.search); //returns '?year=2023, month: 'february'
// let qdata = q.query; // returns an object { year: 2023, month: february}
// console.log(qdata.month); //returns 'february'

//event management
const events = require('events');

let eventEmitter = new events.EventEmitter();

// fonction qui gère l'évènement
let myEventHandler = function() {
    console.log("j'ai entendu un truc");
}

eventEmitter.on('scream', myEventHandler);

eventEmitter.emit('scream');