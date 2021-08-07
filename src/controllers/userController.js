const User = require("../models/user")



//Fetch User
function fetchUsers(req, res){
    User.find({}, (err, users) => {
      if(err) {
          return res.status(500).json({ message: err})
      }else {
          return res.status(200).json({ users })
      }
  })
}
  
  


//Fetch Single User
 function fetchUserById(req, res){
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


function fetchUsersProfile(req, res){
    let  { id } = req.user
    User.findById(id, '-password -__v', (err, user) => {
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

module.exports = { fetchUsers, fetchUserById, fetchUsersProfile }

