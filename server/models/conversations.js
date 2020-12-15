const mongoose = require('mongoose');
//const validator = require('validator');

const conversationsSchema = new mongoose.Schema({
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'Users'}],
    // completed: {
    //     type: Boolean,
    //     default: false
    // },
    // //id of creator
    // owner: {
    //     type: mongoose.Schema.Types.ObjectId, //the standard mongodb id
    //     required: true,
    //     //reference to another model: user, allows access to users easily via task
    //     ref: 'User'
    // }
}, {
    timestamps: true
})

// conversationsSchema.pre('save', async function() {
//     const task = this;
//     console.log("conversationsSchema MIDDLEWARE RAN", task);
// })

const Conversations = mongoose.model('Conversations', conversationsSchema)

module.exports = Conversations;


// Conversations.update(
//     { _id: "5fd7660f6a3cb82b9e608c88" }, 
//     { $push: { _id: friend } },
//     done
// );

// let c1 = new Conversations({
//     users: ["5fd0aae07a02e7cea2814f0d", "5fd77d21c300d1327ecffecf"]
// })
// c1.save(function(e, s) {
//     console.log(e);
//     console.log(s);
// })

let callback = function(e, s){
    console.log(e);
    console.log(s);
}
// let me = await Users.findOne({username: req.body.username})
// console.log("me._id", typeof me._id);
//Conversations.find( { users: "5fd0aa68afd780ce6a9dbf03"} , callback);

// res.status(201).send({user, token})

// Conversations.findOne({_id: "5fd778682aab6830e543c670"})
//   .populate('users')
//   .exec(function (err, users) {
//     if (err) return handleError(err);
//     console.log('The author is %s', users);
//     // prints "The author is Ian Fleming"
//   });