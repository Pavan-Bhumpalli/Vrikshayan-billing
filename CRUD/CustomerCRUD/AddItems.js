const express = require('express');
//number adding
const StartFuncAddMovieCount = require("../../routes/Add/addMovieCount");
const StartFuncAddLunchCount = require("../../routes/Add/addLunchCount");
//products adding
const StartFuncAddNurseryCount = require("../../routes/Add/addNurseryCount");
const StartFuncAddBeverages = require("../../routes/Add/addBeverages");
const StartFuncAddDIYCount = require("../../routes/Add/addDIYCount");
const StartFuncAddFarmProduceCount = require("../../routes/Add/addFarmProduceCount");
//deleting
const StartFuncDeleteCustomerNurseryItem = require("../../routes/Delete/deleteCustomerNurseryItem");

const router = express.Router();
router.put("/customer/movies/:pk", StartFuncAddMovieCount);
router.put("/customer/lunch/:pk", StartFuncAddLunchCount);
router.put("/customer/nursery/:pk", StartFuncAddNurseryCount);
router.put("/customer/beverages/:pk", StartFuncAddBeverages);
router.delete("/customer/:pk/nursery/:item_Pk", StartFuncDeleteCustomerNurseryItem);
router.put("/customer/diy/:pk", StartFuncAddDIYCount);
router.put("/customer/farmProduce/:pk", StartFuncAddFarmProduceCount);

module.exports = router;