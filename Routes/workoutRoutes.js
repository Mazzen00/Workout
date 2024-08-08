const express = require('express')
const { createWorkout  , getWorkout , getWorkouts , deleteWorkout , updateWorkout } = require('../controllers/controllers') // He did it by himself Amazing !!!

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()


// Get all workouts 
router.get('/' , getWorkouts )


//Get a single workout

router.get('/:id' , getWorkout)


// POST a new workout 

router.post('/' , createWorkout ) // createWorkout is in the controllers 


// Delete a workout

router.delete('/:id' , deleteWorkout)
  



// Update a workout

router.patch('/:id' , updateWorkout)

module.exports = router
