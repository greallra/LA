const express = require('express');
const Messages = require('../models/messages');
const router = new express.Router();


//get messages of a conversation
router.post('/api/v1/messages', async (req, res) => {

    let id = req.body.conversation_id;
    //get messages where M.conversation._id = id
   
    try {
        let messages = await Messages.find({ conversation_id: id })
        res.status(200).send(messages)
    } catch (error) {
        res.send({error: e.message})
    }
})

//send message - saved new message to db
router.post('/api/v1/messages/new', async (req, res) => {
    const newMessage = req.body;
    console.log("newMessage", newMessage);
    try {
        await Messages.create( newMessage );      
        res.status(200).send('done')
    } catch (error) {
        console.log(error);
        res.status(400).send({error: error.message})
    }

})
//edit message 
router.post('/api/v1/messages/edit', async (req, res) => {
    const _id = req.body.message_id;
    delete req.body.message_id
    const edits = req.body;
    console.log("edits", edits);
   
    try {
        await Messages.findByIdAndUpdate( {_id}, edits);      
        res.status(200).send('edit done')
    } catch (error) {
        console.log(error);
        res.status(400).send({error: error.message})
    }

})
//edit a message and create message
router.post('/api/v1/messages/edit-send', async (req, res) => {

    const editMessageId = req.body.message_id
    const updates = { correction_message: req.body.correction_message } 
    const newMessage = {
        conversation_id: req.body.conversation_id,
        sender: req.body.sender,
        original_message: req.body.original_message
    }
    console.log("editMessageId", editMessageId);
    console.log("updates", updates);
    console.log("newMessage", newMessage);
    try {
        await Messages.findByIdAndUpdate( {_id: editMessageId}, updates);
        await Messages.create( newMessage );     
        res.status(200).send('edit-create done')
    } catch (error) {
        console.log(error);
        res.status(400).send({error: error.message})
    }
    
})

module.exports = router;
