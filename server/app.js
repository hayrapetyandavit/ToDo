require("dotenv").config();
const express = require("express");
const cors = require("cors");
const allRouter = require("./routes/router");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));

app.use("/", allRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
