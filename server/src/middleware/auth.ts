import jwt from 'jsonwebtoken';
import User from '../models/User';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';

/**
 * make sure that the user is authorized by checking if an 
 * access token exists and if it does then set the req.user 
 * varibale to that
 */

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

/**
 * make sure that the user is an admin by checking the req.user
 * variable and making sure that the isAdmin value is true
 */

const ensureIsAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403);
        throw new Error('user is not admin - forbidden')
      }
    } else {
      res.status(403);
      throw new Error('Not logged in');
    }
  }
)

export { ensureAuthorized, ensureIsAdmin };
