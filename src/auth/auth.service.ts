import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

export interface PayloadType {
  sub: number
  username: string
  roles: string[]
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(username: string, password: string) {
    const user = { id: 1, name: 'admin', password: 'password', roles: ['admin'] }
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
