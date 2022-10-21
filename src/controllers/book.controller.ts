import { NextFunction, Request, Response } from "express";
import BookService from "../services/book.service";

const bookService = new BookService();

class BookController {
  getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const books = await bookService.getAllBooks();
      return res.status(200).json(books);
    } catch (error) {
      return res
        .status(400)
        .json({ message: `An error occured. ${(error as Error).message}` });
    }
  };

  getBookById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const book = await bookService.getBookById(parseInt(req.params.id));
      return res.status(200).json(book);
    } catch (error) {
      return res
        .status(400)
        .json({ message: `An error occured. ${(error as Error).message}` });
    }
  };

  createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await bookService.createBook(req.body);
      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(400)
        .json({ message: `An error occured. ${(error as Error).message}` });
    }
  };
}

export default BookController;
