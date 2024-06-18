import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  create(data: Prisma.PostCreateInput) {
    return this.prismaService.post.create({
      data,
    })
  }

  update(params: { where: Prisma.PostWhereUniqueInput; data: Prisma.PostUpdateInput }) {
    return this.prismaService.post.update(params)
  }

  delete(where: Prisma.PostWhereUniqueInput) {
    return this.prismaService.post.delete({
      where,
    })
  }

  findAll(params: Prisma.PostFindManyArgs) {
    return this.prismaService.post.findMany(params)
  }

  findOne(where: Prisma.PostWhereUniqueInput) {
    return this.prismaService.post.findUnique({
      where,
    })
  }
}
