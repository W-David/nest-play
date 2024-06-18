import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  create(data: Prisma.UserCreateInput) {
    return this.prismaService.user.create({
      data,
    })
  }

  update(params: { where: Prisma.UserWhereUniqueInput; data: Prisma.UserUpdateInput }) {
    return this.prismaService.user.update(params)
  }

  delete(where: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.delete({
      where,
    })
  }

  findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.UserWhereUniqueInput
    where?: Prisma.UserWhereInput
    orderBy?: Prisma.UserOrderByWithRelationInput
  }) {
    return this.prismaService.user.findMany(params)
  }

  findOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUnique({ where: userWhereUniqueInput })
  }
}
