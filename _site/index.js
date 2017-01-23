'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
app.set('port', (process.env.PORT || 5000));

app.use(express.static('_site'))

app.get('*', (req, res) => {
  res.sendFile('_site/index.html', {root: __dirname});
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
