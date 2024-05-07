import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwrService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new UnauthorizedException('Admin is unauthorized');

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer != 'Bearer' || !token)
      throw new UnauthorizedException('Admin is unauthorized');

    async function verify(token: string, jwrService: JwtService) {
      let admin: any;
      try {
        admin = await jwrService.verify(token, {
          secret: process.env.ACCESS_TOKEN_KEY_ADMIN,
        });
      } catch (error) {
        console.log(error);
        throw new UnauthorizedException('Invalid token');
      }

      if (!admin) {
        throw new UnauthorizedException('Admin is unauthorized');
      }

      if (!admin.is_active) {
        throw new BadRequestException('Admin is not active');
      }

      req.admin = admin;

      return true;
    }
    return verify(token, this.jwrService);
  }
}
