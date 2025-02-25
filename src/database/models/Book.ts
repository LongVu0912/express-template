import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import Account from "./Account";
import { DataTypes } from "sequelize";

@Table({
  modelName: "book",
  paranoid: true,
})
class Book extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  fullName: string;

  @ForeignKey(() => Account)
  @Column({
    type: DataType.UUID,
  })
  accountId: string;

  @BelongsTo(() => Account)
  account: Account;
}

export default Book;
