const mongoose = require('mongoose')
const Workout = require('../models/workoutsModel')

// Get all Workouts 

const getWorkouts = async (req , res) => {

  const user_id = req.user_id
  const workouts = await Workout.find({}).sort({createdAt : -1}) // Workout deeh 2l variable = require models/workouts fa bt2ollo ro7 23mal find henak 

  
  //createdAt is just a variable okay and -1 so the new will display first

  res.status(200).json(workouts) // workouts deeh 2l hya 2l fo2eha wa  kda 2y json byerga3 ll  variable = variable.create , varaible.find , etc..
}

// Get a single Workout

const getWorkout = async(req , res) => {
  const { id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){ // If mongodb object's Id is not valid  
    return res.status(404).json({error : 'No such Workout'})
  }

  const workout = await Workout.findById(id)

  // If you cannot find workout (workout is null ) return error message saying No such workout
  if (!workout) {
    return res.status(404).json({error : 'No such workout'}) //lazm return 34an lw m3malt4 kda hykammal 2l ba2y 2l ba3d if 
  }
  res.status(200).json(workout)
}

// Create a new Workout

const createWorkout = async (req , res) => {
  const {title , load , reps} = req.body 

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }

  if(!load) {
    emptyFields.push('load')
  }

  if(!reps) {
    emptyFields.push('reps')
  }
  
  if(emptyFields.length > 0){
    return res.status(400).json({error : 'Please fill in all the fields' , emptyFields})
  }
   // add document to  the database
  try {
    const user_id = req.user_id
    const workout = await Workout.create({title , load , reps})
    res.status(200).json(workout)
  } catch(error){
    res.status(400).json({error : error.message})

  }
}

// Delete a workout

const deleteWorkout = async (req , res) => {
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error : 'No such workout'})
}
  const workout = await Workout.findOneAndDelete({_id : id})

  if(!workout) {
    return res.status(400).json({error : 'No such workout'})
  }

  res.status(200).json(workout)
}

// Update a Workout

const updateWorkout = async (req , res) => {

  const {id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error : 'No such workout'})

}
  const workout = await Workout.findByIdAndUpdate({_id : id} ,
  {
    ...req.body // ... spread object from  the body 
  })
  if(!workout){
    return res.status(400).json({error : 'No such workout'})

  }
  res.status(200).json(workout)
}

// To  export a file 

module.exports= {
  getWorkout,
  getWorkouts,
  createWorkout ,
  deleteWorkout,
  updateWorkout
  
}
