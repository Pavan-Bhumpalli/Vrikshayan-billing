const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const diyModel=require("../JSON/diyModel.json");

const diySchema = new mongoose.Schema(diyModel);
diySchema.plugin(AutoIncrement, { inc_field: 'item_pk' });

module.exports = mongoose.model('DIY', diySchema);
