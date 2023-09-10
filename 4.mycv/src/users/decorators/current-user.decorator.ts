import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    console.log('req.session.userId: ', req.session.userId);
    return req.currentUser;
  },
);
