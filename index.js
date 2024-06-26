const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const middleware = require("./middleware");
const configJSON = require("./config.json");

const StartFuncLoginUser = require('./signUp-Login/login');
const StartFuncRegisterUser = require('./signUp-Login/register');
const StartFuncGetAllUsers = require("./routes/getAllUsers");
const StartFuncGetUserById = require("./routes/getUserById");
const StartFuncDeleteUser = require("./routes/deleteUser");
const StartFuncCreateCustomer = require("./routes/createCustomer");
const StartFuncGetCustomers = require("./routes/getCustomers");
const StartFuncAddMovieCount = require("./routes/addMovieCount");
const StartFuncAddLunchCount = require("./routes/addLunchCount");
const StartFuncTodayCustumers = require("./routes/today");
const StartFuncGetCustomerById = require("./routes/getCustomerById");
const StartFuncDeleteCustomerById = require("./routes/deleteCustomerById");
const StartFuncCreateNursery = require("./routes/createNursery");
const StartFuncGetNurseryItems = require("./routes/getNurseryItems");
const StartFuncDeleteNurseryItem = require("./routes/deleteNurseryItem");
const StartFuncAddNurseryCount = require("./routes/addNurseryCount");
const StartFuncGetNurseryItemByPk = require("./routes/getNurseryItemByPk");
const StartFuncDeleteCustomerNurseryItem = require("./routes/deleteCustomerNurseryItem");
const StartFuncAddDIYCount = require("./routes/addDIYCount");
const StartFuncCreateFarmProduce = require("./routes/createFarmProduce");
const StartFuncGetFarmProduce = require("./routes/getFarmProduce");
const StartFuncAddFarmProduceCount = require("./routes/addFarmProduceCount");
const StartFuncCreateBeverages = require("./routes/createBeverages");
const StartFuncGetBeverages = require("./routes/getBeveragesItems");
const StartFuncAddBeverages = require("./routes/addBeverages");

const StartFuncCreateDIY = require("./routes/createDIY");
const StartFuncGetDIYItems = require("./routes/getDIYItems");
const StartFuncGetDIYItemByPk = require("./routes/getDIYItemByPk");
const StartFuncDeleteDIYItemByPk = require("./routes/deleteDIYItemByPk")

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

app.get("/users", middleware, StartFuncGetAllUsers);

app.get("/user/:id", middleware, StartFuncGetUserById);

app.delete("/user/:id", middleware, StartFuncDeleteUser);

app.post("/createCustomer", StartFuncCreateCustomer);
app.get("/getCustomers", StartFuncGetCustomers);
app.get("/getCustomer/:pk", StartFuncGetCustomerById);
app.delete("/customer/:id", StartFuncDeleteCustomerById);

app.post("/createNurseryItem", StartFuncCreateNursery);
app.get("/getNurseryItems", StartFuncGetNurseryItems);
app.get("/getNurseryItem/:pk", StartFuncGetNurseryItemByPk);
app.delete("/NurseryItem/:id", StartFuncDeleteNurseryItem);

app.post("/createBeverages", StartFuncCreateBeverages);
app.get("/getBeverages", StartFuncGetBeverages);


app.put("/customer/movies/:pk", StartFuncAddMovieCount);
app.put("/customer/lunch/:pk", StartFuncAddLunchCount);
app.put("/customer/nursery/:pk", StartFuncAddNurseryCount);
app.put("/customer/beverages/:pk", StartFuncAddBeverages);
app.put("/customer/diy/:pk", StartFuncAddDIYCount);

app.post("/createDIYItem", StartFuncCreateDIY);
app.get("/getDIYItems", StartFuncGetDIYItems);
app.get("/getDIYItem/:pk", StartFuncGetDIYItemByPk);
app.delete("/diyItem/:pk", StartFuncDeleteDIYItemByPk);

app.delete("/customer/:pk/nursery/:item_Pk", StartFuncDeleteCustomerNurseryItem);

app.post("/createFarmProduce", StartFuncCreateFarmProduce);
app.get("/getFarmProduces", StartFuncGetFarmProduce);
app.put("/customer/farmProduce/:pk", StartFuncAddFarmProduceCount);

app.get("/getCustomers/today", StartFuncTodayCustumers);


app.listen(configJSON.port, () => {
    console.log("Server is running on port http://localhost:" + configJSON.port);
});