require('dotenv').config({silent: true});

import express from 'express';
const app = express();

import bodyParser from 'body-parser';
import cors from 'cors';

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

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
