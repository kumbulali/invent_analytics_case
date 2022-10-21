import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Book } from "./book.entity";
import { User } from "./user.entity";

@Entity()
export class BookToUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, (book) => book.users)
  @JoinColumn()
  book!: Book;

  @ManyToOne(() => User, (user) => user.books)
  @JoinColumn()
  user!: User;

  @Column({ default: null })
  userScore: number;

  @CreateDateColumn({ select: false })
  borrowedDate: Date;

  @UpdateDateColumn({ select: false })
  returnedDate: Date;
}
