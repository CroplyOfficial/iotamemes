import express from 'express';
import {
  authorizeDiscordUser,
  getUserById,
} from '../controllers/userControllers';

const router = express.Router();

router.route('/authorize').post(authorizeDiscordUser);

router.route('/:id').get(getUserById);

export default router;
