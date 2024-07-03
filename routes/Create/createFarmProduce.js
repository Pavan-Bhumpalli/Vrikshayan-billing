const farmproduce = require('../../schema/JS/FarmProduceModal');

const StartFunc = async (req, res) => {
    try {
        let obj = req.body;
        let newFarmProduce = new farmproduce(obj);
        await newFarmProduce.save();
        return res.status(201).send(newFarmProduce);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
}

module.exports = StartFunc;