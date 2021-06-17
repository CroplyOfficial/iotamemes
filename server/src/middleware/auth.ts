import jwt from 'jsonwebtoken';
import User from '../models/User';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';

const ensureAuthorized = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: any;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1];
        const JWT_SECRET: any = process.env.JWT_SECRET;

        console.log(JWT_SECRET);

        const decoded: any = jwt.verify(token, JWT_SECRET);

        req.user = await User.findById(decoded.id);

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
  }
);

export { ensureAuthorized };
