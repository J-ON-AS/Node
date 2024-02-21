const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');
// const {BadRequestError} = require('../errors')
const bycrypt = require('bcryptjs');
const register = async (req,res)=>{
  // const {name , email,password} = req.body;

  // const namak = await bycrypt.genSalt(10);
  // const hashedPassword = await bycrypt.hash(password,namak);
  // const tempUser = {name , email , password:hashedPassword}
  const user = await User.create({...req.body});
  const token = jwt.sign({userId:user._id,name:user.name},'jwtsecret',{expiresIn: '30d',})
  res.status(StatusCodes.CREATED).json({user:{name:user.name},token });
}
const login = async (req,res)=>{
  res.send('login user');
}

module.exports ={
  login,
  register,
}