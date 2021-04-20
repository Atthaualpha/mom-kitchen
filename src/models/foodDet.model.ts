import { Item } from './item.model';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ schema: 'management', tableName: 'food_det', createdAt: false, updatedAt: false })
export class FootDet extends Model {
  @PrimaryKey
  @Column({ autoIncrement:true })
  id: number;

  @Column
  time: string;

  @Column
  serving: number;

  @ForeignKey(() => Item)
  @Column({ field: 'item_id' })
  itemId: number;

  @BelongsTo(() => Item)
  item: Item;
}
