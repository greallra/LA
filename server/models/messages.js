const mongoose = require('mongoose');
// const validator = require('validator');

const messageSchema = new mongoose.Schema({
    conversation_id: {
        type: String,
        required: true
    },
    original_message: {
        type: String,
        required: true,
        // trim: true,
    },
    correction_message: {
        type: String,
    },
    sender: {
        type: String,
        required: true
    }, 
    sender_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Users'
    },
    perfect: {
        type: Boolean,
        default: false
    }
    //id of creator
    // owner: {
    //     type: mongoose.Schema.Types.ObjectId, //the standard mongodb id
    //     required: true,
    //     //reference to another model: user, allows access to users easily via task
    //     ref: 'User'
    // }
}, {
    timestamps: true
})

// taskSchema.pre('save', async function() {
//     const task = this;
//     console.log("TASK MIDDLEWARE RAN", task);
// })

const Messages = mongoose.model('Messages', messageSchema)

module.exports = Messages;

let id = "5fd0abb514d59acf00cdc2a2";

//  var callback = function(e, suc) {
//      console.log("e", e);
//      console.log("suc", suc);
//  };

// Messages.deleteMany({}, callback)

//type 1
// let m1 = new Messages({
//     conversation_id: id,    
//     sender: 'greallz',
//     original_message: 'How is you?',
//     correction_message: ''
// })

//type 2 - edits message 1 by adding correction_message

//type 3
// let m3 = new Messages({
//     conversation_id: id,    
//     sender: 'ollie',
//     original_message: 'Thats good',
//     perfect: true
// })



// m3.save(function (err, m3) {
//     if (err) return console.error(err);
 
//   });
// Messages.find({ conversation_id: id }, function (e, suc) {
//     if(e) return console.log(e);
//     console.log(suc);
// })