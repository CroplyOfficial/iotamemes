import express from 'express';
import { createNewUser } from '../controllers/userControllers';

const router = express.Router();

router.route('/authenticate').post(createNewUser);

export default router;
