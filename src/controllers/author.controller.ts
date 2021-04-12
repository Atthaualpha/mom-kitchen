import { AuthorDTO } from './../dto/request/authorDto';
import { AuthorService } from './../services/author.service';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Author } from 'src/models/author.model';
import { Response } from 'express';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  findAll(): Promise<Author[]> {
    return this.authorService.findAllAuthors();
  }

  @Post()
  createAuthor(@Body() authorDto: AuthorDTO, @Res() res: Response) {
    this.authorService.createAuthor(authorDto, (resp: any, error: any) => {
        if(error) {
            res.status(500).send(error);        
        }
        res.status(200).json(resp);
    })    
  }
}
