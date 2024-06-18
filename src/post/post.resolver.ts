import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { PostService } from './post.service'

@Resolver('Post')
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query()
  async findOne(@Args('id', { type: () => Int }) id: number) {
    const post = await this.postService.findOne({ id })
    return post
  }

  @Query()
  findAll(@Args('params') params: Prisma.PostFindManyArgs) {
    const posts = this.postService.findAll(params)
    return posts
  }

  @Mutation()
  create(@Args('post') post: Prisma.PostCreateInput) {
    const createdPost = this.postService.create(post)
    return createdPost
  }

  @Mutation()
  update(@Args('post') post: { id: number } & Prisma.PostUpdateInput) {
    const updatedPost = this.postService.update({ where: { id: post.id }, data: post })
    return updatedPost
  }

  @Mutation()
  delete(@Args('id') id: number) {
    const deletedPost = this.postService.delete({ id })
    return deletedPost
  }
}
