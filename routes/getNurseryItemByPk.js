const nursery = require('../schema/nurseryModel'); 

const StartFunc = async (req, res) => {
    try {
        const nurseryPk = req.params.pk; 
        const foundItem = await nursery.findOne({ nursery_pk: nurseryPk }); 
        if (!foundItem) {
            return res.status(404).send("Nursery Item not found");
        }
        return res.status(200).send(foundItem);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
}

module.exports = StartFunc;
