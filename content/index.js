require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const helmet = require('helmet')
const compression = require('compression')
const csvRouter = require('./routes/index')

const PORT = process.env.PORT || 3001




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

/* Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately. */
app.use(helmet())
/* compression for better performance */
app.use(compression())
// For JSON response
app.use(express.json());

app.get('/test', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Content service is live!',
    });
})


app.use('/api', csvRouter)

app.listen(PORT, () => {
    console.log("Listening to PORT " + PORT);
})