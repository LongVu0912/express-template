import { jwtConfig } from "../config/config";

import jwt from "jsonwebtoken";

export const sign = (payload: any, options = { expiresIn: jwtConfig.expiry }) => {
  const token = jwt.sign(
    {
      payload,
      exp: Math.floor(Date.now() / 1000) + parseInt(options.expiresIn),
    },
    jwtConfig.secret,
  );
  return token;
};

export const verify = (token: string) => {
  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    return { valid: true, expired: false, decoded };
  } catch (error) {
    let msg;
    if (error instanceof Error) {
      msg = error.message;
    } else {
      msg = error;
    }
    return {
      valid: false,
      expired: msg === "jwt expired",
      msg: msg,
      decoded: null as null,
    };
  }
};
