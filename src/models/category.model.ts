import { Item } from './item.model';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity({ schema: 'management' })
export class Category {
  @PrimaryColumn()
  id: Number;

  @Column()
  name: string;

  @OneToMany(() => Item, (item) => item.category)
  items: Item[];
}
