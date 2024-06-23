const mongoose=require("mongoose");
const custModel = require("./customerModel.json");

const customer = mongoose.Schema(custModel,{timestamps:true});
module.exports = mongoose.model("customer",customer); 