bcrypt = require('bcrypt');
jwt = require('jsonwebtoken');
jwtSecret = process.env.JWT_SECRET;

const user = require('../models/user.model');

const { UserDoesNotExistError, InvalidCredentialsError } = require('../errors/index');

// Create a new user
/**
 * 
 * @param {*} req Request: containing username, password, firstname, lastname, email_id, isd_code, phone_number in the body, as application/json
 * @param {*} res Response: containing the user object in the body, as application/json
 * @returns Returns a status code of 201 if the user is created successfully, else returns a status code of 400
 */
async function addUser(req, res) {
  const { username, password, firstname, lastname, email_id, isd_code, phone_number } = req.body;
  // Check if this user already exists
  const userExists = await user.findOne({ username: username });
  if (userExists) {
    return res.status(400).json(UserAlreadyExistsError);
  }
  // Create a new user
  const newUser = new user({
    username: username,
    password: password,
    firstname: firstname,
    lastname: lastname,
    email_id: email_id,
    isd_code: isd_code,
    phone_number: phone_number
  });
  // Save the user
  await newUser.save();
  return res.status(201).json({
    status: 'success',
    data: {
      user: newUser
    }
  });
}

// Get if a user exists
/**
 * 
 * @param {*} req Request: containing username in the body, as application/json
 * @param {*} res Response: containing the user object in the body, as application/json
 * @returns status code of 200 if the user exists, else returns a status code of 404
 */
async function getUser(req, res) {
  const { username } = req.params;
  const userExists = await user.findOne({ username: username }).select('-_id -phone_number -password -__v');
  if (!userExists) {
    return res.status(404).json(UserDoesNotExistError);
  }
  return res.status(200).json({
    status: 'success',
    data: {
      user: userExists
    }
  });
}

/**
 * 
 * @param {*} req Request: containing username, password in the body, as application/json
 * @param {*} res Response: containing the user object in the body, as application/json
 * @param {*} next Next function to be executed
 * @returns executes the next function if the user is authenticated, returns a status code of 401 if the user is not authenticated, and returns a status code of 404 if the user does not exist
 */
async function authenticateUser(req, res, next) {
  const { username, password } = req.body;
  const userExists = await user.findOne({ username: username });
  if (!userExists) {
    return res.status(404).json(UserDoesNotExistError);
  }
  const isMatch = await bcrypt.compare(password, userExists.password);
  if (!isMatch) {
    return res.status(401).json(InvalidCredentialsError);
  }
  /*
  const token = jwt.sign({
    username: userExists.username,
    userId: userExists._id
  }, jwtSecret, {
    expiresIn: '1h'
  });
  */
  req.user = userExists;
  next();
  /*
  return res.status(200).json({
    status: 'success',
    data: {
      token: token,
      user: userExists
    }
  });
  */
}

/**
 * 
 * @param {*} req Request: containing username in the body, as application/json
 * @param {*} res Response: containing the user object in the body, as application/json
 * @returns status code of 200 if the user is deleted, status code of 404 if the user does not exist, and status code of 401 if the user is not authenticated
 */
async function removeUser(req, res) {
  const { username, password } = req.body;

  const userExists = await user.findOne({ username: username });
  if (!userExists) {
    return res.status(404).json(UserDoesNotExistError);
  }
  const isMatch = await bcrypt.compare(password, userExists.password);
  if (!isMatch) {
    return res.status(401).json(InvalidCredentialsError);
  }
  await user.deleteOne({ username: username });
  return res.status(200).json({
    status: 'success',
    data: {
      message: 'User deleted successfully'
    }
  });
}

/**
 * 
 * @param {*} req Request: containing username, password in the body, as application/json
 * @param {*} res Response: containing the user object in the body, as application/json
 * @returns status code of 200 if the user is updated, status code of 404 if the user does not exist, and status code of 401 if the user is not authenticated
 */
async function modifyUser(req, res) {
  const { username, password, firstname, lastname, email_id, isd_code, phone_number } = req.body;
  const userExists = await user.findOne({ username: username });
  if (!userExists) {
    return res.status(404).json(UserDoesNotExistError);
  }
  const isMatch = await bcrypt.compare(password, userExists.password);
  if (!isMatch) {
    return res.status(401).json(InvalidCredentialsError);
  }
  await user.updateOne({ username: username }, {
    $set: {
      firstname: firstname,
      lastname: lastname,
      email_id: email_id,
      isd_code: isd_code,
      phone_number: phone_number
    }
  });
  return res.status(200).json({
    status: 'success',
    data: {
      message: 'User updated successfully',
      user: userExists
    }
  });
}

/**
 * 
 * @param {*} req Request: containing username, password in the body, as application/json
 * @param {*} res Response: containing the user object in the body, as application/json
 * @returns status code of 200 is the user is authenticated, to be called by the middleware only if the user is authenticated
 */
async function authenticatedUser(req, res) {
  return res.status(200).json({
    status: 'success',
    message: "You're authenticated",
  });
}

module.exports = { addUser, getUser, authenticateUser, removeUser, modifyUser, authenticatedUser };