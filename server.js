// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const PORT = 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// // your first API endpoint... 
// app.get("/api/hello", function (req, res) {
//   res.json({greeting: 'hello API'});
// });

app.get('/api', (req, res) => {  
  res.json({unix: new Date().getTime(), utc: new Date()});
});

app.get('/api/:date', (req, res) => {
  let date = req.params.date;
  if (new Date(req.params.date) == 'Invalid Date'){
    res.json({error: 'Invalid Date'})
  }
  if (!req.params.date){
    res.json({unix: new Date().getTime(), utc: new Date()});
  }
  res.json({unix: new Date(req.params.date).getTime(), utc: new Date(req.params.date)});
});

// listen for requests boilerplate :)
// var listener = app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });

// listen local
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
