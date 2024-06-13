import { Body, Controller, Get, Post, Put, Req } from "@nestjs/common";
import { Request } from "express";
import { CatsService } from './cats.service';
import { CreateCatDTO } from "./dto/create-cat.dto";
import { UpdateCatDTO } from "./dto/update-cat.dto";


@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  findAll(@Req() req: Request): string {
    const cats = this.catsService.findAll()
    return `This will return all cats, url: ${req.url}, method: ${req.method}, cats: ${JSON.stringify(cats)}`
  }
  @Get(':id')
  findOne(@Req() req: Request): string {
    return `This will return a cat with id ${req.params.id}`
  }
  @Put()
  update(@Body() updateCatDTO: UpdateCatDTO): string {
    const cat = this.catsService.update(updateCatDTO)
    return `This will update a cat with id ${updateCatDTO.id}, ${JSON.stringify(cat)}`
  }
  @Post()
  create(@Body() createCatDTO: CreateCatDTO): string {
    const cat = this.catsService.create(createCatDTO)
    return `This will create a new cat, ${JSON.stringify(cat)}`
  }
}