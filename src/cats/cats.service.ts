import { Injectable } from "@nestjs/common"
import { CreateCatDTO } from "./dto/create-cat.dto"
import { Cat } from "./interfaces/cat.interface"

@Injectable()
export class CatsService {
  constructor() {}

  private readonly cats: Cat[] = []

  findAll(): Cat[] {
    return this.cats
  }

  create (cat: CreateCatDTO): Cat {
    const catO = {...cat, id: this.cats.length + 1 }
    this.cats.push(catO)
    return catO
  }

  update(cat: Cat): Cat {
    const index = this.cats.findIndex(c => c.id === cat.id)
    if (index === -1) {
      throw new Error(`Cat with id ${cat.id} not found`)
    }
    this.cats[index] = cat
    return cat
  }
}