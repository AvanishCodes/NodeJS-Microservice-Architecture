const Like = require('../models/like.model');
const Read = require('../models/read.model');
const UserEvent = require('../models/userEvent.model');
const Interaction = require('../models/interaction.model');

/**
 * 
 * @param {*} req Request: contains the details of the content to be uploaded in req.body
 * @param {*} res Response: contains the status of the request
 */
async function createLike(req, res) {
    try {
        // Get the properties from the request body
        const { userId, postId } = req.body;
        const interaction = await Interaction.findOne({ content: postId });
        if (!interaction) {
            const newInteraction = new Interaction({
                content: postId,
                likes: [userId]
            });
            await newInteraction.save();
            // If the interaction document exists, add the user to the list of users who liked the post
        }
        else {
            interaction.likes.push(userId);
            await interaction.save();
        }

        // Add the data to the user event collection
        // Get the userEvent document corresponding to the user
        const userEvent = await UserEvent.findOne({ user: userId });
        // If the userEvent document doesn't exist, create it
        if (!userEvent) {
            const newUserEvent = new UserEvent({
                user: userId,
                likes: [postId]
            });
            await newUserEvent.save();
            // If the userEvent document exists, add the post to the list of liked posts
        }
        else {
            userEvent.likes.push(postId);
            await userEvent.save();
        }
        // Return the status
        return res.status(200).json({
            status: 'success',
            message: 'Like created successfully'
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'error',
            message: 'Error when creating like, check the data again'
        });
    }
}

/**
 * 
 * @param {*} req Request: contains the details of the content to be uploaded in req.body
 * @param {*} res Response: contains the status of the request
 */
async function createRead(req, res) {
    // Get the properties from the request body
    const { userId, postId } = req.body;

    const interaction = await Interaction.findOne({ content: postId });
    if (!interaction) {
        const newInteraction = new Interaction({
            content: postId,
            reads: [userId]
        });
        await newInteraction.save();
        // If the interaction document exists, add the user to the list of users who liked the post
    }
    else {
        interaction.reads.push(userId);
        await interaction.save();
    }

    // Add the data to the user event collection
    // Get the userEvent document corresponding to the user
    const userEvent = await UserEvent.findOne({ user: userId });
    // If the userEvent document doesn't exist, create it
    if (!userEvent) {
        const newUserEvent = new UserEvent({
            user: userId,
            reads: [postId]
        });
        await newUserEvent.save();
        // If the userEvent document exists, add the post to the list of read posts
    }
    else {
        userEvent.reads.push(postId);
        await userEvent.save();
    }
    // Return the status
    res.status(200).json({
        status: 'success',
        message: 'read created successfully'
    });
}

/**
 * 
 * @param {*} req Request: contains the details of the content to be uploaded in req.body
 * @param {*} res Response: contains the list of most liked content
 */
async function most_liked_content(req, res) {
    try {
        // Find the content with the highest number of likes
        const topContent = await Interaction.find({ sort: { 'likes.length': -1, 'reads.length': -1 } });
        // Return the content
        res.status(200).send(topContent);
    } catch (error) {
        res.status(500).send(error);
    }
}

/**
 * 
 * @param {*} req Request: contains the details of the content to be uploaded in req.body
 * @param {*} res Response: contains the list of most read content
 */
async function most_read_content(req, res) {
    try {
        // Find the content with the highest number of likes
        const topContent = await Interaction.find({ sort: { '$reads.length': -1 } });
        // Return the content
        res.status(200).send(topContent);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createLike,
    createRead,
    most_liked_content,
    most_read_content
}