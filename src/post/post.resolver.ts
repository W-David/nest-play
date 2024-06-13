import { Args, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';

@Resolver('Post')
export class PostResolver {
  constructor(
    private postService: PostService
  ) { }
  
  @Query('post') 
  findOne (@Args('id') id: number) {
    return this.postService.findOne(id)
  }
}