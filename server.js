const express = require("express");
const colors = require("colors");
const moragan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// dotenv config
dotenv.config();

// mongodb connection
connectDB();

// rest object
const app = express();

//middlewares
app.use(express.json()); // Use to remove the error of json
app.use(moragan("dev"));

//routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));

// app.get("/", (req, res) =>{        // req = request & res = response
//   res.status(200).send({
//     message: "Server is running",
//   });
// });

//port
const port = process.env.PORT || 8080;
// listen Port
app.listen(port, () => {
  console.log(
    `Server is running on ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});
