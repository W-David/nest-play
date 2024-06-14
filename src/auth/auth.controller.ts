import { Body, Controller, Post } from '@nestjs/common'
import { Public } from 'src/common/global.decorator'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>) {
    const { token } = await this.authService.signIn(signInDto.username, signInDto.password)
    return { token }
  }
}
