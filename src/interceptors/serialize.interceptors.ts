import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { UserDto } from '../users/dtos/user.dto';

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run something before a request is handled by the request handler
    // console.log('I am running before the handler', context);
    return handler.handle().pipe(
      map((data: any) => {
        // Run something before the response is sent out
        // console.log('I am running before the response is sent out', data);
        return plainToClass(UserDto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
// implements extends ile aynı şey değildir.
// implements bir class'ın bir interface'i implement etmesi anlamına gelir.
// extends ise bir class'ın başka bir class'ı extend etmesi anlamına gelir.
// observable, observer pattern'ı, bir objenin durum değişikliklerini izlemek için kullanılır.
// excludeExtraneousValues: true demek, dto'da tanımlanmayan property'leri ignore eder.
// bu ayar her şeyin düzgün çalışmasını sağlar.
