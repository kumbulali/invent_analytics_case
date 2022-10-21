import { IsNull } from "typeorm";
import { BookToUser } from "../entities/book-to-user.entity";
import Repository from "../repositories/repositories";
import BookService from "./book.service";

const bookService = new BookService();
class BorrowService {
  borrowBook = async (userId: number, bookId: number) => {
    try {
      /** Add new record to borrow list */
      const bookToUser = new BookToUser();
      const user = await Repository.userRepository.findOneBy({ id: userId });
      if (user == null) {
        throw Error("There is no user with this user id.");
      }
      const book = await Repository.bookRepository.findOneBy({
        id: bookId,
      });
      if (book == null) {
        throw Error("There is no book with this book id.");
      }
      /** Checking the availability of requested book. */
      const itemsToCheck = await Repository.bookToUserRepository.find({
        relations: { user: true },
        where: {
          book: { id: bookId },
        },
      });
      itemsToCheck.forEach((book) => {
        console.log(book);
        if (book.userScore == null) {
          if (book.user.id == userId) {
            throw Error("You already borrowed this book.");
          }
          throw Error("This book is not available.");
        }
      });
      bookToUser.book = book;
      bookToUser.user = user;
      return await bookToUser.save();
    } catch (error) {
      throw error;
    }
  };

  returnBook = async (userId: number, bookId: number, score: number) => {
    try {
      /** Setting the userScore of borrowed book */
      const user = await Repository.userRepository.findOneBy({ id: userId });
      if (user == null) {
        throw Error("There is no user with this user id.");
      }
      const book = await Repository.bookRepository.findOneBy({ id: bookId });
      if (book == null) {
        throw Error("There is no book with this book id.");
      }
      const bookToUser = await Repository.bookToUserRepository.findOne({
        where: {
          userScore: IsNull(),
          user: { id: userId },
          book: { id: bookId },
        },
      });
      if (bookToUser == null) {
        throw Error("There is no borrow record with this combination.");
      }
      bookToUser.userScore = score;
      /** Updating the average book score */
      await bookService.updateAverage(score, bookId);
      return await bookToUser.save();
    } catch (error) {
      throw error;
    }
  };
}

export default BorrowService;
