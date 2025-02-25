import { Request, Response, NextFunction } from "express";
import { authService } from "../services";
import { apiResponse } from "../types/ApiResponse";
import { CustomRequest } from "CustomDefinition";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    const data = await authService.login(username, password);

    res.status(200).json(
      apiResponse({
        message: "Login successful",
        data: data,
      }),
    );
  } catch (error) {
    next(error);
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = req.body;

    const token = await authService.register(newUser);

    res.status(200).json(
      apiResponse({
        message: "Registration successful",
        data: token,
      }),
    );
  } catch (err) {
    next(err);
  }
};

const changePassword = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.user;
    const payload = req.body;

    await authService.changePassword(id, payload);

    res.status(200).json(
      apiResponse({
        message: "Password changed successfully",
      }),
    );
  } catch (err) {
    next(err);
  }
};

export default { login, register, changePassword };
