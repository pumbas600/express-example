import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import {
    CastError,
    MiddlewareError,
    ValidationError,
} from '../types/MiddlewareErrors';
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
            errors: getErrors(error),
        });
        return;
    }

    const statusCode = res.statusCode ?? Status.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({ message: error.message });
}

function getErrors(error: mongoose.Error.ValidationError): MiddlewareError[] {
    return Object.values(error.errors).map((err) => {
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
    });
}

export default errorHandler;
