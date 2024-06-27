const item = require('../schema/diyModel'); 
const StartFunc = async (req, res) => {
    try {
        const itemPk = req.params.pk;
        const deletedItem = await item.findOneAndDelete({diy_pk:itemPk});
        //delete user using email
        // const userEmail = req.params.email;
        // const deletedUser = await user.findOneAndDelete({ email: userEmail });
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