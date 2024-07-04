const user = require('../../schema/JS/diyModel'); 
const StartFunc = async (req, res) => {
    try {
        const ItemPk = req.params.pk;
        const data=req.body;
        const foundItem = await user.findOneAndUpdate({item_pk:ItemPk},data);
        if (!foundItem) {
            return res.status(404).send("Item not found");
        }
        return res.status(200).send(foundItem);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
}

module.exports = StartFunc;