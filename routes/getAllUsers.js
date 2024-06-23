const user = require('../schema/usermodel'); 
const StartFunc = async (req, res) => {
    try {
        const users = await user.find();
        return res.status(200).send(users);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
}

module.exports = StartFunc;