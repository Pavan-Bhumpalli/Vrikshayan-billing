const express = require('express');
const router = express.Router();

const StartFuncRegisterUser = require('../../routes/signUp-Login/register');
const StartFuncLoginUser = require('../../routes/signUp-Login/login');
const StartFuncGetAllUsers = require("../../routes/Get/getAllUsers");
const StartFuncGetUserById = require("../../routes/Get/getUserById");
const StartFuncDeleteUser = require("../../routes/Delete/deleteUser");

router.post('/register', StartFuncRegisterUser);
router.post('/login', StartFuncLoginUser);
router.get('/users', StartFuncGetAllUsers);
router.get('/user/:id', StartFuncGetUserById);
router.delete('/user/:id', StartFuncDeleteUser);

module.exports = router;
