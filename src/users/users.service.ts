import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      name: 'John Doe',
      password: 'password123',
      roles: ['admin'],
    },
    {
      id: 2,
      name: 'Jane Smith',
      password: 'password456',
      roles: ['user'],
    },
    {
      id: 3,
      name: 'Bob Johnson',
      password: 'password789',
      roles: ['admin', 'user']
    }
  ]

  findAll() {
    return this.users
  }

  findOne (username: string) {
    return this.users.find(user => user.name === username)
  }
}
