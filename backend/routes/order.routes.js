const express = require('express')
const {Settings, Orders} = require('../db/schemas')

const router =  express.Router()

router.post('/make_order', async (req, res) => {
    try {
        const room = req.body.room
        //implement webscarper func that roders room
        const status = await make_order(room)
        //add room to db with the status failed or succeeded
        
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.post('/add_order', (req, res) => {
    try {
        const room = req.body.room
        cancel_order(room)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.get('/get_orders', async (req, res) => {
    try{
    const user = req.body.user
    const usersOrders = await Orders.find({user: user})
    res.status(200).json({orders: usersOrders})
    }
    catch(err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = router