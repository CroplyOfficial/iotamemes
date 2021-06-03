import express from 'express';
import { ensureAuthorized } from '../middleware/auth.js';

import {
  authorizeUser,
  registerUser,
  updateUser,
  updateUserPassword,
} from '../controllers/userControllers.js';

const router = express.Router();

// login route
router.route('/login').post(authorizeUser);

// register route
router.route('/register').post(registerUser);

// update the user profile
router.route('/settings').put(ensureAuthorized, updateUser);

// update the user password
router.route('/updatePassword').put(ensureAuthorized, updateUserPassword);

export default router;
