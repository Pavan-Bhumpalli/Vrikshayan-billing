const item = require('../schema/custModel');
const StartFunc = async (req, res) => {
    try {
        const itemPk = req.params.pk;
        const deletedItem = await item.activities.nurseryCount.findOneAndDelete({ pk: itemPk });
        if (!deletedItem) {
            return res.status(404).send("Item not found");
        }
        return res.status(200).send("Item deleted successfully");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
}

module.exports = StartFunc;