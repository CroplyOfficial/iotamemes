import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import { tokenize } from '../functions/jwt.js';

/*
 * @desc    Authorize user and issue token
 * @route   /api/users/login
 * @access  public
 */

const authorizeUser = asyncHandler(async (req, res) => {
  // destruction request body and get email and password
  const { email, password } = req.body;

  // get the user from the DB
  const user = await User.findOne({ email });

  // validate the password and issue token
  if (user && (await user.matchPassword(password))) {
    const token = tokenize(user._id);
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    });
  } else {
    // set status to 401: Unautorized and throw error
    res.status(401);
    throw new Error('Incorrect credentials');
  }
});

/*
 * @desc    Register user and send token
 * @route   /api/users/register
 * @access  public
 */

const registerUser = asyncHandler(async (req, res) => {
  // destructure the data from request body
  const { name, email, password } = req.body;

  console.log('asdf');

  // check if the user with the email already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    // set status to 400 (bad request) and throw error
    res.status(400);
    throw new Error('User already exists');
  } else {
    const user = await User.create({
      name,
      email,
      password,
    });
    if (user) {
      // set status to 201 and send the token
      res.status(201);
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        token: tokenize(user._id),
      });
    } else {
      // set status to 400 (Bad Request) and throw error
      res.status(400);
      throw new Error('Invalid user data');
    }
  }
});

/*
 * @desc    Find and update user according to new data
 * @route   /api/users/update
 * @access  authorized only
 */

const updateUser = asyncHandler(async (req, res) => {
  // find user from mongo
  const user = await User.findById(req.user._id);

  if (user) {
    // set data either from body or to the pre-existing data
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // save the user with new data
    const updatedUser = await user.save();

    // send data to user
    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: tokenize(updatedUser._id),
    });
  } else {
    // raise 404 and throw error
    res.status(404);
    throw new Error('User not found');
  }
});

/*
 * @desc    Find and update user's password
 * @route   /api/users/updatePassword
 * @access  authorized only
 */

const updateUserPassword = asyncHandler(async (req, res) => {
  // find user from mongo
  const user = await User.findById(req.user._id);

  if (user) {
    user.password = req.body.password;

    // save the user with new data
    const updatedUser = await user.save();

    // send data to user
    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: tokenize(updatedUser._id),
    });
  } else {
    // raise 404 and throw error
    res.status(404);
    throw new Error('User not found');
  }
});

export { authorizeUser, registerUser, updateUser, updateUserPassword };
