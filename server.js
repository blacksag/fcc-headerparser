// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

//logger
app.use(function middleware(req,res,next) {
  var string = req.method + ' ' + req.path + ' - ' + req.ip;
  console.log(string);
  next();
});

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/whoami", function (req, res) {
  var response = {
    ipaddress : req.ip,
    language : req.headers['accept-language'],
    software : req.headers['user-agent']
  };
  res.json(response);
});

//404: Not found error middleware!
app.use(function(req, res){
  res.status(404);
  //res.render('404', { url: req.url });
  res.send({ error: 'Not found' });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
