const nursery = require('../../schema/JS/nurseryModel');

const StartFunc = async (req, res) => {
    try {
        let obj = req.body;
        // obj.nurseryCount=
        // {
        //     "name":"",
        //     "cost":0,
        //     "quantity":0
        // }
        let newNursery = new nursery(obj);
        await newNursery.save();
        return res.status(201).send(newNursery);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
}

module.exports = StartFunc;