import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'

export interface PayloadType {
  sub: number
  username: string
  roles: string[]
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    const user = this.usersService.findOne(username)
    if (user?.password !== password) {
      throw new UnauthorizedException()
    }
    const payload: PayloadType = { sub: user.id, username: user.name, roles: user.roles }
    const token = await this.jwtService.signAsync(payload)
    return {
      token,
    }
  }
}
