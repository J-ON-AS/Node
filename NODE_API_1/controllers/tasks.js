const asyncWrapper = require('../middlewares/async')
const Football = require('../models/Task')

const getAllTasks = asyncWrapper( async (req, res) => {
    const Players = await Football.find({})
    res.status(200).json({Players})
  
})

const createTask = asyncWrapper( async (req, res) => {
    const playerInfo = await Football.create(req.body)
    res.status(201).json({ playerInfo })
  
})
const deleteTask = asyncWrapper( async (req, res) => {
 
  const {id:taskId} = req.params
  console.log(req.params)
  const task = await Football.findOneAndDelete({_id:taskId})
  if(!task){
  return res.status(404).json({msg:`No player with id : ${taskId}`})
  }
  res.status(200).json({msg:`Deleted entry with id : ${taskId}`})

})
const updateTask = asyncWrapper( async (req, res) => {
    const {id:taskID} = req.params
    const task = await Football.findOneAndUpdate(
      {_id:taskID},
      req.body,
      {new:true , runValidators:true}
      )
      if(!task){
      return res.status(404).json({msg:`No player with id : ${taskId}`})
      }
      res.status(200).json({ task })
      
})
const getTask = asyncWrapper( async (req, res) => {
   const {id:taskId} = req.params
   const task = await Football.findOne({_id:taskId})
   if(!task){
    return res.status(404).json({msg:`No player with id ${taskId}`})
   }
   res.status(200).json({task})
 
})
module.exports = {
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
  createTask,
}