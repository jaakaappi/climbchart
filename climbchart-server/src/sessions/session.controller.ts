import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { CreateSessionDto } from './create-session.dto';

@Controller('sessions')
export class SessionsController {
  @Put()
  createSession(@Body() createSessionDto: CreateSessionDto) {
    console.log(createSessionDto);
  }

  @Delete(':id')
  deleteSession(@Param() id: number) {
    console.log(id);
  }

  @Get()
  getSessions() {}
}
