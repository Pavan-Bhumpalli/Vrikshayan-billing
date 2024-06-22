const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const jwt=require("jsonwebtoken");

const middleware=require("./middleware");
const configJSON = require("./config.json");
const user = require("./schema/usermodel");
const app = express();

mongoose.connect(configJSON.mongodbURI).then(() => {
    console.log("Connected to MongoDB");
})

app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Welcome to Vrikshyan");
});

app.post("/register", async (req, res) => {
    try {
        let arr = req.body;
        let registeredUsers=[];
        arr.map(async (obj) => {
            const exist = await user.findOne({ email: obj.email });
            if (exist) {
                return res.status(400).send("User Already Exists");
            }
            if (obj.password !== obj.confirmpassword) {
                return res.status(400).send("Password and Confirm Password do not match");
            }
            let newUser = new user(obj);
            await newUser.save();
            registeredUsers.push(newUser);
            console.log(registeredUsers);
        });
        return res.status(201).send(registeredUsers);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
});

app.post("/login", async (req, res) => {
    try {
        let obj = req.body;
        const exist = await user.findOne({ email: obj.email });
        if (!exist) {
            return res.status(400).send("User does not exist");
        }
        if (obj.password !== exist.password) {
            return res.status(400).send("Password is incorrect");
        }
        let payload={
            user:{
                id:exist.id
            }
        }
        jwt.sign(payload,configJSON.jwtSecret,{expiresIn:3600000},(err,token)=>{
            if(err) throw err;
            return res.json({token});
        });

        // return res.status(200).send("User Logged In");
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
});

app.get("/users",middleware,  async (req, res) => {
    try {
        const users = await user.find();
        return res.status(200).send(users);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
});

app.get("/user/:id",middleware, async (req, res) => {
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
});

app.delete("/user/:id",middleware, async (req, res) => {
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
});


app.listen(configJSON.port, () => {
    console.log("Server is running on port http://localhost:" + configJSON.port);
});