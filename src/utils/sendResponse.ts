import { Response } from "express";

interface TMeta {
    page: number;
    limit: number;
    total: number;
}

interface ISendResponse<T> {
    success: boolean;
    statusCode: number;
    message: string | null;
    data?: T;
    error?: any;
    meta?: TMeta
}

export const sendResponse = <T>(res: Response, data: ISendResponse<T>) => {
    res.status(data.statusCode).json({
        success: data.success,
        statusCode: data.statusCode,
        message: data.message,
        data: data.data,
        error: data.error,
        meta: data.meta
    })
}