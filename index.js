const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const connectionString = 'mongodb://localhost:27017/tech4u'


    mongoose.connect(connectionString,
  {useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false}, (err) => {
     if(err)  {
         console.log(err)
     } else {
         console.log('database connection successful')
 
     }
   })




app.use(express.json())

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})

