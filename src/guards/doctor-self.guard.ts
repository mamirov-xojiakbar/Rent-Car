import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { log } from 'console';
import { Observable } from 'rxjs';

@Injectable()
export class ClientSelfGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    if (req.doctor.id != req.params.id) {
      throw new ForbiddenException({ message: 'Ruxsat etilmagan client' });
    }

    return true;
  }
}
