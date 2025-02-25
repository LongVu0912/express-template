import { apiResponse } from "./../types/ApiResponse";
import { get } from "lodash";
import { Response, NextFunction } from "express";
import { CustomRequest } from "../types/CustomDefinition";

const requireUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const user: any = get(req, "user");

    if (!user) {
      return res.status(403).json(
        apiResponse({
          statusCode: 403,
          message: "Auth token user not found",
        }),
      );
    }
    // const data = await userService.getUserById(user.id);
    // req.user = data?.toJSON();

    return next();
  } catch (err) {
    let msg = "Internal Server Error";
    if (err instanceof Error) {
      msg = err.message;
    } else if (err) {
      msg = err;
    }
    return res.status(403).json(
      apiResponse({
        statusCode: 403,
        message: msg,
      }),
    );
  }
};
export default requireUser;
