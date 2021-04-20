import { Item } from './item.model';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ schema: 'management', tableName: 'ingredient', createdAt: false, updatedAt: false })
export class Ingredient extends Model {
  @PrimaryKey
  @Column({ autoIncrement:true })
  id: number;

  @Column
  description: string;

  @ForeignKey(() => Item)
  @Column({ field: 'item_id' })
  itemId: number;

  @BelongsTo(() => Item)
  item: Item;
}
