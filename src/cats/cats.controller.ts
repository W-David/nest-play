import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { CatsService } from './cats.service'
import { CreateCatDTO } from './dto/create-cat.dto'
import { UpdateCatDTO } from './dto/update-cat.dto'

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  findAll() {
    const cats = this.catsService.findAll()
    return cats
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    const cat = this.catsService.findOne(+id)
    return cat
  }
  @Put()
  update(@Body() updateCatDTO: UpdateCatDTO) {
    const cat = this.catsService.update(updateCatDTO)
    return cat
  }
  @Post()
  create(@Body() createCatDTO: CreateCatDTO) {
    const cat = this.catsService.create(createCatDTO)
    return cat
  }
}
