const express = require("express");

const StartFuncCreateBeverages = require("../../routes/Create/createBeverages");
const StartFuncGetBeverages = require("../../routes/Get/getBeveragesItems");
const StartFuncDeleteBeverageByPk = require("../../routes/Delete/deleteBeverageByPk");
const StartFuncUpdateBevarageItem = require("../../routes/Update/updateBeverageItem");

const router = express.Router();

router.post("/createBeverages", StartFuncCreateBeverages);
router.get("/getBeverages", StartFuncGetBeverages);
router.put("/beverage/:pk", StartFuncUpdateBevarageItem);
router.delete("/beverage/:pk", StartFuncDeleteBeverageByPk);

module.exports = router;