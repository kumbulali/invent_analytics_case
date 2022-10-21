import { Router } from "express";
import BookController from "../controllers/book.controller";
import { Schemas, ValidateBody } from "../middleware/validator";

const bookRoutes = Router();
const bookController = new BookController();

/** Getting book list */
bookRoutes.get("/", bookController.getAllBooks);
/** Getting a book with its average user score (It's -1 if it's not scored yet.) */
bookRoutes.get("/:id", bookController.getBookById);
/** Creating a book */
bookRoutes.post(
  "/",
  ValidateBody(Schemas.createBookSchema),
  bookController.createBook
);

export default bookRoutes;
