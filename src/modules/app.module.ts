import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SequelizeModule } from '@nestjs/sequelize';

import { MedicineDet } from './../models/medicineDet.model';
import { Item } from './../models/item.model';
import { Category } from '../models/category.model';
import { Step } from '../models/step.model';
import { Ingredient } from '../models/ingredient.model';
import { FoodDet } from '../models/foodDet.model';

import { IngredientController } from './../controllers/ingredient.controller';
import { CategoryController } from '../controllers/category.controller';
import { ItemController } from '../controllers/item.controller';
import { AutoSuggestController } from '../controllers/autosuggest.controller';
import { StepController } from '../controllers/step.controller';

import { StepService } from './../services/step.service';
import { ItemService } from './../services/item.service';
import { CategoryService } from '../services/category.service';
import { AutoSuggestService } from '../services/autosuggest.service';
import { IngredientService } from '../services/ingredient.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';

import { join } from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [configuration]
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    SequelizeModule.forRootAsync({      
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const {
          host,
          database,
          username,
          password,
          dialectOptions,
        } = configService.get('database');
        return {
          dialect: 'postgres',
          dialectOptions,
          host,
          port: 5432,
          username,
          password,
          database,
          models: [Category, Item, Step, Ingredient, FoodDet, MedicineDet]
        }
      },     
      inject: [ConfigService],
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
