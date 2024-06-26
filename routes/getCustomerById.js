const customer = require('../schema/custModel'); 
const StartFunc = async (req, res) => {
    try {
        const custId = req.params.id;
        const foundCustomer = await customer.findById(custId);
        if (!foundCustomer) {
            return res.status(404).send("Customer not found");
        }
        return res.status(200).send(foundCustomer);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
}

module.exports = StartFunc;