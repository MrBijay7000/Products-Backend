const express = require("express");

const bodyParser = require("body-parser");
const categoryRoutes = require("./../routes/category");
const productRoutes = require("./../routes/product");
const { mongoose } = require("mongoose");

const app = express();
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://The5King:The5King@cluster0.be8dwcc.mongodb.net/BIJAY?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected To Database");
  })
  .catch(() => {
    console.log("Connection Failed!");
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS,PUT"
  );

  next();
});

app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);

module.exports = app;
