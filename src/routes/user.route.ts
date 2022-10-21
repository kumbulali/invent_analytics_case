import { Router } from "express";
import BorrowController from "../controllers/borrow.controller";
import UserController from "../controllers/user.controller";
import { Schemas, ValidateBody, ValidateParams } from "../middleware/validator";

const userRoutes = Router();
const userController = new UserController();
const borrowController = new BorrowController();

/** Getting user list with ids and names */
userRoutes.get("/", userController.getAllUsers);
/** Getting a user with his pas and current book borrow list */
userRoutes.get(
  "/:id",
  ValidateParams(Schemas.urlParamsSchema),
  userController.getUserById
);
/** Creating a user */
userRoutes.post(
  "/",
  ValidateBody(Schemas.createUserSchema),
  userController.createUser
);

/** User borrow a book */
userRoutes.post(
  "/:userId/borrow/:bookId",
  ValidateParams(Schemas.urlParamsForBorrowSchema),
  borrowController.borrowBook
);
/** User return a borrowed book and score it */
userRoutes.post(
  "/:userId/return/:bookId",
  ValidateParams(Schemas.urlParamsForBorrowSchema),
  ValidateBody(Schemas.returnBookSchema),
  borrowController.returnBook
);

export default userRoutes;
