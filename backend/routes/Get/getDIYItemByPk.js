const nursery = require('../../schema/JS/diyModel'); 

const StartFunc = async (req, res) => {
    try {
        const diypk = req.params.pk; 
        const foundItem = await nursery.findOne({ diy_pk: diypk }); 
        if (!foundItem) {
            return res.status(404).send("DIY Item not found");
        }
        return res.status(200).send(foundItem);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
}

module.exports = StartFunc;
