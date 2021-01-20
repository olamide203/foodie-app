const express = require("express");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const path = require("path");
const index = require(path.join(__dirname, "routes", "index"));
const admin = require(path.join(__dirname, "routes", "admin"));
// const mong = require("./models/mongoosee");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(fileupload());
app.use("/", index);
app.use("/admin", admin);

mongoose
  .connect("mongodb://localhost/foodie", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((res) => {
    app.listen(port, () => {
      console.log(`server running at port http://localhost:${port}`);
      console.log("connected to mongodb server");
    });
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });
