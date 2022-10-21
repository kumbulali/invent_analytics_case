import { Request, Response } from "express";
import BorrowService from "../services/borrow.service";

const borrowService = new BorrowService();

class BorrowController {
  borrowBook = async (req: Request, res: Response) => {
    try {
      const items = await borrowService.borrowBook(
        parseInt(req.params.userId),
        parseInt(req.params.bookId)
      );
      return res.status(200).json(items);
    } catch (error) {
      return res
        .status(400)
        .json({ message: `An error occured. ${(error as Error).message}` });
    }
  };

  returnBook = async (req: Request, res: Response) => {
    try {
      const items = await borrowService.returnBook(
        parseInt(req.params.userId),
        parseInt(req.params.bookId),
        parseInt(req.body.score)
      );
      return res.status(200).json(items);
    } catch (error) {
      return res
        .status(400)
        .json({ message: `An error occured. ${(error as Error).message}` });
    }
  };
}

export default BorrowController;
