import { Item } from './item.model';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ schema: 'management', tableName: 'medicine_det', createdAt: false, updatedAt: false })
export class MedicineDet extends Model {
  @PrimaryKey
  @Column({ autoIncrement:true })
  id: number;

  @Column
  usage: string;

  @ForeignKey(() => Item)
  @Column({ field: 'item_id' })
  itemId: number;

  @BelongsTo(() => Item)
  item: Item;
}
