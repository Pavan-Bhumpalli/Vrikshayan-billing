const user = require('../../schema/JS/usermodel');

const StartFunc = async (req, res) => {
    try {
        let obj = req.body;
        const exist = await user.findOne({ email: obj.email });
        if (exist) {
            return res.status(400).send("User Already Exists");
        }
        if (obj.password !== obj.confirmpassword) {
            return res.status(400).send("Password and Confirm Password do not match");
        }
        let newUser = new user(obj);
        await newUser.save();
        return res.status(201).send("User Registered Successfully!");
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
}

module.exports = StartFunc;