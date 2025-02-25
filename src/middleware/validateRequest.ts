import { Schema } from "joi";
import { Request, Response, NextFunction } from "express";
import { apiResponse } from "ApiResponse";

const validateRequest = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const messages = details.map((i) => i.message).join(",");

      console.log("error", messages);
      res.status(400).json(
        apiResponse({
          statusCode: 400,
          message: messages,
        }),
      );
    }
  };
};
export default validateRequest;
