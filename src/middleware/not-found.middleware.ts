import { Request, Response, NextFunction } from "express";

export const notFound = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const message = "Not Found";

    response.status(404).json(message);

}