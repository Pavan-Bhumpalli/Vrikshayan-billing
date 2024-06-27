const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const diyModel=require("./diyModel.json");

const diySchema = new mongoose.Schema(diyModel);
diySchema.plugin(AutoIncrement, { inc_field: 'diy_pk' });

module.exports = mongoose.model('DIY', diySchema);
