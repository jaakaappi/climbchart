import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionsController } from './sessions/session.controller';

@Module({
  imports: [],
  controllers: [AppController, SessionsController],
  providers: [AppService],
})
export class AppModule {}
