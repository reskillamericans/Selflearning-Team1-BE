const mongoose = require('mongoose')
const connectionString = 'mongodb://localhost:27017/tech4u'


 module.exports = () =>  { mongoose.connect(connectionString,
  {useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false}, (err) => {
     if(err)  {
         console.log(err)
     } else {
         console.log('database connection successful')
 
     }
    
   })
 }
