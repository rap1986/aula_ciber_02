import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('hello')
  sayHello(): string {
    return 'Say Hello!';
  }

  @Get('search')
  search(@Query('q') query: string) {
    if (!query) {
      return [];
    }
    // Este é o endpoint VULNERÁVEL
    return this.usersService.search(query);
  }
}
