// () => those is a fast way to make a function in js

require('dotenv').config()  // File named env 
 //deh 2l hyya  process.env


const mongoose = require('mongoose')
const express = require('express')
const workoutRoutes = require('./Routes/workoutRoutes')
const userRoutes = require('./Routes/userRoutes')
// express app
const app = express()


// MIDDLEWARE
  // Middleware is to Request 
  // It's like a guardian to protect your routes
  // It's a function that runs before the route handler
  // It can stop the request from moving on to the route handler
  // It can modify the response object

  // next to go to the routes and then to next argument
app.use(express.json())

app.use((req , res , next) => {
  console.log(req.path , req.method)
  next()
})

// ROUTES 

// Routes is Url and Api

// Routes is to Respond 
app.use('/api/workouts' ,workoutRoutes)
app.use('/api/user' , userRoutes)



// Connect To MongoDb
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port' ,process.env.PORT )
    })
  })
  // .then() you made nested function one to listen for Requests and the other for the json which is console.log you did 
  
  //.catch() is for errors
  .catch((error) =>{
    console.log(error)
  })







