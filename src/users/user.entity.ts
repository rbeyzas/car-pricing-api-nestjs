import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
}
// Bu kodda bir entity oluşturuyoruz. Entity, veritabanında bir tabloya karşılık gelir. Bu entity, User adında bir tablo oluşturur. Tablo, id, name, email ve password sütunlarına sahiptir. id sütunu, otomatik olarak artan bir sütundur. Bu, tablonun her satırı için benzersiz bir kimlik sağlar. Bu sütun, genellikle primary key olarak adlandırılır.
