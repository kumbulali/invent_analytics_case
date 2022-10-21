import { UserInfo } from "os";
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
      const user = await Repository.userRepository.findOne({
        relations: { books: true },
        where: { id: id },
      });
      if (user == null) {
        throw Error("There is no user with this id.");
      } else {
        return user;
      }
    } catch (error) {
      throw error;
    }
  };
}

export default UserService;
