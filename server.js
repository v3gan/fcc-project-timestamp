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

app.get('/api', (req, res) => {  
  res.json({unix: new Date().getTime(), utc: new Date().toUTCString()});
});

app.get('/api/:date', (req, res) => {
  let input = req.params.date;
  
  let inputNum = parseInt(input);
  let date;
  if (input.includes('-')) {
    date = new Date(input);
  } else {
    date = new Date(parseInt(input));
  }
  if (date == 'Invalid Date'){
    res.json({error: 'Invalid Date'})
  } 
  else {
    res.json({unix: date.getTime(), utc: date.toUTCString()});
  }
});

// listen local
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
