import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password }); // email ve passwordun instance'ını yaratıyoruz

    return this.repo.save(user);
  }
}

// constructor içindeki @InjectRepository(User) decorator'ü sayesinde User repository'sini inject edebiliriz.
// consturctor içerisinde bağımlılıkları tanımlayacağız.

// constructor(
//     @InjectRepository(User)
//     private repo: Repository<User>,
//   ) {}

// burada private kullanma sebebimiz kodu biraz kısaltmak. eğer kullanmamış olsaydık kod şöyle bir şey olacaktı:
// repo: Repository<User>;
// constructor( repo: Repository<User>) {
//     this.repo = repo;
// }

// @InjectRepository(User) bu kısım DI yapmamızı sağlar. yani bu kısım sayesinde User repository'sini inject edebiliriz.
// DI generic typelarla pek iyi çalışmıyor yani şununla -> <User> bu sebepten InjectRepository kullanmamız gerekiyor.
//create ile kullnıcı oluşturacağız. sonra save ile kaydedeceğiz.
