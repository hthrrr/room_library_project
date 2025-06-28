const express = require('express');
const { users, appointment } = require('../db/schemas');

const router = express.Router();

router.post('/register', async (req, res) => {
    const {username, password, uniusername, unipassword} = req.body
    console.log("register api called")
    try{
        const user = await users.findOne({username: username})
        if (user) {
            res.status(400).json({message: 'User already exists'})
        }
        else {
            const newUser = new users({username, password, uniusername, unipassword})
            await newUser.save()
            res.status(200).json({message: 'User created successfully'})
        }
    }
    catch(err){
        res.status(500).json({message: 'Internal server error: ' + err.message})
    }
})


module.exports = router

