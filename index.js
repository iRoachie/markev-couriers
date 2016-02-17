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

var transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SENDER,
    pass: process.env.PASS
  }
});

app.post('/api/open-account', function(req, res) {
  var info = req.body;

  if(!info.hasOwnProperty('fax')) {
    info['fax'] = '-';
  }

  if(!info.hasOwnProperty('heardAbout')) {
    info['heardAbout'] = '-';
  }

  var mailOptions = {
    from: 'Markev Couriers Info <	' + process.env.SENDER + '>',
    to: process.env.RECEIVER,
    subject: '[Markev Couriers] New Client Signup',
    html:
      `
        <table rules="all" style="border-color:#666" cellpadding="10">
          <tbody>
            <tr style="background-color:#166AB6;color:white;font-size:14px">
              <td colspan="2">New Account</td>
            </tr>
            <tr>
              <td><strong>Name: </strong></td>
              <td>${info['firstName']} ${info['lastName']}</td>
            </tr>
            <tr>
              <td><strong>Email: </strong></td>
              <td><a href=${'mailto:' + info['email']} target="_blank"><span class="il">${info['email']}</span></a></td>
            </tr>
            <tr>
              <td><strong>Phone: </strong></td>
              <td>${info['phone']}</td>
            </tr>
            <tr>
              <td><strong>Fax: </strong></td>
              <td>${info['fax']}</td>
            </tr>
            <tr>
              <td><strong>Company: </strong></td>
              <td>${info['company']}</td>
            </tr>
            <tr>
              <td><strong>Accounts Payable Contact: </strong></td>
              <td>${info['accountsPayable']}</td>
            </tr>
            <tr>
              <td><strong>Address </strong></td>
              <td>${info['address'] + ', ' + info['parish']}</td>
            </tr>
            <tr>
              <td><strong>Heard About Us: </strong></td>
              <td>${info['heardAbout']}</td>
            </tr>
            <tr></tr>
          </tbody>
        </table>
      `
  };

  transporter.sendMail(mailOptions, function(error){
    if(error){
      return console.log(error);
    }

    console.log('New Client message sent.');
    res.send();
  });
});

app.post('/api/contact', function(req, res) {
  var info = req.body;

  if(!info.hasOwnProperty('company')) {
    info['company'] = '-';
  }

  var mailOptions = {
    from: 'Markev Couriers Info <	' + process.env.SENDER + '>',
    to: process.env.RECEIVER,
    subject: '[Markev Couriers] Client Contact Query',
    html:
      `
        <table rules="all" style="border-color:#666" cellpadding="10">
          <tbody>
            <tr style="background-color:#166AB6;color:white;font-size:14px">
              <td colspan="2">Client Contact Query</td>
            </tr>
            <tr>
              <td><strong>Name: </strong></td>
              <td>${info['name']}</td>
            </tr>
            <tr>
              <td><strong>Email: </strong></td>
              <td><a href="${'mailto:' + info['email']}" target="_blank"><span class="il">${info['email']}</span></a></td>
            </tr>
            <tr>
              <td><strong>Phone: </strong></td>
              <td>${info['phone']}</td>
            </tr>
            <tr>
              <td><strong>Company: </strong></td>
              <td>${info['company']}</td>
            </tr>
            <tr>
              <td><strong>Message: </strong></td>
              <td>${info['message']}</td>
            </tr>
            <tr></tr>
          </tbody>
        </table>
      `
  };

  transporter.sendMail(mailOptions, function(error){
    if(error){
      return console.log(error);
    }

    console.log('Contact Us message sent.');
    res.send();
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
