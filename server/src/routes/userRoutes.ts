import express from 'express';
import {
  authorizeDiscordUser,
  getUserById,
  getLikedMemes,
  getAllUsers,
  updateUserData,
  getMemesForUser,
  deleteMemeUser
} from '../controllers/userControllers';

import {
  ensureAuthorized,
  ensureIsAdmin
} from '../middleware/auth';

const router = express.Router();

router.route('/').get(getAllUsers).put(ensureAuthorized, updateUserData);

router.route('/authorize').post(authorizeDiscordUser);

router.route('/:id')
  .get(getUserById)
  .delete(ensureAuthorized, ensureIsAdmin, deleteMemeUser)

router.route('/:id/memes').get(getMemesForUser)

router.route('/@me/liked').get(ensureAuthorized, getLikedMemes);

export default router;
