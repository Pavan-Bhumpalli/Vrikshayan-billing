const diy = require('../schema/diyModel');

const StartFunc = async (req, res) => {
    try {
        let obj = req.body;
        // obj.nurseryCount=
        // {
        //     "name":"",
        //     "cost":0,
        //     "quantity":0
        // }
        let newDIY = new diy(obj);
        await newDIY.save();
        return res.status(201).send(newDIY);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
}

module.exports = StartFunc;