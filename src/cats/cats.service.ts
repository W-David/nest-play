import { Injectable } from '@nestjs/common'
import { CreateCatDTO } from './dto/create-cat.dto'
import { UpdateCatDTO } from './dto/update-cat.dto'
import { Cat } from './interfaces/cat.interface'

@Injectable()
export class CatsService {
  constructor() {}

  private readonly cats: Cat[] = []

  findAll(): Cat[] {
    return this.cats
  }

  findOne(id: number): Cat {
    const cat = this.cats.find((c) => c.id === id)
    return cat
  }

  create(cat: CreateCatDTO): Cat {
    const catO = { ...cat, id: this.cats.length + 1 }
    this.cats.push(catO)
    return catO
  }

  update(cat: UpdateCatDTO): Cat {
    const index = this.cats.findIndex((c) => c.id === cat.id)
    if (index === -1) {
      return null
    }
    this.cats[index] = cat
    return cat
  }
}
