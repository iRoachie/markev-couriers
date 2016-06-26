require('dotenv').config({silent: true});

import express from 'express';
const app = express();

import bodyParser from 'body-parser';
import cors from 'cors';
import nodemailer from 'nodemailer';

app.use(bodyParser.json());
app.use(cors());
app.set('port', (process.env.PORT || 5000));

app.use('/serve', express.static(__dirname + '/serve'));
app.use('/app', express.static(__dirname + '/app'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/favicons', express.static(__dirname + '/favicons'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.get('*', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
});

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SENDER,
    pass: process.env.PASS
  }
});

app.post('/api/contact', (req, res) => {
  let info = req.body;

  if(!info.hasOwnProperty('company')) {
    info['company'] = '-';
  }

  let mailOptions = {
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
              <td>
                <a href="${'mailto:' + info['email']}" target="_blank"><span class="il">${info['email']}</span></a>
              </td>
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

  transporter.sendMail(mailOptions, error => {
    if(error)
      return console.log(error);

    console.log('Contact Us message sent.');
    res.send();
  });
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
