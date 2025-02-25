import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import Book from "./Book";
import { DataTypes } from "sequelize";

@Table({
  modelName: "account",
  paranoid: true,
})
class Account extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  username: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;

  @Column({
    type: DataType.STRING,
  })
  fullName: string;

  @HasMany(() => Book)
  books: Book[];
}

export default Account;
