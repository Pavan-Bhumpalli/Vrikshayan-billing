const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const nurseryModel=require("./nurseryModel.json");

const nurserySchema = new mongoose.Schema(nurseryModel);
nurserySchema.plugin(AutoIncrement, { inc_field: 'nursery_pk' });

module.exports = mongoose.model('nursery', nurserySchema);
