import {
  Column,
  HasMany,
  PrimaryKey,
  Table,
  Model,
} from 'sequelize-typescript';
import { Item } from './item.model';

@Table({ schema: 'management',tableName: 'author', createdAt: false, updatedAt: false })
export class Author extends Model {
  @PrimaryKey
  @Column({ autoIncrement:true })
  id: number;

  @Column
  name: string;

  @HasMany(() => Item)
  items: Item[];
}
