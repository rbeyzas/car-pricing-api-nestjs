import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // burası user repository'sini oluşturdu
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
