const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', false);

mongoose.connect(
    process.env.DATABASE_URI,
    { 
      useNewUrlParser: true, 
      useUnifiedTopology: true
    }
  )
  .then(() => console.log('Connected to DB'))
  .catch(console.error);


