import express from 'express';
import { authorizeDiscordUser } from '../controllers/userControllers';

const router = express.Router();

router.route('/authorize').post(authorizeDiscordUser);

export default router;
