const item = require('../schema/custModel');

const StartFunc = async (req, res) => {
    try {
        const customerPk = req.params.pk;
        const itemPk = req.params.item_Pk;

        const updatedCustomer = await item.findOneAndUpdate(
            { pk: customerPk },
            { $pull: { 'activities.nurseryCount': { item_Pk: itemPk } } },
            { new: true }
        );

        if (!updatedCustomer) {
            return res.status(404).send("Item not found");
        }

        return res.status(200).send("Item deleted successfully");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
}

module.exports = StartFunc;
