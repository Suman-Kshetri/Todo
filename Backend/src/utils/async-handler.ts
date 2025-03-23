import { NextFunction, Request, Response } from "express";

// Define the correct type for the request handler function
type AsyncHandlerType = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const asyncHandler = (requestHandler: AsyncHandlerType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => {
            next(err);
        });
    };
};

export default asyncHandler;
