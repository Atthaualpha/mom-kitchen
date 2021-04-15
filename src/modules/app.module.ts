import { join } from 'path';
import { MedicineDet } from './../models/medicineDet.model';
import { Item } from './../models/item.model';
import { Author } from './../models/author.model';
import { AuthorService } from '../services/author.service';
import { AuthorController } from './../controllers/author.controller';
import { IngredientController } from './../controllers/ingredient.controller';
import { ItemService } from './../services/item.service';
import { Module } from '@nestjs/common';
import { CategoryController } from '../controllers/category.controller';
import { ItemController } from '../controllers/item.controller';
import { CategoryService } from '../services/category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/models/category.model';
import { Step } from 'src/models/step.model';
import { Ingredient } from 'src/models/ingredient.model';
import { FootDet } from 'src/models/foodDet.model';
import { AutoSuggestController } from 'src/controllers/autosuggest.controller';
import { AutoSuggestService } from 'src/services/autosuggest.service';
import { ServeStaticModule } from '@nestjs/serve-static';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'MomKitchen',
      logging: true,
      entities: [Category, Author, Item, Step, Ingredient, FootDet, MedicineDet],
    }),
    TypeOrmModule.forFeature([Category, Author, Item, Step, Ingredient, FootDet, MedicineDet]),
    
  ],
  controllers: [
    ItemController,
    CategoryController,
    IngredientController,
    AuthorController,
    AutoSuggestController
  ],
  providers: [ItemService, CategoryService, AuthorService, AutoSuggestService],
})
export class AppModule {}
