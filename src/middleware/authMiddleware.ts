import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../config';

const JWT_SECRET = config.jwtSecret;

export const authorize = (req: Request, res: Response, next: NextFunction) => {
    // Skip authorization for login route
    if (req.path === '/api/auth/login') {
        return next();
    }

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
