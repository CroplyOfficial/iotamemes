import express from 'express';
import { ensureAuthorized } from '../middleware/auth';
import { createFlag, removeFlag, removeMeme } from '../controllers/flagControllers';

const router = express.Router();

router.route('/')
  .post(ensureAuthorized, createFlag)
  .delete(ensureAuthorized, removeFlag)

router.route('/meme')
  .delete(ensureAuthorized, removeMeme)

export default router;
