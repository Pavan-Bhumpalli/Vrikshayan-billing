const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const beveragesmodel = require("../JSON/beveragesModel.json");

const beveragesSchema = new mongoose.Schema(beveragesmodel);
beveragesSchema.plugin(AutoIncrement, {inc_field: 'beverageId'});

module.exports = mongoose.model('beverages', beveragesSchema)