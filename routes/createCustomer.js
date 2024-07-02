const customer = require('../schema/custModel');

const StartFunc = async (req, res) => {
    try {
        let obj = req.body;
        obj.activities=
        {
            movieCount:0,
            lunchCount:0,
            diyCount:[],
            beverages:[],
            farmProduce:[]
        }
        let newCustomer = new customer(obj);
        await newCustomer.save();
        return res.status(201).send(newCustomer);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
}

module.exports = StartFunc;