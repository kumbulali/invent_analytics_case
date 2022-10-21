import { NextFunction, Request, Response } from "express";
import BorrowService from "../services/borrow.service";
import UserService from "../services/user.service";

const userService = new UserService();

class UserController {
  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res
        .status(400)
        .json({ message: `An error occured. ${(error as Error).message}` });
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userService.getUserById(parseInt(req.params.id));
      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(400)
        .json({ message: `An error occured. ${(error as Error).message}` });
    }
  };

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userService.createUser(req.body);
      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(400)
        .json({ message: `An error occured. ${(error as Error).message}` });
    }
  };
}

export default UserController;
