import { Item } from './item.model';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'management' })
export class Ingredient { 

  @PrimaryColumn()
  id: number;

  @Column()
  description: string;

  @ManyToOne(type => Item, (item) => item.ingredients)
  @JoinColumn({ name: 'item_id' })
  item: Item;


  constructor(description?: string) {
    this.description = description;
  }

}
