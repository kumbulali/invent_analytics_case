import dataSource from "../config/data-source";
import { BookToUser } from "../entities/book-to-user.entity";
import { Book } from "../entities/book.entity";
import { User } from "../entities/user.entity";

class Repository {
  static userRepository = dataSource.getRepository(User);
  static bookRepository = dataSource.getRepository(Book);
  static bookToUserRepository = dataSource.getRepository(BookToUser);
}

export default Repository;
