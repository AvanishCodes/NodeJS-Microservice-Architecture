const express = require('express');
const mongoose = require('mongoose');

const app = express();
const userInteractionRouter = require('./routes/index');

// .env configuration
require('dotenv').config();


// Mongoose connection
const users_ATLAS_URI = require('./config/db.config.js').users_mongo_uri;
const uri = users_ATLAS_URI;
mongoose.connect(uri, {
  //useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Mongoose database connection established successfully');
  // console.log(uri);				// This line exposes the ATLAS URI to terminal, to be used only during debugging
});

app.use(express.json());
app.use('/interaction', userInteractionRouter);
app.get('/test', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'User interaction service is live!',
  });
});


const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log('Server is running on port 3003');
});
