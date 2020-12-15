const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb+srv://greallra:p@cluster0.aff2l.mongodb.net/whatsappdb?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection

const personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

const storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

const Story = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);

// const fansListToAdd = [ 
//     {
//         _id: "5fd73a77912ad92326d12efb",
//     }, 
// ]
// var query = { title: 'Casino Royale' },
//     options = {},
//     callback = function (err, result) { console.log(result); };
// Story.update(query, { $push: { fans: { $each: fansListToAdd } } }, options, callback)

let callback = function(e, s) {
    console.log("e", e);
    console.log("s", s);
    s.stories.push("5fd73a77912ad92326d12efc", function (e, s) {
        if(e) return console.log("e", e)
        console.log("pushed", s);
    });
}

// Story.create([
//     { title: 'Live and Let Die', fans: ["5fd74372062c43258b5c03df", "5fd73a77912ad92326d12efb"] }
//   ], callback);

// Story.
//   findOne({ title: 'Casino Royale' }).
//   populate('fans').
//   populate('author').
//   exec(function (err, story) {
//     if (err) return handleError(err);
//     console.log('story', story);
//     // prints "The author is Ian Fleming"
//   });

let author = Person.findOne({name: 'Ian Fleming'}, callback)


// author.save(callback);

// let story1 = "5fd73a77912ad92326d12efc"