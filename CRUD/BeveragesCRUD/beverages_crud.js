const express = require("express");

const StartFuncCreateBeverages = require("../../routes/Create/createBeverages");
const StartFuncGetBeverages = require("../../routes/Get/getBeveragesItems");
const StartFuncDeleteBeverageByPk = require("../../routes/Delete/deleteBeverageByPk");

const router = express.Router();

router.post("/createBeverages", StartFuncCreateBeverages);
router.get("/getBeverages", StartFuncGetBeverages);
router.delete("/beverage/:pk", StartFuncDeleteBeverageByPk);

module.exports = router;