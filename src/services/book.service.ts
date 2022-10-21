import { Book } from "../entities/book.entity";
import Repository from "../repositories/repositories";

class BookService {
  createBook = async (data: Book) => {
    try {
      const book = new Book();
      book.name = data.name;
      const savedBook = await Repository.bookRepository.save(book);
      return savedBook;
    } catch (error) {
      throw error;
    }
  };

  getAllBooks = async () => {
    try {
      const books = await Repository.bookRepository.find({
        select: {
          id: true,
          name: true,
        },
      });
      return books;
    } catch (error) {
      throw error;
    }
  };

  getBookById = async (id: number) => {
    try {
      const book = await Repository.bookRepository.findOneBy({ id: id });
      if (book == null) {
        throw Error("There is no book with this id.");
      } else {
        return book;
      }
    } catch (error) {
      throw error;
    }
  };
}

export default BookService;
