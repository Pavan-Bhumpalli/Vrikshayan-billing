const express = require("express");

const StartFuncCreateNursery = require("../../routes/Create/createNursery");
const StartFuncGetNurseryItems = require("../../routes/Get/getNurseryItems");
const StartFuncDeleteNurseryItem = require("../../routes/Delete/deleteNurseryItem");
const StartFuncGetNurseryItemByPk = require("../../routes/Get/getNurseryItemByPk");


const router = express.Router();

router.post("/createNurseryItem", StartFuncCreateNursery);
router.get("/getNurseryItems", StartFuncGetNurseryItems);
router.get("/getNurseryItem/:pk", StartFuncGetNurseryItemByPk);
router.delete("/NurseryItem/:pk", StartFuncDeleteNurseryItem);

module.exports = router;