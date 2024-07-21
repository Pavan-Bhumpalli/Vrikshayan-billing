const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const farmProduceModel = require("../JSON/FarmProduceModal.json");
const farmProduceSchema = new mongoose.Schema(farmProduceModel);
farmProduceSchema.plugin(AutoIncrement, { inc_field: 'produce_pk' });

module.exports = mongoose.model('farmProduce', farmProduceSchema);
