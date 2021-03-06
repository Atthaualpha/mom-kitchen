import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SequelizeModule } from '@nestjs/sequelize';

import { MedicineDet } from './../models/medicineDet.model';
import { Item } from './../models/item.model';
import { Category } from 'src/models/category.model';
import { Step } from 'src/models/step.model';
import { Ingredient } from 'src/models/ingredient.model';
import { FoodDet } from 'src/models/foodDet.model';

import { IngredientController } from './../controllers/ingredient.controller';
import { CategoryController } from '../controllers/category.controller';
import { ItemController } from '../controllers/item.controller';
import { AutoSuggestController } from 'src/controllers/autosuggest.controller';
import { StepController } from 'src/controllers/step.controller';

import { StepService } from './../services/step.service';
import { ItemService } from './../services/item.service';
import { CategoryService } from '../services/category.service';
import { AutoSuggestService } from 'src/services/autosuggest.service';
import { IngredientService } from 'src/services/ingredient.service';

import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'MomKitchen',
      models: [Category, Item, Step, Ingredient, FoodDet, MedicineDet],
    }),
    SequelizeModule.forFeature([
      Category,
      Item,
      Step,
      Ingredient,
      FoodDet,
      MedicineDet,
    ]),
  ],
  controllers: [
    ItemController,
    CategoryController,
    IngredientController,
    AutoSuggestController,
    StepController,
  ],
  providers: [
    ItemService,
    CategoryService,
    AutoSuggestService,
    IngredientService,
    StepService,
  ],
})
export class AppModule {}
