import { Ingredient } from './ingredient.model';
import { Category } from 'src/models/category.model';
import { Author } from 'src/models/author.model';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Step } from './step.model';

@Entity({ schema: 'management' })
export class Item {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column({name: 'image_url'})
  imageUrl: string;

  @Column()
  description: string

  @OneToMany(() => Ingredient, ingredient => ingredient.item)
  ingredients: Ingredient[];

  @OneToMany(() => Step, step => step.item)
  steps: Step[]

  @ManyToOne(() => Author, author => author.items)
  @JoinColumn({ name: "author_id" })
  author: Author;

  @ManyToOne(() => Category, category => category.items)
  @JoinColumn({ name: "category_id" })
  category: Category;
}
