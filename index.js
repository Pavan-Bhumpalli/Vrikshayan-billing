const express = require("express");
const mongoose = require("mongoose");
const configJSON = require("./config.json");
const user = require("./schema/usermodel");
const app = express();

mongoose.connect(configJSON.mongodbURI).then(() => {
    console.log("Connected to MongoDB");
})

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to Vrikshyan");
});

app.post("/register", async (req, res) => {
    try {
        let obj = req.body;
        const exist= await user.findOne({ email: obj.email });
        if(exist){
            return res.status(400).send("User Already Exists");
        }
        if(obj.password !== obj.confirmpassword){
            return res.status(400).send("Password and Confirm Password do not match");
        }
        let newUser = new user(obj);
        await newUser.save();
        return res.status(201).send({state: "User Registered", value:newUser});

    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
});

app.get("/login", async(req, res)=>{
    try{
        let obj=req.body;
        const exist= await user.findOne({ email: obj.email });
        if(!exist){
            return res.status(400).send("User does not exist");
        }
        if(obj.password !== exist.password){
            return res.status(400).send("Password is incorrect");
        }
        return res.status(200).send("User Logged In");
    }
    catch(error){
        console.log(error);
        return res.status(500).send("Server Error");
    }
});

app.get("/users", async(req, res)=>{
    try{
        const users= await user.find();
        return res.status(200).send(users);
    }
    catch(error){
        console.log(error);
        return res.status(500).send("Server Error");
    }
});


app.listen(configJSON.port, () => {
    console.log("Server is running on port 5000");
});