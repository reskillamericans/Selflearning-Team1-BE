const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const dbSetup = require("./database/setup");

const authRoutes = require("./routes/authRoutes");

app.use(express.json());

dbSetup();

app.use("/auth", authRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
