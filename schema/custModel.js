const mongoose=require("mongoose");
const custModel = require("./customerModel.json");

const customer = mongoose.Schema(custModel);
module.exports = mongoose.model("customer",customer); 