import { Item } from './item.model';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'management' })
export class Step {
  @PrimaryColumn()
  id: number;

  @Column()
  description: string;

  @ManyToOne(() => Item, (item) => item.steps)
  @JoinColumn({ name: 'item_id' })
  item: Item;

  constructor(description?: string) {
    this.description = description;
  }
}
