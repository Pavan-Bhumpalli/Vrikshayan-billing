const jwt = require('jsonwebtoken');
const user = require('../schema/usermodel'); 
const configJSON = require('../config.json'); 

const StartFunc = async (req, res) => {
    try {
        let obj = req.body;
        const exist = await user.findOne({ email: obj.email });
        if (!exist) {
            return res.status(400).send("User does not exist");
        }
        if (obj.password !== exist.password) {
            return res.status(400).send("Password is incorrect");
        }
        let payload = {
            user: {
                id: exist.id
            }
        }
        jwt.sign(payload, configJSON.jwtSecret, { expiresIn: 3600000 }, (err, token) => {
            if (err) throw err;
            return res.json({ token });
        });

        // return res.status(200).send("User Logged In");
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
};

module.exports = StartFunc;
