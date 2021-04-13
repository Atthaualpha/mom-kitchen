import { Item } from './item.model';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'management' })
export class Author {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Item, (item) => item.author)
  items: Item[];
}
