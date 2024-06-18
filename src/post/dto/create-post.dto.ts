import { InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'

@InputType()
export class CreatePostDto implements Prisma.PostCreateInput {
  createdAt?: string | Date
  updatedAt?: string | Date
  title: string
  content?: string
  published?: boolean
  author: Prisma.UserCreateNestedOneWithoutPostsInput
}
