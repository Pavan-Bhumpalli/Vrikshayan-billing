const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const middleware=require("./middleware");
const configJSON = require("./config.json");
const StartFuncLoginUser = require('./signUp-Login/login');
const StartFuncRegisterUser = require('./signUp-Login/register');
const StartFuncGetAllUsers=require("./routes/getAllUsers");
const StartFuncGetUserById=require("./routes/getUserById");
const StartFuncDeleteUser = require("./routes/deleteUser");

const app = express();

mongoose.connect(configJSON.mongodbURI).then(() => {
    console.log("Connected to MongoDB");
})

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Welcome to Vrikshyan");
});

app.post("/register", StartFuncRegisterUser);

app.post("/login", StartFuncLoginUser);

app.get("/users",middleware, StartFuncGetAllUsers);

app.get("/user/:id",middleware, StartFuncGetUserById);

app.delete("/user/:id",middleware, StartFuncDeleteUser);


app.listen(configJSON.port, () => {
    console.log("Server is running on port http://localhost:" + configJSON.port);
});