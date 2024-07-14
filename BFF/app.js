const express = require('express');
const { json } = require('body-parser');
const app = express();
const appV1Controller = require('./v1/appV1Controller');

app.use(express.json());
app.use('/api/v1/', appV1Controller);

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log('Server started on port ' + PORT);
})