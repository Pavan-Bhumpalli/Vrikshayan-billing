const customer = require('../schema/custModel'); 

const StartFuncGetCustomerById = async (req, res) => {
    try {
        const custPk = req.params.pk; 
        const foundCustomer = await customer.findOne({ pk: custPk }); 
        if (!foundCustomer) {
            return res.status(404).send("Customer not found");
        }
        return res.status(200).send(foundCustomer);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
}

module.exports = StartFuncGetCustomerById;
