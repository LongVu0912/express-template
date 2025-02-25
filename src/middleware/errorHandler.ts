import { CustomError } from "../types/CustomDefinition";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../types/ApiError";

/**
 * Error Handler Middleware
 * @param error
 * @param req
 * @param res
 * @param next
 */
export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): void => {
  let err = error;

  if (!(error instanceof ApiError)) {
    const statusCode = 500;
    const message = error.message || "Internal server error";
    err = new ApiError(statusCode, message);
  }

  const { statusCode, message, data } = err;

  res.locals.errorMessage = err.message;

  const response = {
    statusCode: statusCode,
    message: message,
    data: data,
  };

  res.status(statusCode).send(response);
};
