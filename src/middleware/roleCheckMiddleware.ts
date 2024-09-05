// roleCheckMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

const JWT_SECRET = config.jwtSecret;

const roleCheckMiddleware = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (decoded.role !== requiredRole) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
    next();
  };
};

export default roleCheckMiddleware;
