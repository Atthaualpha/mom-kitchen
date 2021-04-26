import { Item } from './item.model';
import { Column, HasMany, PrimaryKey, Table, Model } from 'sequelize-typescript';

@Table({ schema: 'management', tableName: 'category', createdAt: false, updatedAt: false })
export class Category extends Model {
  @PrimaryKey
  @Column({ autoIncrement:true })
  id: Number;

  @Column
  name: string;

  @HasMany(() => Item)
  items: Item[];
}
