const item = require('../schema/nurseryModel'); 
const StartFunc = async (req, res) => {
    try {
        const items = await item.find().sort({ updatedAt: -1 });
        return res.status(200).send(items);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
}

module.exports = StartFunc;