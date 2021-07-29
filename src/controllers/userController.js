const User = require("../models/user")
const Course = require("../models/courses.model");



//Fetch User
function fetchUser(req, res) {
    User.find({}, (err, users) => {
      if(err) {
          return res.status(500).json({ message: err})
      }else {
          return res.status(200).json({ users })
      }
  })
  }
 
  

//Fetch User by Course
function userByCourse(req, res){
  
}

//Fetch Single User
function userbyId(req, res){
  let id = req.params.id
  User.findById(id, (err, user) => {
    if(err) {
      return res.status(500).json({ message: err})
  }
  else if(!user){
      return res.status(404).json({ message: "user not found"})
  }
  else {
      return res.status(200).json({ user })
  }

  })
}
