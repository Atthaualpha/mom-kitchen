import { AuthorDTO } from './../dto/request/authorDto';
import { Author } from './../models/author.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author)
    private authorModel: typeof Author
  ) {}

  findAllAuthors(): Promise<Author[]> { 
    return this.authorModel.findAll({attributes: ['name']})
  }

  async createAuthor(authorDto: AuthorDTO, callback: any) {
    try {
      await this.authorModel.create(authorDto)
      callback( { message : 'ok'})   
    } catch (error) {
      callback(error)   
    }
    
  }
}
