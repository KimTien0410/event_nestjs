import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './entities/event.entity';
import { EventRegistrationService } from './event-registration.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity])],
  controllers: [EventController],
  providers: [
    EventService,
   EventRegistrationService,
  ],
  exports: [EventRegistrationService, EventService],
})
export class EventModule {}
