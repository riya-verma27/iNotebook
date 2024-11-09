const express = require('express');
require('dotenv').config(); 
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt= require('bcryptjs')
const router = express.Router();
var jwt= require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser');
//const JWT_SECRET = 'Harryisagoodb$oy';
const JWT_SECRET = process.env.JWT_SECRET;

console.log("JWT SECRET", JWT_SECRET);

// ROUTE 1: Create a User using POST "/api/auth/createuser" , Doesn't require auth
router.post('/createuser', [
    body('email', 'Inavlid Email').isEmail(),
    body('name', 'Name should consist of more than 3 letters').isLength({ min: 3 }),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    let success=false;
    //If there are errors, return Bad Request and Errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
    }
    //check whether user with this email exists or not
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "User with this email already exists" });
        }
        const salt= await bcrypt.genSalt(10);
        const secPass=  await bcrypt.hash(req.body.password,salt);
        //create a new User
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })
        const data={
            user:{
                id: user.id
            }
        }
        const authToken= jwt.sign(data, JWT_SECRET, { expiresIn: '24h' });
        //res.json(user);
        success=true;
        res.json({success,authToken});

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
//ROUTE 2: Authenticate a User using POST "/api/auth/login" , Doesn't require auth
router.post('/login', [
    body('email', 'Inavlid Email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    let success=false;
    //If there are errors, return Bad Request and Errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    const {email,password}=req.body;
    try{
        let user= await User.findOne({email});
        if(!user){
            return res.status(400).json({success, error:"Invalid username or password"});
        }
        const passwordCompare = await bcrypt.compare(password, user.password);//This will return true or false
        //Case when password is incorrect
        if(!passwordCompare){
            return res.status(400).json({success,error:"Invalid username or password"});
        }
        //case if password is correctly entered
        const data={
            user:{
                id: user.id
            }
        }
        console.log("JWT SECRET", JWT_SECRET);
        const authToken= jwt.sign(data, JWT_SECRET, { expiresIn: '24h' } );
        success=true;
        res.json({success,authToken});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
//ROUTE 3: Get loggedin user details "/api/auth/getuser". Login Required
router.post('/getuser',fetchuser, async (req, res) => {
try{
    const userId= req.user.id;
    const user =await User.findById(userId).select("-password");
    res.send(user);
}
catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
})
module.exports = router;