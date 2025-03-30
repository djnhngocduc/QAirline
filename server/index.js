const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const routeApi = require('./routers/client/index.route');
const sequelize = require('./config/database');
sequelize;

const app = express();  
const port = process.env.PORT;

routeApi.index(app);

app.use(cors);
app.use(bodyParser.json());
app.use(express.json());


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

