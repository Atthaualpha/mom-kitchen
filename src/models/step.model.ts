import { Item } from './item.model';
import {
  Column,
  Model,
  PrimaryKey,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

@Table({ schema: 'management', tableName: 'step', createdAt: false, updatedAt: false })
export class Step extends Model {
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
