const express= require("express");

const StartFuncCreateFarmProduce = require("../../routes/Create/createFarmProduce");
const StartFuncGetFarmProduce = require("../../routes/Get/getFarmProduce");
const StartFuncDeleteFarmProduceByPk = require("../../routes/Delete/deleteFarmProduceByPk");
const StartFuncUpdateFarmProduceItem = require("../../routes/Update/updateFarmProduceItem");

const router = express.Router();
router.post("/createFarmProduce", StartFuncCreateFarmProduce);
router.get("/getFarmProduces", StartFuncGetFarmProduce);
router.put("/farmProduce/:pk", StartFuncUpdateFarmProduceItem);
router.delete("/farmProduce/:pk", StartFuncDeleteFarmProduceByPk)

module.exports = router;