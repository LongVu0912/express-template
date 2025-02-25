import { get } from "lodash";
import { verify } from "../utils/jwt";
import { Response, NextFunction } from "express";
import { CustomRequest } from "../types/CustomDefinition";
import { apiResponse } from "../types/ApiResponse";

const deserializeUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const bearerToken = get(req, "headers.authorization");
  let token = bearerToken;
  if (bearerToken && bearerToken.startsWith("Bearer ")) {
    token = bearerToken.substring(7);
  }
  if (!token) return next();

  const { decoded, expired, valid, msg: errorMsg } = verify(token);

  if (valid && !expired) {
    if (typeof decoded !== "string") {
      req.user = decoded.payload;
    }
    return next();
  } else {
    return res.status(403).json(
      apiResponse({
        statusCode: 403,
        message: errorMsg,
      }),
    );
  }
};

export default deserializeUser;
