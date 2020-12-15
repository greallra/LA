const express = require('express');
const router = new express.Router();
const Users = require('../models/users');
const Conversations = require('../models/conversations');
// const auth = require('../middleware/auth'); //middleware
const multer = require('multer');
const sharp = require('sharp');
// const { sendWelcomeEmail, sendCancellationEmail } = require('../emails/account');

// Get a user - login

router.post('/api/v1/users/me',async (req, res)=>{
    try {
        //find me
        let me = await Users.findOne({username: req.body.username})
        //get all conversations arrays im in and populate them with the users
        Conversations.find({ users: me._id.toString() })
            .populate('users')
            .exec(function (err, conversations) {
                if (err) return handleError(err);
                //filter me
                res.status(201).send({ me, conversations })
            });
    } catch (e) {
        console.log(e);
        res.status(400).send({error: e.message})
    }
})

//AVATAR
const upload = multer({
    //by removing dest, the data is passed into the function (route below: req.file)
    // dest: 'avatars',
    limits: {
        //1mb = one million
        fileSize: 1000000,  
    },
    // filter certain files
    fileFilter(req, file, cb) {
        //to throw error cb(new Error('file must be pdf'))
        //success = cb(undefined, true)
        //reject upload = cb(undefined, false)
        
        //
        if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
            return cb(new Error('images only'))
        }
        cb(undefined, true)
    }
})
// const middle =(req, res, next)=>{
//     throw new Error('i can be customized in a middleware')
// }


//'upload' needs to match key in postman
//2 middlewares is possible
router.post('/api/v1/users/me/avatars', upload.single('avatar') , async (req, res)=>{
    const _id = req.body._id;
    console.log("file", req.file);
    //using sharp here
    //convert to png (all images will be png) + resize
    const buffer = await sharp(req.file.buffer).resize({width:250, height: 250}).png().toBuffer()
    //because middleware is in place, req may not even get here below
    //all images checking has been done in middleware
    // req.user.avatar = buffer;
    Users.findByIdAndUpdate({_id}, { avatar: buffer }, function(e, s){
        console.log("saved avatar");
    })
    // await req.user.save()
    res.send("saved avatar");
    //redner html src="data:images;base64,[data]"
    //this 4th param handles an error that is throw
}, (error, req, res, next)=>{
    console.log(error);
    //will receive an error thrown in a middleware function

    res.status(400).send({error: error.message})
})

router.delete('/api/v1/users/me/avatars', async(req, res)=>{
    req.user.avatar = undefined; 
    await req.user.save();
    res.send();
}, (error, req, res, next)=>{
    //will receive an error thrown in a middleware function

    res.status(400).send({error: error.message})
})

//url to paste in browser http://localhost:3000/users/5f1ea7b14888f3644abe20e5/avatar
router.get('/api/v1/users/:id/avatar', async(req, res)=>{
    
    try {
        const user = await Users.findById(req.params.id);
        if(!user || !user.avatar) {
            throw new Error();
        }
        //set a response header
        //its automatically set to application/json
        //here we seding images
        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    } catch (e) {
        console.log("e",e.message);
        res.status(404).send({error: e.message});
    }
})


module.exports = router;

