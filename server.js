const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const port = 3000;
const app = express();

const productRouter = require("./routes/products");

dotenv.config();

mongoose.set('strictQuery', true)

mongoose.connect(process.env.MONGO_URL).then(() => console.log("DB is connected")).catch((err) => console.log(err));

app.use(express.json());
app.use("/api/products", productRouter);

app.listen(port, () => {
  console.log("Server started on port " + port);
});