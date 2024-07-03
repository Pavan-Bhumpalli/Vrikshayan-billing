const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const configJSON = require("./config.json");

const user_crud = require("./CRUD/UserCRUD/user_crud");
const customer_crud=require("./CRUD/CustomerCRUD/customer_crud");
const customer_add_crud=require("./CRUD/CustomerCRUD/AddItems");
const nursery_crud=require("./CRUD/NurseryCRUD/nursery_crud");
const beverages_crud=require("./CRUD/BeveragesCRUD/beverages_crud");
const farmproduce_crud=require("./CRUD/FarmProduceCRUD/farmproduce_crud");
const diy_crud=require("./CRUD/DIYCRUD/diy_crud");


mongoose.connect(configJSON.mongodbURI).then(() => {
    console.log("Connected to MongoDB");
})

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/", user_crud);
app.use("/", customer_crud);
app.use("/", customer_add_crud);
app.use("/", nursery_crud);
app.use("/", beverages_crud);
app.use("/", farmproduce_crud);
app.use("/", diy_crud);

app.get("/", (req, res) => {
    res.send("Welcome to Vrikshyan");
});

app.listen(configJSON.port, () => console.log("Server is running on port http://localhost:" + configJSON.port));