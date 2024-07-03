const express= require("express");

const StartFuncCreateFarmProduce = require("../../routes/Create/createFarmProduce");
const StartFuncGetFarmProduce = require("../../routes/Get/getFarmProduce");
const StartFuncDeleteFarmProduceByPk = require("../../routes/Delete/deleteFarmProduceByPk");

const router = express.Router();
router.post("/createFarmProduce", StartFuncCreateFarmProduce);
router.get("/getFarmProduces", StartFuncGetFarmProduce);
router.delete("/farmProduce/:pk", StartFuncDeleteFarmProduceByPk)

module.exports = router;