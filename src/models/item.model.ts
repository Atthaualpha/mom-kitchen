import { Ingredient } from './ingredient.model';
import { Category } from 'src/models/category.model';
import { Author } from 'src/models/author.model';
import { Step } from './step.model';
import { FoodDet } from './foodDet.model';
import {
  BelongsTo,
  Column,
  ForeignKey,
  PrimaryKey,
  Table,
  Model,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { MedicineDet } from './medicineDet.model';

@Table({
  schema: 'management',
  tableName: 'item',
  createdAt: false,
  updatedAt: false,
})
export class Item extends Model {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number;

  @Column
  name: string;

  @Column({ field: 'image_url' })
  imageUrl: string;

  @Column
  description: string;

  @Column
  itemType: number;

  @Column
  status: number;

  @ForeignKey(() => Author)
  @Column({ field: 'author_id' })
  authorId: number;

  @BelongsTo(() => Author)
  author: Author;

  @ForeignKey(() => Category)
  @Column({ field: 'category_id' })
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @HasOne(() => FoodDet)
  foodDet: FoodDet;

  @HasOne(() => MedicineDet)
  medicineDet: MedicineDet;

  @HasMany(() => Ingredient)
  ingredients: Ingredient[];

  @HasMany(() => Step)
  steps: Step[];
}
