import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { Post } from './interfaces/post.interface'
import { PostService } from './post.service'

@Resolver('Post')
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query()
  findOne(@Args('id') id: number): Post {
    const post = this.postService.findOne(id)
    return post
  }

  @Query()
  findAll(): Post[] {
    const posts = this.postService.findAll()
    return posts
  }

  @Mutation()
  update(@Args('post') post: UpdatePostDto): Post {
    const updatedPost = this.postService.update(post)
    return updatedPost
  }

  @Mutation()
  create(@Args('post') post: CreatePostDto): Post {
    const createdPost = this.postService.create(post)
    return createdPost
  }
}
