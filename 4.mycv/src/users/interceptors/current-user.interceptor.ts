import {
  ExecutionContext,
  CallHandler,
  NestInterceptor,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    console.log('userId: ', userId);

    if (userId) {
      const user = this.userService.findOne(userId);
      request.currentUser = user;
    }

    return next.handle();
  }
}
