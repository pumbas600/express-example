import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Status from '../types/Status';

function errorHandler(
    error: Error | mongoose.Error.ValidationError,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    if (error instanceof mongoose.Error.ValidationError) {
        res.status(Status.BAD_REQUEST).json({
            message: error.message,
            errors: Object.values(error.errors).map((err) => {
                if (err instanceof mongoose.Error.ValidatorError)
                    return {
                        type: 'ValidationError',
                        path: err.path,
                        kind: err.properties.type,
                        message: err.message,
                    };
                return {
                    type: 'CastError',
                    path: err.path,
                    expected: err.kind,
                    message: err.message,
                };
            }),
        });
        return;
    }

    const statusCode = res.statusCode ?? Status.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({ message: error.message });
}

export default errorHandler;
