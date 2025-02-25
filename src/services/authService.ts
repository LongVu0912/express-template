import { ApiError } from "../types/ApiError";
import { sign } from "../utils/jwt";
import Account from "../database/models/Account";
import { compareSync, encryptSync } from "./../utils/encrypt";

const login = async (username: string, password: string) => {
  const user = await Account.findOne({
    where: {
      username: username,
    },
    attributes: {
      exclude: ["createdAt", "updatedAt", "deletedAt"],
    },
    raw: true,
  });

  if (!user) {
    throw new ApiError(400, "Wrong username or password");
  }

  if (!compareSync(password, user.password)) {
    throw new ApiError(400, "Wrong username or password");
  }

  delete user.password;

  return await sign(user);
};

const register = async (payload: any) => {
  const account = await Account.findOne({
    where: {
      username: payload.username,
    },
  });

  if (account) {
    throw new ApiError(400, "Username already exists");
  }

  const newAccount = new Account(payload);
  newAccount.password = await encryptSync(payload.password);
  await newAccount.save();

  // Convert to plain object and remove sensitive attributes
  const currentAccount = newAccount.toJSON();
  delete currentAccount.createdAt;
  delete currentAccount.updatedAt;
  delete currentAccount.deletedAt;
  delete currentAccount.password;

  return await sign(currentAccount);
};

const changePassword = async (id: string, payload: any) => {
  const user = await Account.findOne({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!compareSync(payload.oldPassword, user.password)) {
    throw new ApiError(400, "Wrong old password");
  }

  user.password = await encryptSync(payload.newPassword);
  await user.save();
};

export default { login, register, changePassword };
