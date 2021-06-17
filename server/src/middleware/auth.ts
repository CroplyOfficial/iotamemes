import jwt from 'jsonwebtoken';
import User from '../models/User';
import asyncHandler from 'express-async-handler';

const ensureAuthorized = asyncHandler(async (req, res, next) => {
  let token: any;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const JWT_SECRET: any = process.env.JWT_SECRET;

      const decoded: any = jwt.verify(token, JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not logged in / missing token');
  }
});

export { ensureAuthorized };
