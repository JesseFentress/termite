const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const ticketRouter = require("./src/routes/tickets");
const userRouter = require("./src/routes/user");
const projectRouter = require("./src/routes/projects");
const { authenticateRequest } = require("./src/util/auth");
const e = require("express");

const port = process.env.SERVER_PORT;
const host = process.env.SERVER_HOST;

app.use(cors());
app.use(express.json());

app.use("/tickets", authenticateRequest, ticketRouter);
app.use("/users", userRouter);
app.use("/projects", authenticateRequest, projectRouter);

app.listen(port, host, () => {
  console.log("Server is running on port 5000");
});
