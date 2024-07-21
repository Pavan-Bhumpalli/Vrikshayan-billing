const item = require('../../schema/JS/beveragesModel');

const StartFunc = async (req,res) => {
    try {
        const items = await item.find();
        return res.status(200).send(items);
    }
    catch(error){
        console.log(error);
        return res.status(500).send("Server Error");
    }
}

module.exports = StartFunc;