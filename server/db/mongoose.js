const mongoose = require('mongoose');
const Messages = require('../models/messages');
const Pusher = require("pusher");

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true
  });
  
  
  const mongoUrl = process.env.MONGO_ATLAS_URL
  mongoose.connect(mongoUrl, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
  })
  const db = mongoose.connection
  
  db.once('open', () => {
      console.log("db connected");
      //the collection string name must match in atlas exactly
      const msgCollection = db.collection('messages')
      //listen to change of collection
      const changeStream = msgCollection.watch();
      //trigger an event
      changeStream.on('change', (change) => {
          console.log("change", change);
  
          if(change.operationType === 'insert') {
              const newMessage = change.fullDocument;
              // 1. channel name 2. event name 3. data
              pusher.trigger('my-channel', 'new-message', newMessage)
          } else {
              console.log("Error triggering pusher");
          }
          if(change.operationType === 'update') {
              const updates = change.updateDescription.updatedFields;
              const message_id = change.documentKey._id
              const data = {
                  ...updates,
                  message_id: message_id
              }
              // 1. channel name 2. event name 3. data
              pusher.trigger('my-channel', 'updated-message', data)
          } else {
              console.log("Error triggering pusher");
          }
      })  
  
  })
