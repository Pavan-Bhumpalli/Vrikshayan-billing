const mongoose=require("mongoose");
const schema=require("./model.json")
const user=mongoose.Schema(schema);

module.exports=mongoose.model("user", user);