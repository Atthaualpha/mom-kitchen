import { Ingredient } from './ingredient.model';
import { Category } from 'src/models/category.model';
import { Author } from 'src/models/author.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Step } from './step.model';
import { FootDet } from './foodDet.model';

@Entity({ schema: 'management' })
export class Item {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @Column()
  description: string;

  @OneToOne(() => FootDet, (foodDet) => foodDet.item)
  foodDet: FootDet;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.item, {
    cascade: true,
  })
  ingredients: Ingredient[];

  @OneToMany(() => Step, (step) => step.item, { cascade: true })
  steps: Step[];

  @ManyToOne(() => Author, (author) => author.items)
  @JoinColumn({ name: 'author_id' })
  author: Author;

  @ManyToOne(() => Category, (category) => category.items)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
