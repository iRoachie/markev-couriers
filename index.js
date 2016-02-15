require('dotenv').config({silent: true});

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var nodemailer = require('nodemailer');

app.use(bodyParser.json());
app.use(cors());
app.set('port', (process.env.PORT || 5000));

app.use('/dist', express.static(__dirname + '/dist'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/app', express.static(__dirname + '/app'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/favicons', express.static(__dirname + '/favicons'));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/email', function(req) {
  console.log(req.body.info);

  var transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SENDER,
      pass: process.env.PASS
    }
  });

  var mailOptions = {
    from: 'Fred Foo <	' + process.env.SENDER + '>', // sender address
    to: process.env.RECEIVER,
    subject: 'Hello ✔', // Subject line
    text: 'Hello world', // plaintext body
    html: '<b>Hello world</b>' // html body
  };

  transporter.sendMail(mailOptions, function(error){
    if(error){
      return console.log(error);
    }

    console.log('Message sent');
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
