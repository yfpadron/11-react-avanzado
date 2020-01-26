const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const cors = require('cors');

const BD_URI = 'mongodb://127.0.0.1:27017/gateway_admin';
const PORT = 5000;

const app = express();

app.use(express.static(path.join(__dirname, 'views/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/build', 'index.html'));
});

app.use(bodyParser.json());
app.use(cors());

const gatewayRoutes = require('./routes/gateway');
const deviceRoutes = require('./routes/device');

app.use(gatewayRoutes);
app.use(deviceRoutes);

mongoose.connect(BD_URI,{useNewUrlParser: true}).then(result => {
    app.listen(PORT, (err) => {
        if(!err)
        console.log("Listen by port: " + PORT);
        else{
            console.log(err)
        }
    })
})