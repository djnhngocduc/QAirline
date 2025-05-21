const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const routeApi = require('./routers/index.route');
const sequelize = require('./config/database');
sequelize;

const app = express();  
const port = process.env.PORT || 3000;

routeApi.index(app);


// Test API link to fetch users
app.get("/api/test/flights", async (req, res) => {
  try {
    const flights = await require("./models/index.model").Flight.findAll();
    res.status(200).json(flights);
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi hệ thống");
  }
});

app.get("/", (req, res) => {
  res.send("Project Qairline Backend");
});

app.use(cors);
app.use(bodyParser.json());
app.use(express.json());


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

