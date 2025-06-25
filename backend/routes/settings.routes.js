const express = require('express')
const {Settings, Order} = require('../db/schemas')

const router = express.Router()

router.post('/add_order', async (req, res) => {
    const user = req.body.user
    const room = req.body.room
    const hour = req.body.hour
    const day = req.body.day

    try{
        const userSettings = await Settings.findOne({user: user})
        userSettings.orders.push({room: room, hour: hour, day: day})
        await userSettings.save()
        res.status(200).json({message: "Order added successfully"})
    }
    catch(err){
        res.status(500).json({message: "Failed adding order with following error: " + err.message})
    }
})

router.delete('/delete_order', async (req, res) => {
    const user = req.body.user
    const room = req.body.room
    const hour = req.body.hour
    const day = req.body.day

    try{
        const userSetting = await Settings.findOne({user: user})
        userSetting.orders = userSetting.orders.filter(order => order.room !== room && order.hour !== hour && order.day !== day)
    }
    catch(err){
        res.status(500).json({message: "Failed deleting order with following error: " + err.message})
    }
})

router.get(':user', async (req, res) => {
    const user = req.params.user

    try{
        const userSettings = await Settings.findOne({user: user})
        res.status(200).json(userSettings)
    }
    catch(err){
        res.status(500).json({message: "Failed getting settings with following error: " + err.message})
    }
})

router.post('/create_settings', (req, res) => {
    const user = req.body.user
    const settings = new Settings({
        orders: [],
        user: user
    })

    settings.save()
    res.status(200).json({message: "Settings created successfully"})
})

Module.exports = router
