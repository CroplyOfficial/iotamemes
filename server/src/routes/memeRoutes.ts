import express, { Request, Response } from 'express';
import path from 'path';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename(req, file, cb) {
    cb(
      null,
      `${Date.now()}${file.originalname}${path.extname(file.originalname)}`
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

router.post('/', upload.single('image'), (req: Request, res: Response) => {
  res.send(`/${req.file.path}`);
});

export default router;
