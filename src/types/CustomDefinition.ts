import { Request } from "express";

export interface CustomRequest extends Request {
  user: any;
}

export interface CustomError extends Error {
  statusCode: number;
  data: any;
}
