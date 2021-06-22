import express from 'express';
import {
  authorizeDiscordUser,
  getUserById,
  getLikedMemes,
  getAllUsers,
  updateUserData,
  getMemesForUser
} from '../controllers/userControllers';

import { ensureAuthorized } from '../middleware/auth';

const router = express.Router();

router.route('/').get(getAllUsers).put(ensureAuthorized, updateUserData);

router.route('/authorize').post(authorizeDiscordUser);

router.route('/:id').get(getUserById);

router.route('/:id/memes').get(getMemesForUser)

router.route('/@me/liked').get(ensureAuthorized, getLikedMemes);


export default router;
