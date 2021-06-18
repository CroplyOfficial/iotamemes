import express from 'express';
import {
  authorizeDiscordUser,
  getUserById,
  getLikedMemes,
} from '../controllers/userControllers';

import { ensureAuthorized } from '../middleware/auth';

const router = express.Router();

router.route('/authorize').post(authorizeDiscordUser);

router.route('/:id').get(getUserById);

router.route('/@me/liked').get(ensureAuthorized, getLikedMemes);

export default router;
