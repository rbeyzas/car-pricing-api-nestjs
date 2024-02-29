import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;
  @Expose()
  email: string;
}
// Expose decorator'ü ile sadece id ve email'i göndermek istedik.
// göndermek istemeseydik exclude kullanırdık
