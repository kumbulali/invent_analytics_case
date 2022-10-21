import { User } from "../entities/user.entity";
import Repository from "../repositories/repositories";

class UserService {
  createUser = async (data: User) => {
    try {
      const user = new User();
      user.name = data.name;
      const savedUser = await Repository.userRepository.save(user);
      return savedUser;
    } catch (error) {
      throw error;
    }
  };

  getAllUsers = async () => {
    try {
      const users = await Repository.userRepository.find();
      return users;
    } catch (error) {
      throw error;
    }
  };

  getUserById = async (id: number) => {
    try {
      var preBorrowedBooks: { name: string; userScore: number }[] = [];
      var borrowedBooks: { name: string }[] = [];
      const user = await Repository.userRepository.findOne({
        where: { id: id },
      });
      const bookToUsers = await Repository.bookToUserRepository.find({
        relations: { book: true },
        where: {
          user: { id: id },
        },
      });
      bookToUsers.forEach((bookToUser) => {
        if (bookToUser.userScore == null) {
          borrowedBooks.push({
            name: bookToUser.book.name,
          });
        }
        preBorrowedBooks.push({
          name: bookToUser.book.name,
          userScore: bookToUser.userScore,
        });
      });
      if (user == null) {
        throw Error("There is no user with this id.");
      } else {
        return {
          id: user.id,
          name: user.name,
          books: {
            past: preBorrowedBooks,
            present: borrowedBooks,
          },
        };
      }
    } catch (error) {
      throw error;
    }
  };
}

export default UserService;
