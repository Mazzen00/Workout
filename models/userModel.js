const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema

const crypto = require('crypto');
const secretKey = crypto.randomBytes(64).toString('hex');
console.log(secretKey)
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// static signup  method 

userSchema.statics.signup = async  function (email , password)  {
  
  // validation 

  if(!email || !password){
    throw Error('All fields must be filled')
  }

  if(!validator.isEmail(email)){
    throw Error('Email is not valid')
  }

  // if(!validator.isStrongPassword(password)){
  //   throw Error('Password is not STRONG enough')
  // }




  const exists = await this.findOne({email})
  
  if(exists) {
    throw Error('Email already in use')
  }

  // Salt is random string of passwords added to your password before hashing it
  // genSalt(10) is generate Salt of 10 string & numbers to the user Password
  const salt = await bcrypt.genSalt(10)

  const hash = await bcrypt.hash(password , salt)
  // this is to refer to the Model
  const user = await this.create({email , password : hash})

  return user
}

// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)
