const customer = require('../../schema/JS/custModel'); 
const StartFunc = async (req, res) => {
    try {
        const customers = await customer.find().sort({ createdAt: -1 });
        return res.status(200).send(customers);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
}

module.exports = StartFunc;