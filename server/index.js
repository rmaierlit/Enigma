const express = require('express');
const path = require('path');
// const router = require('./routes.js');

const app = express();
const client = path.join(__dirname, '../client');
console.log(client);

// app.use('/api', router);
app.use(express.static(client));

app.listen(3000);


console.log('server listening on 3000');
