const dotenv = require("dotenv");

dotenv.config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
app.use(express.json());
app.use(cors());

//Import Users Route
const userRouter = require('./Routes/Users.Route');

//For connecting to the database
const connection = require("./config/db");

// For Users Router
app.use("/users", userRouter);

//Listening to the Server in 8080 port
app.listen(port, async() => {
 await connection();
  console.log(`Listening to the http://localhost:${port}`);
});
