import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminSelfGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log(req.admin.id, 'admin');
    console.log(req.params.id, 'params');
    if (req.admin.is_creator) {
      return true;
    }

    if (req.admin.id != req.params.id) {
      throw new ForbiddenException({ message: 'not allowed' });
    }
    return true;
  }
}
