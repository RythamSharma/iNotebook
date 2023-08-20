const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'erfsivbfsdfhbxv';
const fetchuser = require('../middleware/Fetchuser');

router.post(
  '/createuser',
  [
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('password').isLength({ min: 5 }).withMessage('minimum length of password is 5'),
    body('email').isEmail()

  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await User.findOne({email: req.body.email});
    if(user){
      console.log("user already exist");
      return res.status(400).json({success})
      
    }
    var salt = await bcrypt.genSaltSync(10);
    securepass = await bcrypt.hashSync(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      email : req.body.email,
      password: securepass,
    })
    const data={
      user:{
        id: user.id
      }
    }
    const authtoken = jwt.sign(data,JWT_SECRET);
    success=true;
    res.json({authtoken,success})
    console.log(req.body);
  }
);

router.post(
  '/login',
  [
    body('password','password can not be blank').exists(),
    body('email','enter valid email').isEmail()

  ],
  async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await User.findOne({email: req.body.email});
    if(!user){
      success = false
      return res.status(400).json({error:"please enter correct credentials"})
    }
    const comparepass=  await bcrypt.compare(req.body.password,user.password)
    if(!comparepass){
      success = false
      return res.status(400).json({error:'enter valid credentials'});
    }
    const data={
      user:{
        id: user.id
      }
    }
    success = true
    const authtoken = jwt.sign(data,JWT_SECRET);
    res.json({success,authtoken})
  }
);

router.post('/getuser', fetchuser , async (req, res) => {
    try {
      const userid=req.user.id;
      const user = await User.findById(userid).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message)
      res.status(500).send("server error")
    }
  })
module.exports = router;