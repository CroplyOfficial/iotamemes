import express, { Request, Response } from 'express';
import path from 'path';
import multer from 'multer';

import { ensureAuthorized } from '../middleware/auth';
import { newMeme, getMemes } from '../controllers/memeControllers';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename(req, file, cb) {
    cb(
      null,
      `${Date.now()}${file.originalname.split('.')[0]}${path.extname(
        file.originalname
      )}`
    );
  },
});

function ensureIsSupported(file: any, cb: any) {
  const fileTypes = /jpg|jpeg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  if (extname) {
    return cb(null, true);
  } else {
    cb('not supported');
  }
}

const upload: any = multer({
  storage,
  fileFilter: function (req, file, cb) {
    ensureIsSupported(file, cb);
  },
});

router
  .route('/')
  .post(upload.single('image'), ensureAuthorized, newMeme)
  .get(getMemes);

export default router;
