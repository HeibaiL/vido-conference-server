import { Module } from '@nestjs/common';

//modules
import { EventsModule } from './events/events.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './room/room.module';

@Module({
  imports: [EventsModule, RoomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
