const express = require('express');
const userInteractionRouter = express.Router();
const { createLike, createRead, most_liked_content, most_read_content } = require('../controllers/index');


userInteractionRouter.get('/', (req, res) => {
    res.send('Hello World GET');
});

userInteractionRouter.put('/read', createRead);

userInteractionRouter.put('/like', createLike);

userInteractionRouter.get('/topcontent/likes', most_liked_content);

userInteractionRouter.get('/topcontent/reads', most_read_content); 


module.exports = userInteractionRouter;