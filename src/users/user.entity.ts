import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  // @Exclude() // şifreyi hariç tuttuk.
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.id);
  }
}
// Bu kodda bir entity oluşturuyoruz. Entity, veritabanında bir tabloya karşılık gelir. Bu entity, User adında bir tablo oluşturur. Tablo, id, name, email ve password sütunlarına sahiptir. id sütunu, otomatik olarak artan bir sütundur. Bu, tablonun her satırı için benzersiz bir kimlik sağlar. Bu sütun, genellikle primary key olarak adlandırılır.
// AfterInsert eğer bir kullanıcı oluşturulduktan sonra bir şey yapmak istersek, bu decorator'ü kullanabiliriz. Örneğin, bir kullanıcı oluşturulduktan sonra bir mail göndermek isteyebiliriz. Bu durumda AfterInsert decorator'ü kullanabiliriz.
// Exclude ile password'u dışarıya göndermeyeceğiz.
