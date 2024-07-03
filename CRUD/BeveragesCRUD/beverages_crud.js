const express = require("express");

const StartFuncCreateBeverages = require("../../routes/Create/createBeverages");
const StartFuncGetBeverages = require("../../routes/Get/getBeveragesItems");

const router = express.Router();

router.post("/createBeverages", StartFuncCreateBeverages);
router.get("/getBeverages", StartFuncGetBeverages);

module.exports = router;