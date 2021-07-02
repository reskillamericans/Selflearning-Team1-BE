const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT; 

const dbSetup = require('./database/setup')



app.use(express.json())

app.listen(port, () => console.log(`app listening on port ${port}`));
