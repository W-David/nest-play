import { Injectable } from '@nestjs/common'
import { Post } from './interfaces/post.interface'

@Injectable()
export class PostService {
  private posts: Post[] = []
  constructor() {}

  create(post: Omit<Post, 'id'>) {
    const newPost = { id: this.posts.length + 1, ...post }
    this.posts.push(newPost)
    return newPost
  }

  update(post: Post) {
    const index = this.posts.findIndex((p) => p.id === post.id)
    if (index === -1) {
      return null
    }
    this.posts[index] = post
    return post
  }

  findOne(id: number) {
    return this.posts.find((post) => post.id === id)
  }

  findAll() {
    return this.posts
  }
}
