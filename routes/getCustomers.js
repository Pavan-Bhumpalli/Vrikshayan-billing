const customer = require('../schema/custModel'); 
const StartFunc = async (req, res) => {
    try {
        const customers = await customer.find().sort({ updatedAt: -1 });
        return res.status(200).send(customers);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
}

module.exports = StartFunc;