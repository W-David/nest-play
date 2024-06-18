import { Post as PostModel } from '@prisma/client'

export class Post implements PostModel {
  id: number
  createdAt: Date
  updatedAt: Date
  title: string
  content: string | null
  published: boolean
  authorId: number
}
