const user = require('../schema/usermodel'); 
const StartFunc = async (req, res) => {
    try {
        const userId = req.params.id;
        const foundUser = await user.findById(userId);
        if (!foundUser) {
            return res.status(404).send("User not found");
        }
        return res.status(200).send(foundUser);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
}

module.exports = StartFunc;