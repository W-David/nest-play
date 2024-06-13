import { Injectable } from '@nestjs/common'

@Injectable()
export class PostService {
  findOne (id: number) {
    return `This action returns a #${id} post`
  }
}
