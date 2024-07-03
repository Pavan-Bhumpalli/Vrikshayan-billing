const express= require("express");

const StartFuncCreateFarmProduce = require("../../routes/Create/createFarmProduce");
const StartFuncGetFarmProduce = require("../../routes/Get/getFarmProduce");

const router = express.Router();
router.post("/createFarmProduce", StartFuncCreateFarmProduce);
router.get("/getFarmProduces", StartFuncGetFarmProduce);

module.exports = router;