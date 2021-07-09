const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT; 

// Setup Mongoose
const dbSetup = require("./database/setup");
dbSetup();

app.listen(port, () => console.log(`app listening on port ${port}`));

// Routers
const stepsRouter = require("./routers/steps.router");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

// Appliction Middleware
app.use(express.json());

app.use("/steps", stepsRouter);

// Not Found
app.use(notFound);
// Error Handler
app.use(errorHandler);
