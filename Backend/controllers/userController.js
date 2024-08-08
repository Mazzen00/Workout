const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
// Jwt :Protect Resources and if the user didn't have in return jwt then he will go back the login Page 
// jwt is for Authentication if the user didn't have it back he will be UnAuthorized
const createToken = (user_id) => {
  return jwt.sign({userid :user_id}, process.env.SECRET , {expiresIn : '3d'} , 
  
  )
}





// login a user
const loginUser = async (req, res) => {

  const {email  , password} = req.body
  
  // check if user exists
  try {
    const user = await User.login(email , password)
    
    // create a token 
    
    const token = createToken(user._id)
   res.status(200).json({email , token})
  }
  
  catch(error){
   return res.status(400).json({error : error.message})
  }
  // res.json({mssg: 'login user'})
}

// signup a user
const signupUser = async (req, res) => {

  const {email  , password} = req.body

  // check if user exists
  try {
    const user = await User.signup(email , password)
    
    // create a token 
    
    const token = createToken(user._id)
   res.status(200).json({email , token})
  }
  
  catch(error){
   res.status(400).json({error : error.message})
  }
}
  //  res.status(200).json({mssg : email  , password})}
module.exports = { signupUser, loginUser }
