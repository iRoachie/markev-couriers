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

app.post('/email', function(req, res) {
  var info = req.body.info;

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
    from: 'Markev Couriers Info <	' + process.env.SENDER + '>', // sender address
    to: process.env.RECEIVER,
    subject: '[Markev Couriers] New Client Signup', // Subject line
    html:
      `
        <style type="text/css">
          .tg  {border-collapse:collapse;border-spacing:0;}
          .tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border: 1px solid;overflow:hidden;word-break:normal;}
          .tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border: 1px solid;overflow:hidden;word-break:normal;}
          .tg .tg-9hbo{font-weight:bold;vertical-align:top}
          .tg .tg-yw4l{vertical-align:top}
        </style>
        <table class="tg">
          <tr>
            <td class="tg-9hbo">Name</td>
            <td class="tg-yw4l">${req.body.info['firstName']} ${req.body.info['lastName']}</td>
          </tr>
          <tr>
            <td class="tg-9hbo">Email</td>
            <td class="tg-yw4l">${req.body.info['email']}</td>
          </tr>
          <tr>
            <td class="tg-9hbo">Phone</td>
            <td class="tg-yw4l">${req.body.info['phone']}</td>
          </tr>
          <tr>
            <td class="tg-9hbo">Company</td>
            <td class="tg-yw4l">${req.body.info['company']}</td>
          </tr>
          <tr>
            <td class="tg-9hbo">Accounts Payable Contact</td>
            <td class="tg-yw4l">${req.body.info['accountsPayable']}</td>
          </tr>
          <tr>
            <td class="tg-9hbo">Street Address</td>
            <td class="tg-yw4l">${req.body.info['address']}</td>
          </tr>
          <tr>
            <td class="tg-9hbo">Parish</td>
            <td class="tg-yw4l">${req.body.info['parish']}</td>
          </tr>
          <tr>
            <td class="tg-9hbo">Fax</td>
            <td class="tg-yw4l">${req.body.info['fax']}</td>
          </tr>
          <tr>
            <td class="tg-9hbo">Heard About Us</td>
            <td class="tg-yw4l">${req.body.info['heardAbout']}</td>
          </tr>
        </table>
      `
  };

  transporter.sendMail(mailOptions, function(error){
    if(error){
      return console.log(error);
    }

    console.log('Message sent');
    res.send();
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
