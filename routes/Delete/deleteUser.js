const user = require('../../schema/JS/usermodel'); 
const StartFunc = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await user.findByIdAndDelete(userId);
        //delete user using email
        // const userEmail = req.params.email;
        // const deletedUser = await user.findOneAndDelete({ email: userEmail });
        if (!deletedUser) {
            return res.status(404).send("User not found");
        }
        return res.status(200).send("User deleted successfully");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
}

module.exports = StartFunc;