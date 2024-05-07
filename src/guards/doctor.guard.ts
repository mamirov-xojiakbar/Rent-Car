import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';
import { Observable } from 'rxjs';

@Injectable()
export class ClientGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Unauthorized Client1');
    }

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Unauthorized Client2');
    }

    async function verify(token: string, jwtService: JwtService) {
      let doctor: any;
      try {
        doctor = await jwtService.verify(token, {
          secret: process.env.ACCESS_TOKEN_KEY,
        });
        log(doctor)
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      if (!doctor) {
        throw new UnauthorizedException('Unauthorized Client3');
      }

      if (!doctor.is_active) {
        throw new BadRequestException('Client is not active');
      }
      req.doctor = doctor;
      return true;
    }

    return verify(token, this.jwtService);
  }
}
