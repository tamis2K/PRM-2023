import { Controller, Get } from '@nestjs/common';
import { User } from 'src/entities/user.entiti';
import { UserService } from 'src/services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.service.findAll();
  }
}
