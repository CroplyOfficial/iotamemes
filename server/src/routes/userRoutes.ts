import express from 'express';
import {
  authorizeDiscordUser,
  getUserById,
  getLikedMemes,
  getAllUsers,
  updateUserData,
  getMemesForUser,
  deleteMemeUser,
  replaceUserData,
  checkIsBanned
} from '../controllers/userControllers';

import {
  ensureAuthorized,
  ensureIsAdmin
} from '../middleware/auth';

const router = express.Router();

router.route('/')
  .get(getAllUsers)
  .put(ensureAuthorized, updateUserData)
  .delete(ensureAuthorized, replaceUserData);

router.route('/authorize').post(authorizeDiscordUser);

router.route('/:id')
  .get(getUserById)
  .delete(ensureAuthorized, ensureIsAdmin, deleteMemeUser)

router.route('/:id/memes').get(getMemesForUser)

router.route('/@me/liked').get(ensureAuthorized, getLikedMemes);

router.route('/@me/isBanned').get(ensureAuthorized, checkIsBanned);

export default router;
