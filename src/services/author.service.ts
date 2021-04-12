import { AuthorDTO } from './../dto/request/authorDto';
import { Author } from './../models/author.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  findAllAuthors(): Promise<Author[]> { 
    return this.authorRepository.createQueryBuilder('author').select('author.name').getMany();
  }

  async createAuthor(authorDto: AuthorDTO, callback: any) {
    try {
      await this.authorRepository.save(authorDto)  
      callback( { message : 'ok'})   
    } catch (error) {
      callback(error)   
    }
    
  }
}
