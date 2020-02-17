const path = require('path');
const express = require('express');
const os = require('os');
const bodyParser = require('body-parser');
// const cors = require('cors');
require('dotenv').config();
const app = express();

const foodRoutes = require('./routes/food');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));
app.use('/api/food', foodRoutes);
app.get("/", (request, response) => {
  response.sendFile(__dirname+"/index.html");
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
