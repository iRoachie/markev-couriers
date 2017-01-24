'use strict';

const compression = require('compression')
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(compression())
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));

app.use(express.static('_site'))

app.get('*', (req, res) => {
  res.sendFile('_site/index.html', {root: __dirname});
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
