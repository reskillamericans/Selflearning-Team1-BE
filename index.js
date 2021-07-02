const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT; 



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

app.listen(port, () => console.log(`app listening on port ${port}`));
