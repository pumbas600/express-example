export interface ValidationError {
    type: 'ValidationError';
    path: string;
    kind?: string;
    message: string;
}

export interface CastError {
    type: 'CastError';
    path: string;
    expected: string;
    message: string;
}

export type MiddlewareError = ValidationError | CastError;
