import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptors';
import { UserDto } from './dtos/user.dto';
@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
  }
  //   @UseInterceptors(ClassSerializerInterceptor) // ClassSerializerInterceptor decorator'ü sayesinde response'ları otomatik olarak serialize edebiliriz. Yani response'ları otomatik olarak düzenleyebiliriz. serialize işlemi response'ları düzenlemek anlamına gelir.
  @UseInterceptors(new SerializeInterceptor(UserDto)) // custom interceptor. yukardaki custom değildi o yüzden yporum satırına aldık
  @Get(':id')
  async findUser(@Param('id') id: string) {
    console.log('Handler is running');
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
    // parseInt ile string olan id'yi number'a çevirdik.
    // bunun sebebi findOne methodunun id'sinin number olması.
  }
  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }
  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
// Body decoratorunu kullanma sebebimiz bu requestin body'sini almak istememiz. body içerisindeki bilgileri kullanacağız.
