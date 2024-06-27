const beverages = require('../schema/beveragesModel');

const StartFunc = async (req, res) => {
    try {
        let obj = req.body;

        // obj=
        // {
        //     "name":"cococola",
        //     "cost":100
        // }

        let newBeverages = new beverages(obj);
        await newBeverages.save();
        return res.status(201).send(newBeverages);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
}

module.exports = StartFunc;