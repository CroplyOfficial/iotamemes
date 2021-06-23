import express from 'express';
import { 
  ensureIsAdmin,
  ensureAuthorized 
} from '../middleware/auth';
import { 
  createFlag, 
  removeFlag, 
  removeMeme,
  getAllFlags
} from '../controllers/flagControllers';

const router = express.Router();

router.route('/')
  .get(ensureAuthorized, ensureIsAdmin, getAllFlags)
  .post(ensureAuthorized, createFlag)
  .delete(ensureAuthorized, ensureIsAdmin, removeFlag)

router.route('/meme')
  .delete(ensureAuthorized, ensureIsAdmin, removeMeme)

export default router;
