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
  findOne(id: number) {
    return this.repo.findOneBy({ id });
    //findOneBy methodu bulamazsa null ya da değer neyse onu döner.
  }
  find(email: string) {
    return this.repo.find({ where: { email } });
  }
  // find methodu email'e göre arama yapar.
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
    // veritabanından bir kullanıcı bulmak eşzamansız bir işlemdir bu sebepten await kullandık
  }
  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    return this.repo.remove(user);
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

// update() işleminde diyelim ki id si belli olan kullanıcının email güncellemek istiyoruz.
// bu durumda update(id, attrs) methodunu kullanabiliriz. attrs içerisine email'i göndeririz.
// şu doğru bir kullanım değildir: update(id, newEmail: string) bu durumda password'u sıfırlar.
// bu durumda kullanıcının diğer bilgileri güncellenmediği için sıfırlanır. sonuç olarak güncellemek istediğimiz attribute u bu şekilde vermek doğru değildir.
// attrs içerisine sadece güncellemek istediğimiz attribute'ları tutar. User entity'sindeki attribute'ları tutar ya da hiçbirine sahip olmayan herhangi bir nesne olabileceğini söyler.
// insert() ve update() düz nesneleri kabul eder. yani insert() ve update() methodlarına sadece User entity'sindeki attribute'ları tutan bir nesne göndeririz. bunları o zaman kullanabiliriz.
// ama bunu yaparken hiçbir hook çalışmayacak çünkü entity üzerinde çalışmıyoruz. bu da debug etmeyi zorlaştırır.
// hookstan kastım:   AfterInsert, AfterRemove, AfterUpdate
// eğer hooks kullanmak istiyorsak save() ve remove() methodlarını kullanmalıyız. çünkü bu methodlar entity üzerinde çalışır.
// remove entity ile çalışır. delete id ile çalışır.
