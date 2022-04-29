const express = require('express');
const functions = require('./functions')
require('dotenv').config();

const router = express.Router()

const {addToDo, 
    getAToDo, 
    getAllToDo, 
    returnItemId,
    updateToDo, 
    deleteToDo} = functions


router.post('/create', async(req, res) => {
    if (req.body.item) {
        try {
            await addToDo(req.body.item)
            const itemId = await returnItemId()
            const item = await getAToDo(JSON.parse(JSON.stringify(itemId[0])).last_entry)
            res.status(201).send({
                message : "New item added", 
                item
            })
        }
        catch (error) {
            res.send({errno: 101, message : error.message})
        }
    }
    else {
        res.status(500).send({
            error:"104" ,
            message : "Enter item property correctly."
        })
    }
})

router.get('/get', async(req, res) => {
    if (req.body.id) {
        try {
            const result = await getAToDo(req.body.id)
            if (result.length == 1) {
                res.status(200).send({
                    Item : result[0]})
            }
            else {
                res.status(401).send({
                    error:"106" ,
                    message : "Item id does not exist."
                })
            }
        }
        catch (error) {
            res.send({errno : 102, message : error.message})
        }
    }
    else {
        res.status(500).send({
            error:"109" ,
            message : "Enter item id property correctly."
        })
    }
})

router.get('/get_all', async(req, res) => {
    try {
        const result = await getAllToDo()
        if (result.length >= 1) {
            res.status(200).send({"To-do items" : result})
        }
        else {
            res.status(401).send({message : "You have no to-do yet."})
        }
    }
    catch(error) {
        res.send({errno : 103, message : error.message})   
    }
})

router.patch('/update', async(req, res) => {
    if (req.body.id && req.body.item) {
        try {
            await updateToDo(req.body.id, req.body.item)
            const new_item = await getAToDo(req.body.id)
            if (new_item.length == 1) {
                res.status(201).send({
                    message : "Item updated!",
                    new_item
                })
            }
            else {
                res.status(401).send({
                    message : "Item does not exist!"
                })
            }
        }
        catch(error) {
            res.send({errno : 104, message : error.message})
        }
    }
    else {
        res.status(500).send({
            error:"109" ,
            message : "All properties must be entered correctly."
        })
    }
})

router.delete('/delete', async(req, res) => {
    if (req.body.id) {
        try {
            const new_item = await getAToDo(req.body.id)
            if (new_item.length == 1) {
                await deleteToDo(req.body.id)
                res.status(200).send({message : "An item has been deleted."})
            }
            else {
                res.status(401).send({
                    message : "Item does not exist!"
                })
            }
        }
        catch (error) {
            res.send({errno: 105, message : error.message})
        }
    }
    else {
        res.status(500).send({
            error:"104" ,
            message : "Enter id correctly."
        })
    }
})

module.exports = router