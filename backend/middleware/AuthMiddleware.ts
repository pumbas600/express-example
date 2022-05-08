import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import Status from '../types/Status';

const auth = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        // Token will be in the form: "Bearer THE_TOKEN_HERE"
        if (req.headers.authorization?.startsWith('Bearer')) {
            try {
                const token = req.headers.authorization.split(' ')[1];
                // Decode the Google token
                const decoded = jwt.decode(token);

                const userId = decoded?.sub;

                next();
            } catch (error) {
                console.log(error);
                res.status(Status.UNAUTHORIZED).json({
                    error: 'There was an error while decoding the authorization token',
                });
            }
        } else {
            res.status(Status.UNAUTHORIZED).json({
                error: 'Not authorized, no Bearer token provided',
            });
        }
    },
);

export default auth;
