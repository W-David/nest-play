import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from "src/common/global.decorator";
import { PayloadType } from "./auth.service";
import { JWT_SECRET } from './constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  async canActivate (context: ExecutionContext): Promise<boolean> {
    // 如果控制器上使用了@Public()装饰器，则跳过权限验证
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const token = this.extractToken(request)
    if (!token) {
      throw new UnauthorizedException('Token is missing')
    }
    try {
      const payload = await this.jwtService.verifyAsync<PayloadType>(token, { secret: JWT_SECRET }) 
      // 附加用户信息到request对象中方便后续使用
      request.user = payload
      const roles = payload.roles
      const allowedRoles = ['admin']
      if (!roles.some(role => allowedRoles.includes(role))) {
        throw new UnauthorizedException('Your permission is not allowed')
      }
      return true
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token expired at: ' + error.expiredAt)
      } else {
        throw new UnauthorizedException('Invalid token')
      }
    }
  }

  private extractToken (request: Request) {
    const [type, token] = request.headers.authorization.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}