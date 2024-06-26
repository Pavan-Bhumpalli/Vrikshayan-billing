const customer = require('../schema/custModel'); 
const StartFunc = async (req, res) => {
    try {
        const customerId = req.params.id;
        const deletedUser = await customer.findByIdAndDelete(customerId);
        //delete user using email
        // const userEmail = req.params.email;
        // const deletedUser = await user.findOneAndDelete({ email: userEmail });
        if (!deletedUser) {
            return res.status(404).send("Customer not found");
        }
        return res.status(200).send("Customer deleted successfully");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
}

module.exports = StartFunc;