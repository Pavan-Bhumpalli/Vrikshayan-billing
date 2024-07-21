const express = require('express');

const StartFuncCreateDIY = require("../../routes/Create/createDIY");
const StartFuncGetDIYItems = require("../../routes/Get/getDIYItems");
const StartFuncGetDIYItemByPk = require("../../routes/Get/getDIYItemByPk");
const StartFuncDeleteDIYItemByPk = require("../../routes/Delete/deleteDIYItemByPk")
const StartFuncUpdateDiyItem = require("../../routes/Update/updateDIYItem");

const router = express.Router();
router.post("/createDIYItem", StartFuncCreateDIY);
router.get("/getDIYItems", StartFuncGetDIYItems);
router.get("/getDIYItem/:pk", StartFuncGetDIYItemByPk);
router.put("/diy/:pk", StartFuncUpdateDiyItem);
router.delete("/diyItem/:pk", StartFuncDeleteDIYItemByPk);

module.exports = router;