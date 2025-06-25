const express = require('express')
const {Settings, Order} = require('../db/schemas')

const router =  express.Router()

router.post('/make_order', async (req, res) => {
    try {
        const room = req.body.room
        make_order(room)
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
    const usersOrders = await Order.find({user: user})
    res.status(200).json({orders: usersOrders})
    }
    catch(err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = router