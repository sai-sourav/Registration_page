const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const model = require('./models/modeladmin');

const adminroute = require('./routes/admin');

var cors = require('cors');

app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.use(adminroute);

sequelize.sync()
.then(result => {
    // console.log(result);
    app.listen(4000);
})
.catch(err => {
    console.log("error at sync:",err)
})