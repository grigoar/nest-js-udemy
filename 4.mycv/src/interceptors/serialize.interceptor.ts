import {
  // UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): object;
}

export function Serialize(dto: ClassConstructor) {
  // return function (target: any, key: string, desc: PropertyDescriptor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    handler: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    // Run something before a request is handled by the request handler
    // console.log('I am running before the handler', context);

    return handler.handle().pipe(
      map((data: any) => {
        return plainToClass(this.dto, data, { excludeExtraneousValues: true });
        // Run something before the response is sent out
        // console.log('I am running before response is sent out', data);
        // return plainToClass(this.dto, data, { excludeExtraneousValues: true });
      }),
    );
  }
}
