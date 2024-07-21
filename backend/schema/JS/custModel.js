const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const custModel = require('../JSON/customerModel.json');

const customerSchema = new mongoose.Schema(custModel, { timestamps: true });
customerSchema.plugin(AutoIncrement, { inc_field: 'pk' });

module.exports = mongoose.model('customer', customerSchema);
