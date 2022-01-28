const express = require('express');
const userRouter = express.Router();
const { addUser, getUser, authenticateUser, removeUser, modifyUser, authenticatedUser } = require('../controllers/user');

userRouter.post('/', addUser);

userRouter.get('/:username', getUser);

userRouter.put('/', (req, res) => {
    res.send('Hello World PUT');
});

userRouter.put('/:username/updateprofile', authenticateUser, modifyUser);

userRouter.delete('/:username/deleteprofile', authenticateUser, removeUser);

userRouter.post('/:username/authenticate', authenticateUser, authenticatedUser)

module.exports = userRouter;