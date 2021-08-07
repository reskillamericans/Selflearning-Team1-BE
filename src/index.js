const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const dbSetup = require("./database/setup");

const authRoutes = require("./routes/authRoutes");
const coursesRoutes = require("./routes/courses.routes");
const stepsRoutes = require("./routes/steps.routes");
const usersRoutes = require("./routes/usersRoutes");
const requestsRoutes = require("./routes/requests.routes");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

app.use(express.json());

dbSetup();

app.use("/auth", authRoutes);
app.use("/courses", coursesRoutes);
app.use("/steps", stepsRoutes);
app.use("/users", usersRoutes);
app.use("/requests", requestsRoutes);

// error handler middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`app listening on port ${port}`));
