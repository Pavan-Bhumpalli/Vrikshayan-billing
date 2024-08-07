const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const configJSON = require("./config.json");

const user_crud = require("./CRUD/UserCRUD/user_crud");
const customer_crud = require("./CRUD/CustomerCRUD/customer_crud");
const customer_add_crud = require("./CRUD/CustomerCRUD/AddItems");
const nursery_crud = require("./CRUD/NurseryCRUD/nursery_crud");
const beverages_crud = require("./CRUD/BeveragesCRUD/beverages_crud");
const farmproduce_crud = require("./CRUD/FarmProduceCRUD/farmproduce_crud");
const diy_crud = require("./CRUD/DIYCRUD/diy_crud");

mongoose.connect(configJSON.mongodbURI).then(() => {
    console.log("Connected to MongoDB");
});

const corsOptions = {
    origin: 'https://vrikshayan-billing.vercel.app', 
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));

app.use("/", user_crud);
app.use("/", customer_crud);
app.use("/", customer_add_crud);
app.use("/", nursery_crud);
app.use("/", beverages_crud);
app.use("/", farmproduce_crud);
app.use("/", diy_crud);

app.get("/customers/:month/:year", async (req, res) => {
    try {
        const month = parseInt(req.params.month);
        const year = parseInt(req.params.year);
        const customer = require('./schema/JS/custModel'); 

        const startDate = new Date(year, month - 1, 1); 
        const endDate = new Date(year, month, 0, 23, 59, 59);

        const foundCustomers = await customer.find({
            createdAt: {
                $gte: startDate,
                $lte: endDate
            }
        });

        if (foundCustomers.length === 0) {
            return res.status(404).send("No customers found for the specified month and year");
        }

        res.status(200).json(foundCustomers);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

app.get("/", (req, res) => {
    res.send("Welcome to Vrikshyan!!! Enjoy Exploring");
});

app.listen(configJSON.port, () => console.log("Server is running on port http://localhost:" + configJSON.port));
