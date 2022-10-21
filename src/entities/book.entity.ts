import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { BookToUser } from "./book-to-user.entity";

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    default: -1,
    type: "decimal",
    precision: 7,
    scale: 2,
    nullable: true,
  })
  averageScore: number;

  @OneToMany(() => BookToUser, (bookToUser) => bookToUser.book)
  users: BookToUser[];

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}
