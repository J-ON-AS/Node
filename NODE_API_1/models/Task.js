const mongoose = require('mongoose')

const FballSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,"Must have a name"],
    trim:true,
    maxlength:[25,"Name cannot have more than 25 chars"],
  },
  completed :{
    type:Boolean,
    default:'false'
  },
})

module.exports = mongoose.model('Football',FballSchema)

//model provides interface to our database 
// Schema gives structure to our  database as mongoDB is non relational so we predefine the Schema