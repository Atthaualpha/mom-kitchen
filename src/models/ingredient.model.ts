import { Item } from './item.model';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'management' })
export class Ingredient {
  @PrimaryColumn()
  id: number;

  @Column()
  description: string;

  @ManyToOne(() => Item, (item) => item.ingredients, { cascade: true })
  @JoinColumn({ name: 'item_id' })
  item: Item;
}
