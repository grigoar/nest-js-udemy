import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(public messageService: MessagesService) {}
  @Get()
  async listMessages() {
    return await this.messageService.findAll();
  }

  @Post()
  async createMessage(@Body() body: CreateMessageDto) {
    return await this.messageService.create(body.content);
  }
  @Get('/:id')
  async getMessage(@Param('id') id: string, @Query('search') search: string) {
    const message = await this.messageService.findOne(id);
    if (!message) {
      throw new NotFoundException('message not found');
    }
    return message;
  }
}
