const express=require("express");

const StartFuncCreateCustomer = require("../../routes/Create/createCustomer");
const StartFuncGetCustomers = require("../../routes/Get/getCustomers");
const StartFuncGetCustomerById = require("../../routes/Get/getCustomerById");
const StartFuncDeleteCustomerById = require("../../routes/Delete/deleteCustomerById");
const StartFuncTodayCustumers = require("../../routes/today");

const router = express.Router();

router.post("/createCustomer", StartFuncCreateCustomer);
router.get("/getCustomers", StartFuncGetCustomers);
router.get("/getCustomer/:pk", StartFuncGetCustomerById);
router.delete("/customer/:id", StartFuncDeleteCustomerById);
router.get("/getCustomers/today", StartFuncTodayCustumers);

module.exports = router;