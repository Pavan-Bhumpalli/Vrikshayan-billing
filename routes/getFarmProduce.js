const farmProduce = require('../schema/FarmProduceModal');
const StartFunc = async (req, res) => {
    try {
        const farmProduces = await farmProduce.find();
        return res.status(200).send(farmProduces);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
}

module.exports = StartFunc;