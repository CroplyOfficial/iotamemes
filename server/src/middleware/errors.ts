import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';

// passing backend error message to the frontend so that it can be displayed

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
  });
};

export { errorHandler };
