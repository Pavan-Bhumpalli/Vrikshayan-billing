const mongoose=require("mongoose");
const schema=require("../JSON/usermodel.json");
const user=mongoose.Schema(schema);

module.exports=mongoose.model("user", user);