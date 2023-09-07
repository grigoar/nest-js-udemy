import { Controller, Get } from '@nestjs/common';

@Controller('/app')
export class AppController {
  constructor() {}

  @Get('/asdf')
  getRootRoute() {
    return 'Hi there ff';
  }

  @Get('/bye')
  getBye() {
    return 'Bye there';
  }
}
