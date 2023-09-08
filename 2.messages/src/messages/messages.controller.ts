import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';

@Controller('messages')
export class MessagesController {
  @Get()
  listMessages() {
    return [
      {
        id: 1,
        text: 'First message',
      },
      {
        id: 2,
        text: 'Second message',
      },
    ];
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    console.log(body);
    return {
      id: 1,
      text: 'First message',
    };
  }
  @Get('/:id')
  getMessage(@Param('id') id: string, @Query('search') search: string) {
    console.log(id);
    console.log(search);
    return {
      id: 1,
      text: 'First message',
    };
  }
}
