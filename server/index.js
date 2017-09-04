const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routes.js');

const app = express();
const client = path.join(__dirname, '../client');

app.use(bodyParser.json());
app.use('/api', router);
app.use(express.static(client));

app.listen(3000);

console.log('server listening on 3000');
